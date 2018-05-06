webpackJsonp([0xa29a739f2616],{810:function(n,s){n.exports={data:{markdownRemark:{html:'<p>About a year ago I switched back to using a static site generator for this blog.  Specifically, I chose <a href="https://www.gatsbyjs.org/">Gatsby</a> and it has been fantastic.  It’s incredibly easy to customize and make my own, and I can do fun things like adding metadata to my posts to enable features like the “read next” list at the bottom of each post, and the “most popular” posts feature that is actually generated from google analytics data.  The biggest downside of using a static site generator relative to a hosted service though is the annoyance of actually posting.  I could edit or write a post to my <a href="https://ghost.org/">Ghost</a> blog from anywhere, which was a real perk of using that platform.  Until recently I was only able to deploy this site from a single computer, because I needed an API key for Google Analytics to be available.  That has been mostly fine, since I usually work on posts for this site over the course of a few days.</p>\n<p>But last week I decided to start aiming for <a href="https://benmccormick.org/2017/11/03/friday-links/">weekly shorter linklog posts</a>, and that meant having a bit more flexibility with my deploys.  So this week I did 2 things: I set up a <a href="https://travis-ci.org/">Travis CI</a> job to auto-deploy my app when changes hit the master branch, and wrote an initial version of a CLI for managing the blog.  The first version just helps me write out a templated new post.  My setup is pretty tailored to this blog, but I thought it’d be helpful to share, and maybe inspire some folks looking to do the same thing for their static site.</p>\n<h3>Travis CI</h3>\n<p>Travis is a continuous integration environment that is free for open source.  I had used it very minimally for some open source projects, but never to deploy anything so I had to learn about the <code>deploy</code> option travis provides.  In the end my <code>.travis.yml</code> file was pretty simple and looked like this:</p>\n<div class="gatsby-highlight">\n      <pre class="language-yml"><code>language: node_js\nnode_js:\n- \'8\'\ndeploy:\n  skip_cleanup: true\n  provider: script\n  script: scripts/deploy.sh\n  on:\n    branch: master\nenv:\n  global:\n  - ANALYTICS_KEY=./analytics-api-key.json\n  - secure: r43TdsxdDrqYtmZiBmBSe+7u0UBdepMWAYmpTGzGJoAt9p0z+CxcR9ZIj4uMPvBtO3n1wcEvylWcmmY6smu57uXNPhQpyYJaw6HlnfKrz5GjRVX6Ti6oDm8Yyhha1IlcS73dJTpApFis30Kv7fsfDvpNcvVxpF1eDUlw2UAYCwI=\nbefore_install:\n- openssl aes-256-cbc -K $encrypted_dd5d287df7ed_key -iv $encrypted_dd5d287df7ed_iv\n  -in analytics-api-key.json.enc -out analytics-api-key.json -d</code></pre>\n      </div>\n<p>Breaking that down a bit:</p>\n<div class="gatsby-highlight">\n      <pre class="language-yml"><code>language: node_js\nnode_js:\n- \'8\'</code></pre>\n      </div>\n<p>I’m using node for this project and I want to deploy on node 8, so these lines just make sure I have that environment available.</p>\n<div class="gatsby-highlight">\n      <pre class="language-yml"><code>deploy:\n  skip_cleanup: true\n  provider: script\n  script: scripts/deploy.sh\n  on:\n    branch: master</code></pre>\n      </div>\n<p>I’ve bundled my deploy steps into a script, <code>deploy.sh</code>.  This config tells travis to run the script after my (currently non-existent) tests have completed, and not to remove any built files before starting the deploy.  It also makes it clear that this should only happen for changes to the master branch.</p>\n<div class="gatsby-highlight">\n      <pre class="language-yml"><code>env:\n  global:\n  - ANALYTICS_KEY=./analytics-api-key.json\n  - secure: r43TdsxdDrqYtmZiBmBSe+7u0UBdepMWAYmpTGzGJoAt9p0z+CxcR9ZIj4uMPvBtO3n1wcEvylWcmmY6smu57uXNPhQpyYJaw6HlnfKrz5GjRVX6Ti6oDm8Yyhha1IlcS73dJTpApFis30Kv7fsfDvpNcvVxpF1eDUlw2UAYCwI=\nbefore_install:\n- openssl aes-256-cbc -K $encrypted_dd5d287df7ed_key -iv $encrypted_dd5d287df7ed_iv\n  -in analytics-api-key.json.enc -out analytics-api-key.json -d</code></pre>\n      </div>\n<p>This section looks messy, but its all about the environment variables I need for deploying.  Specifically I’m pulling in a github key for deploys (thats the secure key), and then also pulling my google analytics key from a json file.  The JSON file is stored as an encrypted file in the directory with a key that only Travis can decrypt.  Then I use a public environment variable to tell my deploy script where to look up the file.  That allows me to set a different path locally and still have local deploys work even though I can’t decrypt the checked in JSON file.</p>\n<h3>CLI</h3>\n<p>I’ve started with an extremely basic CLI using <a href="https://github.com/SBoudrias/Inquirer.js">Inquirer.js</a>.  It asks me a series of questions and then generates a markdown doc with the appropriate YAML headings.  Inquirer.js, lodash, and ES6 template strings make this super easy.  It looks like this:</p>\n<div class="gatsby-highlight">\n      <pre class="language-javascript"><code><span class="token keyword">const</span> inquirer <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">\'inquirer\'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token keyword">const</span> map <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">\'lodash/map\'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token keyword">const</span> find <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">\'lodash/find\'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token keyword">const</span> <span class="token punctuation">{</span> mkFile <span class="token punctuation">}</span> <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">\'../src/utils/file_system\'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token keyword">const</span> categories <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">\'../src/pages/categories.json\'</span><span class="token punctuation">)</span><span class="token punctuation">.</span>categories<span class="token punctuation">;</span>\n<span class="token keyword">const</span> moment <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">\'moment\'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n<span class="token keyword">let</span> dates <span class="token operator">=</span> <span class="token punctuation">{</span>\n  Today<span class="token punctuation">:</span> <span class="token number">0</span><span class="token punctuation">,</span>\n  Tomorrow<span class="token punctuation">:</span> <span class="token number">1</span><span class="token punctuation">,</span>\n  <span class="token string">\'Two Days From Now\'</span><span class="token punctuation">:</span> <span class="token number">2</span><span class="token punctuation">,</span>\n  <span class="token string">\'Three Days From Now\'</span><span class="token punctuation">:</span> <span class="token number">3</span><span class="token punctuation">,</span>\n<span class="token punctuation">}</span><span class="token punctuation">;</span>\n\ninquirer\n  <span class="token punctuation">.</span><span class="token function">prompt</span><span class="token punctuation">(</span><span class="token punctuation">[</span>\n    <span class="token punctuation">{</span>\n      type<span class="token punctuation">:</span> <span class="token string">\'list\'</span><span class="token punctuation">,</span>\n      name<span class="token punctuation">:</span> <span class="token string">\'type\'</span><span class="token punctuation">,</span>\n      message<span class="token punctuation">:</span> <span class="token string">\'What Type of Post is this\'</span><span class="token punctuation">,</span>\n      choices<span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token string">\'Post\'</span><span class="token punctuation">,</span> <span class="token string">\'Page\'</span><span class="token punctuation">,</span> <span class="token string">\'Friday-Links\'</span><span class="token punctuation">]</span><span class="token punctuation">,</span>\n      filter<span class="token punctuation">:</span> val <span class="token operator">=></span> <span class="token punctuation">{</span>\n        <span class="token keyword">return</span> val<span class="token punctuation">.</span><span class="token function">toLowerCase</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n      <span class="token punctuation">}</span><span class="token punctuation">,</span>\n    <span class="token punctuation">}</span><span class="token punctuation">,</span>\n    <span class="token punctuation">{</span>\n      type<span class="token punctuation">:</span> <span class="token string">\'input\'</span><span class="token punctuation">,</span>\n      name<span class="token punctuation">:</span> <span class="token string">\'title\'</span><span class="token punctuation">,</span>\n      message<span class="token punctuation">:</span> <span class="token string">\'What should the title be?\'</span><span class="token punctuation">,</span>\n      validate<span class="token punctuation">:</span> value <span class="token operator">=></span> <span class="token punctuation">{</span>\n        <span class="token keyword">if</span> <span class="token punctuation">(</span>value<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n          <span class="token keyword">return</span> <span class="token boolean">true</span><span class="token punctuation">;</span>\n        <span class="token punctuation">}</span>\n        <span class="token keyword">return</span> <span class="token string">"Title can\'t be empty"</span><span class="token punctuation">;</span>\n      <span class="token punctuation">}</span><span class="token punctuation">,</span>\n    <span class="token punctuation">}</span><span class="token punctuation">,</span>\n    <span class="token punctuation">{</span>\n      type<span class="token punctuation">:</span> <span class="token string">\'input\'</span><span class="token punctuation">,</span>\n      name<span class="token punctuation">:</span> <span class="token string">\'description\'</span><span class="token punctuation">,</span>\n      message<span class="token punctuation">:</span> <span class="token string">\'What should the description say?\'</span><span class="token punctuation">,</span>\n      validate<span class="token punctuation">:</span> value <span class="token operator">=></span> <span class="token punctuation">{</span>\n        <span class="token keyword">if</span> <span class="token punctuation">(</span>value<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n          <span class="token keyword">return</span> <span class="token boolean">true</span><span class="token punctuation">;</span>\n        <span class="token punctuation">}</span>\n        <span class="token keyword">return</span> <span class="token string">"Description can\'t be empty"</span><span class="token punctuation">;</span>\n      <span class="token punctuation">}</span><span class="token punctuation">,</span>\n    <span class="token punctuation">}</span><span class="token punctuation">,</span>\n    <span class="token punctuation">{</span>\n      type<span class="token punctuation">:</span> <span class="token string">\'input\'</span><span class="token punctuation">,</span>\n      name<span class="token punctuation">:</span> <span class="token string">\'key\'</span><span class="token punctuation">,</span>\n      message<span class="token punctuation">:</span> <span class="token string">\'What should the post key be?\'</span><span class="token punctuation">,</span>\n      validate<span class="token punctuation">:</span> value <span class="token operator">=></span> <span class="token punctuation">{</span>\n        <span class="token keyword">if</span> <span class="token punctuation">(</span>value<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n          <span class="token keyword">return</span> <span class="token boolean">true</span><span class="token punctuation">;</span>\n        <span class="token punctuation">}</span>\n        <span class="token keyword">return</span> <span class="token string">"Key can\'t be empty"</span><span class="token punctuation">;</span>\n      <span class="token punctuation">}</span><span class="token punctuation">,</span>\n    <span class="token punctuation">}</span><span class="token punctuation">,</span>\n    <span class="token punctuation">{</span>\n      type<span class="token punctuation">:</span> <span class="token string">\'list\'</span><span class="token punctuation">,</span>\n      name<span class="token punctuation">:</span> <span class="token string">\'category\'</span><span class="token punctuation">,</span>\n      message<span class="token punctuation">:</span> <span class="token string">\'What Category of post is this\'</span><span class="token punctuation">,</span>\n      choices<span class="token punctuation">:</span> <span class="token function">map</span><span class="token punctuation">(</span>categories<span class="token punctuation">,</span> <span class="token string">\'title\'</span><span class="token punctuation">)</span><span class="token punctuation">,</span>\n      filter<span class="token punctuation">:</span> title <span class="token operator">=></span> <span class="token punctuation">{</span>\n        <span class="token keyword">return</span> <span class="token function">find</span><span class="token punctuation">(</span>categories<span class="token punctuation">,</span> <span class="token punctuation">{</span> title <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">.</span>key<span class="token punctuation">;</span>\n      <span class="token punctuation">}</span><span class="token punctuation">,</span>\n    <span class="token punctuation">}</span><span class="token punctuation">,</span>\n    <span class="token punctuation">{</span>\n      type<span class="token punctuation">:</span> <span class="token string">\'input\'</span><span class="token punctuation">,</span>\n      name<span class="token punctuation">:</span> <span class="token string">\'tags\'</span><span class="token punctuation">,</span>\n      message<span class="token punctuation">:</span> <span class="token string">\'Write out any tags you want to use\'</span><span class="token punctuation">,</span>\n    <span class="token punctuation">}</span><span class="token punctuation">,</span>\n    <span class="token punctuation">{</span>\n      type<span class="token punctuation">:</span> <span class="token string">\'list\'</span><span class="token punctuation">,</span>\n      name<span class="token punctuation">:</span> <span class="token string">\'date\'</span><span class="token punctuation">,</span>\n      message<span class="token punctuation">:</span> <span class="token string">\'When is this going to be posted\'</span><span class="token punctuation">,</span>\n      choices<span class="token punctuation">:</span> <span class="token function">map</span><span class="token punctuation">(</span>dates<span class="token punctuation">,</span> <span class="token punctuation">(</span>value<span class="token punctuation">,</span> key<span class="token punctuation">)</span> <span class="token operator">=></span> key<span class="token punctuation">)</span><span class="token punctuation">,</span>\n      filter<span class="token punctuation">:</span> key <span class="token operator">=></span> <span class="token punctuation">{</span>\n        <span class="token keyword">return</span> dates<span class="token punctuation">[</span>key<span class="token punctuation">]</span><span class="token punctuation">;</span>\n      <span class="token punctuation">}</span><span class="token punctuation">,</span>\n    <span class="token punctuation">}</span><span class="token punctuation">,</span>\n  <span class="token punctuation">]</span><span class="token punctuation">)</span>\n  <span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span>answers <span class="token operator">=></span> <span class="token punctuation">{</span>\n    <span class="token keyword">let</span> postDate <span class="token operator">=</span> <span class="token function">moment</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>answers<span class="token punctuation">.</span>date<span class="token punctuation">,</span> <span class="token string">\'days\'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token keyword">let</span> year <span class="token operator">=</span> postDate<span class="token punctuation">.</span><span class="token function">format</span><span class="token punctuation">(</span><span class="token string">\'YYYY\'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token keyword">let</span> formattedDate <span class="token operator">=</span> postDate<span class="token punctuation">.</span><span class="token function">format</span><span class="token punctuation">(</span><span class="token string">\'YYYY/MM/DD\'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token function">mkFile</span><span class="token punctuation">(</span>\n      <span class="token template-string"><span class="token string">`/src/pages/posts/</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>year<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">/</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>answers<span class="token punctuation">.</span>key<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">.md`</span></span><span class="token punctuation">,</span>\n      <span class="token template-string"><span class="token string">`---\ntitle: "</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>answers<span class="token punctuation">.</span>title<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">"\ndate: "</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>formattedDate<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">"\nlayout: "post"\npath: "/</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>formattedDate<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">/</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>answers<span class="token punctuation">.</span>key<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">/"\ndescription: "</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>answers<span class="token punctuation">.</span>description<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">"\nkeywords: "</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>answers<span class="token punctuation">.</span>tags<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">"\ncategory: "</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>answers<span class="token punctuation">.</span>category<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">"\nkey: "</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>answers<span class="token punctuation">.</span>key<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">"\nreadNext: "ten-things-js,favorite-interview,jest-matchers-1"\n---\n\n    `</span></span>\n    <span class="token punctuation">)</span><span class="token punctuation">;</span>\n  <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre>\n      </div>\n<p>Inquirer makes it really nice to gather up all the information, then I use a utility I’ve already written to dump it in a file.  I want to do a bunch more here in the future here, starting by giving this script the ability to read and parse my existing posts, which will let me enforce uniqueness on names and keys, as well as offer autocomplete on the readNext column, which I’ve left hardcoded for now, since its hard to type free form.  There’s more to come here, and you all may feel free to steal and remix anything you find useful for your own blogs here.</p>',frontmatter:{title:"Improving Gatsby Blog Deploy UX",keywords:"gatsby travis inquirer.js ci cli",category:"tools",date:"2017/11/07",path:"/2017/11/07/blog-deploy-ux/",layout:"post",hideFooter:null},fields:{slug:"/2017/11/07/blog-deploy-ux/"}}},pathContext:{slug:"/2017/11/07/blog-deploy-ux/",relatedPosts:[{path:"/2017/06/03/rss-atom-json-gatsby/",data:{title:"Adding RSS, Atom, and JSON Feed to Gatsby",path:"/2017/06/03/rss-atom-json-gatsby/",description:"How to support subscription feeds with Gastby",date:"2017-06-04T01:55:00+00:00"}},{path:"/2017/07/19/ten-things-javascript/",data:{title:"Ten Things A Serious JavaScript Developer Should Learn",path:"/2017/07/19/ten-things-javascript/",description:"Some of the important things to pick up in the JS world",date:"2017-07-19T04:00:00+00:00"}},{path:"/2017/11/03/friday-links/",data:{title:"Weekly Links: November 3rd 2017",path:"/2017/11/03/friday-links/",description:"The very first Weekly Links post: Snapshot Testing and being Tech-wise",date:"2017-11-03T04:00:00+00:00"}}]}}}});
//# sourceMappingURL=path---2017-11-07-blog-deploy-ux-cef749fecda2a4049b53.js.map