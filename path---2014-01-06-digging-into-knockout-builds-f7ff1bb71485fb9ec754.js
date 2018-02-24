webpackJsonp([0xa1effe72db9a],{643:function(n,s){n.exports={data:{markdownRemark:{html:'<p>There’s a lot you can learn by looking through other people’s code.  This is especially true when you’re looking at widely used open-source libraries, where you can see how people have solved real problems with code that has been battle-tested and debated.</p>\n<p>In this spirit of code literacy, I spent some time this past weekend to look through the source code for <a href="http://knockoutjs.com/">KnockoutJS</a>.  Knockout is a MVVM library in Javascript designed to make 2 way declarative bindings easy.  I’m wanted to write a bit about what I saw in Knockout’s structure and build process.</p>\n<h3>Intro</h3>\n<p>Some of the first decisions a developer has to make when starting a new javascript project revolve around project structure and build processes.  They need to decide how they’ll handle things like testing and minification.  For a library like Knockout, developers also need to figure out how to make sure that they don’t expose any internal logic to the global scope.  This post takes a look at how Knockout deals with these challenges.  You can follow along by getting <a href="https://github.com/knockout/knockout">the source</a> off of Github.</p>\n<h3>Project Structure</h3>\n<p>Knockout is organized with a traditional <code>src</code>,<code>spec</code>,<code>build</code> structure, with the main src code in the src directory, <a href="http://pivotal.github.io/jasmine/">Jasmine</a> tests in the spec directory, and build-related files in the build directory.  The src directory is fairly flat, with directories for bindings, templating and subscribables.  The spec directory does not mirror it exactly.  The spec files are organized around functional categories at the root of the source files, with a separate directory holding tests for the default bindings.   The build direction contains several files related to the build process, which I’ll discuss below.  In the root directory there are dotfiles for <a href="https://npmjs.org/">NPM</a>, <a href="http://git-scm.com/">git</a>, and <a href="http://about.travis-ci.org/">TravisCI</a>, a package.json file, and the gruntfile.</p>\n<h3>Grunt</h3>\n<p>Knockout’s build process is automated using Grunt, an automation tool built on <a href="xmpux.cisco.com">NodeJS</a>.  Knockout’s gruntfile weighs in at a very readable 150 lines of code, and only defines one task.  That default task looks like this:</p>\n<div class="gatsby-highlight">\n      <pre class="language-javascript"><code><span class="token comment">//Grunt Default Task</span>\ngrunt<span class="token punctuation">.</span><span class="token function">registerTask</span><span class="token punctuation">(</span><span class="token string">\'default\'</span><span class="token punctuation">,</span> <span class="token punctuation">[</span><span class="token string">\'clean\'</span><span class="token punctuation">,</span> <span class="token string">\'checktrailingspaces\'</span><span class="token punctuation">,</span> <span class="token string">\'build\'</span><span class="token punctuation">,</span> <span class="token string">\'test\'</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre>\n      </div>\n<p>So when you build knockout you’re executing 4 steps.</p>\n<h4>Clean</h4>\n<p>This deletes the knockout-latest.debug.js and knockout-latest.min.js files from the <code>build/output</code> directory</p>\n<h4>Check Trailing Spaces</h4>\n<p>This checks source files for trailing spaces and throws an error if they exist, ending the build.</p>\n<h4>Build</h4>\n<p>More detail on this below.</p>\n<h4>Test</h4>\n<p>Test spawns a child process which calls 2 scripts: ‘spec/runner.phantom.js’ and ‘spec/runner.node.js’.  The script runs asynchronously in the background, with the results being passed to standard out through a callback.</p>\n<div class="gatsby-highlight">\n      <pre class="language-javascript"><code><span class="token comment">//Grunt Test Task</span>\ngrunt<span class="token punctuation">.</span><span class="token function">initConfig</span><span class="token punctuation">(</span><span class="token punctuation">{</span>\n    <span class="token comment">//...</span>\n    test<span class="token punctuation">:</span> <span class="token punctuation">{</span>\n        phantomjs<span class="token punctuation">:</span> <span class="token string">\'spec/runner.phantom.js\'</span><span class="token punctuation">,</span>\n        node<span class="token punctuation">:</span> <span class="token string">\'spec/runner.node.js\'</span>\n    <span class="token punctuation">}</span>\n<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\ngrunt<span class="token punctuation">.</span><span class="token function">registerMultiTask</span><span class="token punctuation">(</span><span class="token string">\'test\'</span><span class="token punctuation">,</span> <span class="token string">\'Run tests\'</span><span class="token punctuation">,</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token keyword">var</span> done <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token keyword">async</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    grunt<span class="token punctuation">.</span>util<span class="token punctuation">.</span><span class="token function">spawn</span><span class="token punctuation">(</span><span class="token punctuation">{</span> cmd<span class="token punctuation">:</span> <span class="token keyword">this</span><span class="token punctuation">.</span>target<span class="token punctuation">,</span> args<span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token keyword">this</span><span class="token punctuation">.</span>data<span class="token punctuation">]</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>\n        <span class="token keyword">function</span> <span class="token punctuation">(</span>error<span class="token punctuation">,</span> result<span class="token punctuation">,</span> code<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n            <span class="token keyword">if</span> <span class="token punctuation">(</span>code <span class="token operator">===</span> <span class="token number">127</span> <span class="token comment">/*not found*/</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n                grunt<span class="token punctuation">.</span>verbose<span class="token punctuation">.</span><span class="token function">error</span><span class="token punctuation">(</span>result<span class="token punctuation">.</span>stderr<span class="token punctuation">)</span><span class="token punctuation">;</span>\n                <span class="token comment">// ignore this error</span>\n                <span class="token function">done</span><span class="token punctuation">(</span><span class="token boolean">true</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n            <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>\n                grunt<span class="token punctuation">.</span>log<span class="token punctuation">.</span><span class="token function">writeln</span><span class="token punctuation">(</span>result<span class="token punctuation">.</span>stdout<span class="token punctuation">)</span><span class="token punctuation">;</span>\n                <span class="token keyword">if</span> <span class="token punctuation">(</span>error<span class="token punctuation">)</span>\n                    grunt<span class="token punctuation">.</span>log<span class="token punctuation">.</span><span class="token function">error</span><span class="token punctuation">(</span>result<span class="token punctuation">.</span>stderr<span class="token punctuation">)</span><span class="token punctuation">;</span>\n                <span class="token function">done</span><span class="token punctuation">(</span><span class="token operator">!</span>error<span class="token punctuation">)</span><span class="token punctuation">;</span>\n            <span class="token punctuation">}</span>\n        <span class="token punctuation">}</span>\n    <span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre>\n      </div>\n<p>Overall a few things stand out about Knockout’s gruntfile.</p>\n<ol>\n<li>\n<p>It’s written with no dependencies other than the base grunt-cli package, which is specifically called out in package.json to be run locally.  This is in sharp contrast to most Grunt-based projects I’ve seen, which assume a global install of Grunt and then make heavy use of the Grunt plugin ecosystem.</p>\n</li>\n<li>\n<p>The only code consistency check is flagging trailing whitespace. Rather than enforce styling with a tool like jsHint, the build process only protects the integrity of the diffs with the whitespace check. This is probably a consequence of the plugin-free build file set up.  Overall the build philosophy seems to aim to keep things as simple as possible.</p>\n</li>\n</ol>\n<h3>The Build Process</h3>\n<p>So what happens with the build command?  When it’s executed the build command runs a task which creates 2 files, knockout-latest.debug.js and knockout-latest.min. Each of them contain the same content, with the debug version wrapped in an <a href="http://benalman.com/news/2010/11/immediately-invoked-function-expression/">IIFE</a>, and the minified version run through Google closure compiler.</p>\n<p>The content is pulled together with the <code>getCombinedSources</code> function:</p>\n<div class="gatsby-highlight">\n      <pre class="language-javascript"><code><span class="token comment">//Grunt Build Task</span>\n<span class="token keyword">function</span> <span class="token function">getCombinedSources</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token keyword">var</span> fragments <span class="token operator">=</span> grunt<span class="token punctuation">.</span><span class="token function">config</span><span class="token punctuation">(</span><span class="token string">\'fragments\'</span><span class="token punctuation">)</span><span class="token punctuation">,</span>\n        sourceFilenames <span class="token operator">=</span> <span class="token punctuation">[</span>\n            fragments <span class="token operator">+</span> <span class="token string">\'extern-pre.js\'</span><span class="token punctuation">,</span>\n            fragments <span class="token operator">+</span> <span class="token string">\'amd-pre.js\'</span><span class="token punctuation">,</span>\n            <span class="token function">getReferencedSources</span><span class="token punctuation">(</span>fragments <span class="token operator">+</span> <span class="token string">\'source-references.js\'</span><span class="token punctuation">)</span><span class="token punctuation">,</span>\n            fragments <span class="token operator">+</span> <span class="token string">\'amd-post.js\'</span><span class="token punctuation">,</span>\n            fragments <span class="token operator">+</span> <span class="token string">\'extern-post.js\'</span>\n        <span class="token punctuation">]</span><span class="token punctuation">,</span>\n        flattenedSourceFilenames <span class="token operator">=</span> Array<span class="token punctuation">.</span>prototype<span class="token punctuation">.</span>concat<span class="token punctuation">.</span><span class="token function">apply</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">,</span> sourceFilenames<span class="token punctuation">)</span><span class="token punctuation">,</span>\n        combinedSources <span class="token operator">=</span> flattenedSourceFilenames<span class="token punctuation">.</span><span class="token function">map</span><span class="token punctuation">(</span><span class="token keyword">function</span><span class="token punctuation">(</span>filename<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n            <span class="token keyword">return</span> grunt<span class="token punctuation">.</span>file<span class="token punctuation">.</span><span class="token function">read</span><span class="token punctuation">(</span><span class="token string">\'./\'</span> <span class="token operator">+</span> filename<span class="token punctuation">)</span><span class="token punctuation">;</span>\n        <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">join</span><span class="token punctuation">(</span><span class="token string">\'\'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n    <span class="token keyword">return</span> combinedSources<span class="token punctuation">.</span><span class="token function">replace</span><span class="token punctuation">(</span><span class="token string">\'##VERSION##\'</span><span class="token punctuation">,</span> grunt<span class="token punctuation">.</span><span class="token function">config</span><span class="token punctuation">(</span><span class="token string">\'pkg.version\'</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n</code></pre>\n      </div>\n<p>So this takes each of the files returned by the getReferencedSources function, and wraps them with 2 more files on each side.  Lets look at the wrapper files first.</p>\n<p>extern-pre.js sets up an IIFE and defines several global values within the local scope.  This is done in order to protect against any reuse of these names in the local scope where knockout is loaded.</p>\n<div class="gatsby-highlight">\n      <pre class="language-javascript"><code><span class="token comment">//extern-pre.js</span>\n<span class="token punctuation">(</span><span class="token keyword">function</span><span class="token punctuation">(</span>undefined<span class="token punctuation">)</span><span class="token punctuation">{</span>\n    <span class="token comment">// (0, eval)(\'this\') is a robust way of getting a reference to the global object</span>\n    <span class="token comment">// For details, see http://stackoverflow.com/questions/14119988/return-this-0-evalthis/14120023#14120023</span>\n    <span class="token keyword">var</span> window <span class="token operator">=</span> <span class="token keyword">this</span> <span class="token operator">||</span> <span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">,</span> eval<span class="token punctuation">)</span><span class="token punctuation">(</span><span class="token string">\'this\'</span><span class="token punctuation">)</span><span class="token punctuation">,</span>\n        document <span class="token operator">=</span> window<span class="token punctuation">[</span><span class="token string">\'document\'</span><span class="token punctuation">]</span><span class="token punctuation">,</span>\n        navigator <span class="token operator">=</span> window<span class="token punctuation">[</span><span class="token string">\'navigator\'</span><span class="token punctuation">]</span><span class="token punctuation">,</span>\n        jQuery <span class="token operator">=</span> window<span class="token punctuation">[</span><span class="token string">"jQuery"</span><span class="token punctuation">]</span><span class="token punctuation">,</span>\n        JSON <span class="token operator">=</span> window<span class="token punctuation">[</span><span class="token string">"JSON"</span><span class="token punctuation">]</span><span class="token punctuation">;</span>\n</code></pre>\n      </div>\n<p>amd-pre.js determines the type of module system in use (if any) and passes the correct object into the inner scope as koExports.</p>\n<div class="gatsby-highlight">\n      <pre class="language-javascript"><code><span class="token comment">//amd-pre.js</span>\n<span class="token punctuation">(</span><span class="token keyword">function</span><span class="token punctuation">(</span>factory<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n  <span class="token comment">// Support three module loading scenarios</span>\n  <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">typeof</span> require <span class="token operator">===</span> <span class="token string">\'function\'</span> <span class="token operator">&amp;&amp;</span> <span class="token keyword">typeof</span> exports <span class="token operator">===</span> <span class="token string">\'object\'</span> <span class="token operator">&amp;&amp;</span> <span class="token keyword">typeof</span> module <span class="token operator">===</span> <span class="token string">\'object\'</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token comment">// [1] CommonJS/Node.js</span>\n    <span class="token keyword">var</span> target <span class="token operator">=</span> module<span class="token punctuation">[</span><span class="token string">\'exports\'</span><span class="token punctuation">]</span> <span class="token operator">||</span> exports<span class="token punctuation">;</span> <span class="token comment">//module.exports is for Node.js</span>\n    <span class="token function">factory</span><span class="token punctuation">(</span>target<span class="token punctuation">)</span><span class="token punctuation">;</span>\n  <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">typeof</span> define <span class="token operator">===</span> <span class="token string">\'function\'</span> <span class="token operator">&amp;&amp;</span> define<span class="token punctuation">[</span><span class="token string">\'amd\'</span><span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token comment">// [2] AMD anonymous module</span>\n    <span class="token function">define</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token string">\'exports\'</span><span class="token punctuation">]</span><span class="token punctuation">,</span> factory<span class="token punctuation">)</span><span class="token punctuation">;</span>\n  <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>\n    <span class="token comment">// [3] No module loader (plain &lt;script> tag) - put directly in global namespace</span>\n    <span class="token function">factory</span><span class="token punctuation">(</span>window<span class="token punctuation">[</span><span class="token string">\'ko\'</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n  <span class="token punctuation">}</span>\n<span class="token punctuation">}</span><span class="token punctuation">)</span>\n</code></pre>\n      </div>\n<p>The *-post.js files simply close these function statements.</p>\n<p>So in the end we’re left with an IIFE that wraps all of the content and defines global variables within the scope, and then executes a second IIFE which determines the module format in use and executes the inner factory function accordingly.  The factory function is made up of the various files in the src directory, concatenated together in the order specified in build/fragments/source-references.js.</p>\n<h3>Initializing the library</h3>\n<p>The first few files loaded into the inner function are short files designed to provide a base for the library.</p>\n<p>namespace.js sets up the ko object that is referenced internally in the file.</p>\n<div class="gatsby-highlight">\n      <pre class="language-javascript"><code><span class="token comment">//namespace.js</span>\n<span class="token comment">// Internally, all KO objects are attached to koExports (even the non-exported ones whose names will be minified by the closure compiler).</span>\n<span class="token comment">// In the future, the following "ko" variable may be made distinct from "koExports" so that private objects are not externally reachable.</span>\n<span class="token keyword">var</span> ko <span class="token operator">=</span> <span class="token keyword">typeof</span> koExports <span class="token operator">!==</span> <span class="token string">\'undefined\'</span> <span class="token operator">?</span> koExports <span class="token punctuation">:</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">;</span>\n</code></pre>\n      </div>\n<p>google-closure-compiler-utils.js defines two helper functions, exportSymbol and exportProperty which allow for greater minimization of the internal ko library while maintaining a consistent external api.  These functions are used everywhere throughout the library for defining externally facing function and property names.</p>\n<div class="gatsby-highlight">\n      <pre class="language-javascript"><code><span class="token comment">//google-closure-compiler-utils.js</span>\n\n<span class="token comment">// Google Closure Compiler helpers (used only to make the minified file smaller)</span>\nko<span class="token punctuation">.</span><span class="token function-variable function">exportSymbol</span> <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span>koPath<span class="token punctuation">,</span> object<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token keyword">var</span> tokens <span class="token operator">=</span> koPath<span class="token punctuation">.</span><span class="token function">split</span><span class="token punctuation">(</span><span class="token string">"."</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n    <span class="token comment">// In the future, "ko" may become distinct from "koExports" (so that non-exported objects are not reachable)</span>\n    <span class="token comment">// At that point, "target" would be set to: (typeof koExports !== "undefined" ? koExports : ko)</span>\n    <span class="token keyword">var</span> target <span class="token operator">=</span> ko<span class="token punctuation">;</span>\n\n    <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">var</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> tokens<span class="token punctuation">.</span>length <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span>\n        target <span class="token operator">=</span> target<span class="token punctuation">[</span>tokens<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">]</span><span class="token punctuation">;</span>\n    target<span class="token punctuation">[</span>tokens<span class="token punctuation">[</span>tokens<span class="token punctuation">.</span>length <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">]</span> <span class="token operator">=</span> object<span class="token punctuation">;</span>\n<span class="token punctuation">}</span><span class="token punctuation">;</span>\nko<span class="token punctuation">.</span><span class="token function-variable function">exportProperty</span> <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span>owner<span class="token punctuation">,</span> publicName<span class="token punctuation">,</span> object<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n  owner<span class="token punctuation">[</span>publicName<span class="token punctuation">]</span> <span class="token operator">=</span> object<span class="token punctuation">;</span>\n<span class="token punctuation">}</span><span class="token punctuation">;</span>\n</code></pre>\n      </div>\n<p>Finally version.js sets up a placeholder for ko.version, which is then replaced with the version number in Package.json as part of the grunt build task.</p>\n<div class="gatsby-highlight">\n      <pre class="language-javascript"><code><span class="token comment">//version.js</span>\nko<span class="token punctuation">.</span>version <span class="token operator">=</span> <span class="token string">"##VERSION##"</span><span class="token punctuation">;</span>\n\nko<span class="token punctuation">.</span><span class="token function">exportSymbol</span><span class="token punctuation">(</span><span class="token string">\'version\'</span><span class="token punctuation">,</span> ko<span class="token punctuation">.</span>version<span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre>\n      </div>\n<h3>Conclusion</h3>\n<p>There are a few interesting things we can note from Knockout’s build approach.</p>\n<h4>Using IIFE’s to isolate local scope is a practical and important technique for library design</h4>\n<p>If you’ve been counting, the debug version of the library is wrapped in 3 different levels of IIFEs before any code exposing external functionality is actually included.  This allows Knockout to provide several layers of data protection and abstraction, making sure that it is referencing the correct global variables and preventing scope leaks.</p>\n<h4>Its relatively straightforward to support module formats even if your library doesn’t use them internally</h4>\n<p>Take a look again at amd-pre.js.  Its 15 lines of code to support AMD loaders, CommonJS loaders and normal script tag loading.  Knockout doesn’t use a modern “module solution” approach to code organization.  Instead it uses a more traditional namespacing approach wrapped in IIFEs.  But it still plays well with others nicely.  It’s hard to see how this type of effort wouldn’t be worth it for library designers.</p>',frontmatter:{title:"Digging Into Knockout Builds",keywords:null,category:"frameworks",date:"2014-01-06T23:30:00+00:00",path:"/2014/01/06/digging-into-knockout-builds",layout:"post",hideFooter:null},fields:{slug:"/2014/01/06/digging-into-knockout-builds"}}},pathContext:{slug:"/2014/01/06/digging-into-knockout-builds",relatedPosts:[{path:"/2013/05/07/revertible-observables-in-knockout",data:{title:"Revertible Observables in Knockout",path:"/2013/05/07/revertible-observables-in-knockout",description:"Building an observable with simple undo functionality",date:"2013-05-07T20:05:00+00:00"}},{path:"/2013/01/06/book-review-effective-javascript",data:{title:"Book Review: Effective Javascript",path:"/2013/01/06/book-review-effective-javascript",description:"A book review of Effective Javascript by David Herman",date:"2013-01-06T22:00:00+00:00"}},{path:"/2015/11/25/productive-javascript-development",data:{title:"Productive JavaScript Development",path:"/2015/11/25/productive-javascript-development",description:"An examination of what makes JavaScript development productive",date:"2015-11-25T14:43:46+00:00"}}]}}}});
//# sourceMappingURL=path---2014-01-06-digging-into-knockout-builds-f7ff1bb71485fb9ec754.js.map