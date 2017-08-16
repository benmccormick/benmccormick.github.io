webpackJsonp([0x5747412329c10c],{"./node_modules/json-loader/index.js!./.cache/json/2015-01-22-is-bower-useful.json":function(e,n){e.exports={data:{markdownRemark:{html:'<p>\n  <a\n    class="gatsby-resp-image-link"\n    href="undefined"\n    style="display: block"\n    target="_blank"\n    rel="noopener"\n  >\n  \n  <span\n    class="gatsby-resp-image-wrapper"\n    style="position: relative; z-index: -1; display: block; "\n  >\n    <span\n      class="gatsby-resp-image-background-image"\n      style="padding-bottom: 100%;position: relative; width: 100%; bottom: 0; left: 0; background-image: url(\'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAACXBIWXMAAAsSAAALEgHS3X78AAAC9UlEQVQ4y72UWUhUYRTHFQx6CaIXH9roIeguc+c6V3AapUZcJ5cYl1Gn0izbFEdjJHKC0gR9UHHDQrCU1Gw0fCiXQsOELE2jKKgIQok2iGx0NKZc/p17ydDRxAoa+D3MfOf73XPuOXM8PP7HJ96P2RHnx2QTVUQ5kXg8WPL6Y5FJy26ny122XdxcS7gafVEi7kSKKAtSweTHPKIz7/lYs47zpO9xYYaw67Fa9pI1QuvpnlXIER07cT/aB18SfJdwK0IECbrl2CQdtzYsPPTm1nMN2JLfBLobsEhGgcJRHTv5OlbzSzB+QoLzqoipRhGONEn5LTuAk6XmKP3Oi97FXdhQ0QcpLef9klIpaHBw7+LMJptEtFzIR3OFFa56EQN0XlNSCHt9LXIs6fA5ZoNH62cER0Z2uMsCz+v5JSVONYjIimZgS2ThqvVBY5iA9rZWRZhZVIZ9Fit05jQ5Y5O7sPw2vR93oeOwBFedqMgcKRK6KOZsRir2B0pN+hjTmPZA+qhRJ2QtV27vqxjNso1YyHOKoViZHqKaOEkYaDI2uguffoiXVpQ9M2pgC+Lwwq7Cuw4BTxpU6CzlUWPlkJvAIsmfeUueOkKnNGQ0bvkMP9KD+mmM2veoMVYpAsNqzAwK+NQtoJ/kldU8DhaxCClmobco2c/Kwmv3osUVM5wq0GBuSK0I5xl5IKCihwffwsK3ikVosiKELMwsj+YxYZGUeXOe1uBrsQ+cuRpM5mnw3S4qsm9DAmaJ4X4B9rsqGNs5cG0s+FYWURGKbJwolIWbEnTM9JsbqkUZuDNNMmMdBxVlpKUyfStYGEwMYvyZaXJMENaFjWmWZ87RK/xeOCDgUBAz8nNZnCLyiVJi89LtomW20YEzg1KXO7mcsLWAl8uaI4JWtWkoMEnukvxi85JZdJbws4+vqPDwsgrlGdz8DMo0rnp9UbCReEn0EWcWSOaRMzT81ZI1+/Pr6LI8sC5iRh4vIuWfNjftPa/U3eo19Pdav9o7PwBzQDr0XXoWLAAAAABJRU5ErkJggg==\'); background-size: cover; display: block;"\n    >\n      <img\n        class="gatsby-resp-image-image"\n        style="width: 100%; margin: 0; vertical-align: middle; position: absolute; top: 0; left: 0; box-shadow: inset 0px 0px 0px 400px white;"\n        alt="bower logo"\n        title=""\n        src="/static/8eacc2086cb3c1b21c8067c8da64390e-751de.png"\n        srcset="/static/8eacc2086cb3c1b21c8067c8da64390e-a6b6e.png 143w,\n/static/8eacc2086cb3c1b21c8067c8da64390e-8e488.png 285w,\n/static/8eacc2086cb3c1b21c8067c8da64390e-751de.png 512w"\n        sizes="(max-width: 570px) 100vw, 570px"\n      />\n    </span>\n  </span>\n  \n  </a>\n    </p>\n<p>I first heard about <a href="http://bower.io/">Bower</a> about a year and half ago, and was immediately confused.  Bower is branded as a package manager for the web.  My immediate question: “Why create another package manager for JavaScript, when <a href="https://www.npmjs.com/">npm</a> was just starting to become a standard?”  I certainly wasn’t the only one thinking it.</p>\n<blockquote class="twitter-tweet" lang="en"><p>&quot;What&#39;s bower?&quot;&#10;&quot;A package manager, install it with npm.&quot;&#10;&quot;What&#39;s npm?&quot;&#10;&quot;A package manager, you can install it with brew&quot;&#10;&quot;What&#39;s brew?&quot;&#10;...</p>&mdash; Stefan Baumgartner (@ddprrt) <a href="https://twitter.com/ddprrt/status/529909875347030016">November 5, 2014</a></blockquote>\n<p>If you can use npm to install Bower, you can use it to install packages directly.  And if you don’t like npm, is it that hard to just pull in your dependencies manually?  Why use a package manager at all?</p>\n<p>A year later, I now believe Bower is a useful and important part of the web development ecosystem, so in the interest of sharing knowledge and because I can’t resist the chance to flout <a href="http://en.wikipedia.org/wiki/Betteridge&#x27;s_law_of_headlines">Betteridge’s law of headlines</a>, here’s my case for why Bower is useful.</p>\n<h3>Manual package management doesn’t scale</h3>\n<p>For quite a while I was content to manage my web dependencies manually.  I would go to a project site, hit the big download button, move the files into my project and get on with my day.  It was simple and required no setup or tools.  I was happy.  However I’m now managing a project that includes almost 30 external front end dependencies of some kind.  At that scale it’s impossible to shrug off the pain points of the “Do It Yourself” approach.</p>\n<p>The biggest problems come around keeping dependencies up to date. Simple solutions unravel quickly here.  First, while it would be lovely if every front end library included a version number in their distributed file, that’s not always the case.  So keeping track of versions reliably invariably means some sort of external documentation.  Even when I knew the version, I would have to manually go to each libraries site to see if there was a newer version, then test it, and then either keep 2 copies of the library around or mess with git branches while I was testing to see if the new version caused any problems or regressions.  That was fine with a few libraries, but it doesn’t scale well.</p>\n<p>So my advice?  Don’t try to manage your assets manually after your projects grow to a certain size.  You’ll spend unnecessary time keeping them up to date, clutter your version control logs, and will have to actually document the versions somewhere anyway.  So manual package management is out.  But why not just use npm?</p>\n<h3>npm is the right answer to the wrong question</h3>\n<p>npm is a fantastic package manager for node development.  Being able to immediately pull in a library and all of its dependencies then be confident that it will work with the module format you use is a fantastic thing, and npm has pulled it off well.  So why not just use it for all of your web development package management needs?</p>\n<p>The problem is that it’s impossible for tools to optimize for everything. npm has optimized for node development.  That leads to problems when using it in other settings.  First of all, many npm packages assume you’re using the commonJS module format.  Node encourages small modules that may have many dependencies, linked with commonJS.  It’s possible to use those modules on the front end of course if you use a tool like <a href="http://browserify.org/">Browserify</a>, but your choice of package manager should not lock you into a specific module format or build tool.  Most major packages do distribute their code in a UMD format that can be loaded in multiple ways, but some do not, and when those packages have dependencies, we have another problem.</p>\n<p>npm has a nested dependency tree, where each module also loads all of its dependencies individually.  This is fine on the server, where you can put node<em>modules into your .gitignore file and effectively pretend those files are not there.  When writing client-side code though, it’s important to be efficient with bandwidth.  You can’t load multiple versions of a dependency if, for instance, you used multiple libraries that depend on Underscore or jQuery.  That’s a problem if you’re using browserify, since you’ll need to find a way to normalize those dependencies to a single file.  But nested dependencies are also annoying when using other problems, both due to the need to manually figure out what you need and avoid duplication as well as the awkwardness of making deep path references down several layers of node</em>modules folders.</p>\n<p>Lastly, I’d encourage people considering npm for front-end package management to use a tool scoped for their needs. npm started as a package manager for node, and that is still its main use.  There are plenty of packages that can be useful both on node and in the browser, but many things only make sense in one environment.  For instance CSS libraries are not useful within node, and file system libraries won’t work in the browser.  I’ll admit that this ship may have already sailed though. Many popular browser only libraries like Bootstrap and Angular are available on npm right now as a response to people who are using npm for everything<sup id="fnref:1"><a href="#fn:1">1</a></sup>.</p>\n<h3>So Why Bower?</h3>\n<p>The problems above explain the case for “yet another package manager”.  So now we can talk about how Bower is better.  Bower is focused on front-end development, provides a flat dependency structure, and doesn’t lock you in to a single way of doing things.  Let me break that down.</p>\n<p><strong>Bower is focused on the front end.</strong>  If you find a package registered on bower.io, you can be confident that it will useful on the front end, and won’t be using node-specific dependencies.</p>\n<p><strong>Bower has a flat dependency structure.</strong>  If multiple libraries require a dependency, Bower will figure out the best version to load and place it in the top level of your bower_components directory.</p>\n<p><strong>Bower doesn’t lock you in.</strong> Nothing about Bower is specific to a certain module format or build tool.  You can use it with RequireJS and Grunt, Webpack and Gulp, or by loading scripts directly into your HTML.</p>\n<p>Bower addresses the pain points that come from manually managing your scripts or using npm.  You get easy version tracking and updating, keep your git logs clean, and can be confident that it will work cleanly with your existing setup.  If you’re starting a new project or updating your dependencies on an existing one, consider using Bower to make your life easier.</p>\n<h3>More Resources</h3>\n<ul>\n<li>\n<p>Want to hear the case for using npm in your front end development? You can find it <a href="http://blog.npmjs.org/post/101775448305/npm-and-front-end-packaging">on their blog</a>.</p>\n</li>\n<li>\n<p>If you’re interested in Bower, it’s also worth checking out <a href="http://yeoman.io/">Yeoman</a>, a project for quickly scaffolding out web projects using Bower and Grunt.</p>\n</li>\n</ul>\n<div class="footnotes">\n<ol>\n    <li class="footnote" id="fn:1">\n        <p>\n        Something npm is clearly <a href="http://blog.npmjs.org/post/101775448305/npm-and-front-end-packaging">encouraging</a>\n        </p>\n        <a href="#fnref:1" title="return to article"> ↩</a></p>\n    </li>\n</ol>\n</div>',frontmatter:{title:"Is Bower Useful?",keywords:null,category:"tools",date:"2015-01-22T04:52:06+00:00",path:"/2015/01/22/is-bower-useful",layout:"post",hideFooter:null}}},pathContext:{slug:"/2015/01/22/is-bower-useful",relatedPosts:[{title:"Atom Productivity Tips",path:"/2017/05/29/atom-tips/",description:"Getting the most out of Atom"},{title:"Mariana Syntax Theme For Atom",path:"/2017/05/28/mariana-syntax-atom/",description:"Announcing a port of the Mariana color scheme to Atom"},{title:"Grading Applications On Config Portability",path:"/2017/04/14/grading-applications-on-config-portability/",description:"Which applications allow syncing settings cross-device?"}]}}}});
//# sourceMappingURL=path---2015-01-22-is-bower-useful-fc69b2f8a4279a03239e.js.map