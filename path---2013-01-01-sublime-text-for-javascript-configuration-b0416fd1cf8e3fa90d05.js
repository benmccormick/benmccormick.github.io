webpackJsonp([0x76e35e2de5dd],{616:function(n,s){n.exports={data:{markdownRemark:{html:'<p>I’m starting a new series of posts on Sublime Text, and how to get the most out of the editor.\nThe series will be focused on Javascript development, as that is how I use Sublime Text, but it should be applicable to any developer who uses Sublime Text as part of their workflow.</p>\n<ul>\n<li><a href="http://benmccormick.org/2012/12/30/sublime-text-for-javascript-keyboard-shortcuts">Sublime Text For Javascript: Keyboard Shortcuts</a></li>\n<li><a href="http://benmccormick.org/2013/01/01/sublime-text-for-javascript-configuration">Sublime Text For Javascript: Configuration</a></li>\n<li><a href="http://benmccormick.org/2013/01/03/sublime-text-for-javascript-plugins">Sublime Text For Javascript: Packages</a></li>\n</ul>\n<h3>Configuration</h3>\n<p>Sublime Text allows for plenty of text editing power out of the box, but the real power comes\nwhen you begin configuring it to meet your own needs.  This is by definition a topic that different people will approach in different ways, but in this post I will attempt to give an overview of what is configurable in Sublime Text (<strong>Spoiler: almost everything</strong>), and how to configure them.</p>\n<h3>The Basics</h3>\n<p>Sublime Text settings are defined using json files.  There are multiple levels of configuration\nto give you very fine grained control of how your editor will act for different files.\nFrom the <a href="http://www.sublimetext.com/docs/2/settings.html">Sublime Docs</a>,  settings are prioritized like this:</p>\n<blockquote>\n<p>Settings files are consulted in this order:</p>\n<p>Packages/Default/Preferences.sublime-settings\nPackages/Default/Preferences (platform).sublime-settings\nPackages/User/Preferences.sublime-settings\n&#x3C;Project Settings >\nPackages/ &#x3C;syntax > / &#x3C;syntax >.sublime-settings\nPackages/User/&#x3C;syntax >.sublime-settings\n&#x3C;Buffer Specific Settings ></p>\n</blockquote>\n<p>Settings can be set on a default, user, project, or syntax-type basis, and add specific\nsettings for distraction free mode.</p>\n<p><strong>Never set your options using the Default-Settings files!</strong></p>\n<p>The default settings files for Sublime text will be overwritten when you update\nto a new version, and the plugin specific settings will be overwritten when those\nplugins are updated.  Always use the “User-Settings” files instead for “global”\nsettings.  Its not a bad idea to immediately copy the default settings file to\nthe User-Settings file when you’re initially setting up sublime so that you can\nsee all of the options that are set in that file and edit them accordingly.</p>\n<p>Heres my User-Settings file for my Windows-based version of Sublime:</p>\n<div class="gatsby-highlight">\n      <pre class="language-json"><code><span class="token punctuation">{</span>\n    // Modified Solarized Theme with Mardown Support (https<span class="token operator">:</span>//gist.github.com/<span class="token number">1904917</span><span class="token punctuation">)</span>\n   <span class="token property">"color_scheme"</span><span class="token operator">:</span> <span class="token string">"Packages/User/Solarized (Light).tmTheme"</span><span class="token punctuation">,</span>\n\n    <span class="token property">"font_face"</span><span class="token operator">:</span> <span class="token string">"Consolas"</span><span class="token punctuation">,</span>\n    <span class="token property">"font_size"</span><span class="token operator">:</span> <span class="token number">8</span><span class="token punctuation">,</span>\n\n    // Valid options are <span class="token string">"no_bold"</span><span class="token punctuation">,</span> <span class="token string">"no_italic"</span><span class="token punctuation">,</span> <span class="token string">"no_antialias"</span><span class="token punctuation">,</span> <span class="token string">"gray_antialias"</span><span class="token punctuation">,</span>\n    // <span class="token string">"subpixel_antialias"</span><span class="token punctuation">,</span> <span class="token string">"no_round"</span> (OS X only<span class="token punctuation">)</span> and <span class="token string">"directwrite"</span> (Windows only<span class="token punctuation">)</span>\n    <span class="token property">"font_options"</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">"directwrite"</span><span class="token punctuation">]</span><span class="token punctuation">,</span>\n\n    // If enabled<span class="token punctuation">,</span> will highlight any line with a caret\n    <span class="token property">"highlight_line"</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>\n\n    // Set to <span class="token boolean">true</span> to automatically save files when switching to a different file\n    // or application\n    <span class="token property">"save_on_focus_lost"</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>\n\n    // Columns in which to display vertical rulers\n    <span class="token property">"rulers"</span><span class="token operator">:</span>\n    <span class="token punctuation">[</span>\n        <span class="token number">80</span>\n    <span class="token punctuation">]</span><span class="token punctuation">,</span>\n\n    // The theme controls the look of Sublime Text\'s UI (buttons<span class="token punctuation">,</span> tabs<span class="token punctuation">,</span> scroll bars<span class="token punctuation">,</span> etc<span class="token punctuation">)</span>\n    <span class="token property">"theme"</span><span class="token operator">:</span> <span class="token string">"Soda Light.sublime-theme"</span><span class="token punctuation">,</span>\n\n    // Set to <span class="token boolean">true</span> to close windows as soon as the last file is closed<span class="token punctuation">,</span> unless\n    // there\'s a folder open within the window. This is always enabled on OS X<span class="token punctuation">,</span>\n    // changing it here won\'t modify the behavior.\n    <span class="token property">"close_windows_when_empty"</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>\n\n    // List any packages to ignore here. When removing entries from this list<span class="token punctuation">,</span>\n    // a restart may be required if the package contains plugins.\n    <span class="token property">"ignored_packages"</span><span class="token operator">:</span>\n    <span class="token punctuation">[</span>\n        <span class="token string">"Default"</span><span class="token punctuation">,</span>\n        <span class="token string">"Vintage"</span><span class="token punctuation">,</span>\n        <span class="token string">"ZenCoding"</span>\n    <span class="token punctuation">]</span>\n<span class="token punctuation">}</span>\n</code></pre>\n      </div>\n<h3>Visuals</h3>\n<p>One of the most configurable thing about Sublime Text is the GUI.  If you don’t\nlike something about how the program looks, it is probably configurable. Some of the\nmost important visual settings are below:</p>\n<h4>Color Scheme</h4>\n<p>The most obvious configurable visual setting is the color scheme.  Sublime ships\nwith a solid selection of default color schemes, and its easy to find and download\nmore online with <a href="http://wbond.net/sublime_packages/package_control">Package Control</a>, which I’ll cover more in the\nplugins article.  I use Sublime’s Monokai Bright theme for JS development, and a\n<a href="https://gist.github.com/1904917">custom Solarized theme</a> for writing in Markdown for this blog and my\nnotes.  You can set color scheme with a command like this in one of your settings files</p>\n<div class="gatsby-highlight">\n      <pre class="language-javascript"><code><span class="token string">"color_scheme"</span><span class="token punctuation">:</span> <span class="token string">"Packages/User/Solarized (Light).tmTheme"</span>\n</code></pre>\n      </div>\n<p>or you can set it in the preferences menu on the top of the screen (this will set it\nin your User-Settings file)</p>\n<h4>Theme</h4>\n<p>You can also configure the overall look and feel of the application.  While the\ndefault is by no means ugly, many people prefer the <a href="https://github.com/buymeasoda/soda-theme/">Soda</a> theme that adds\nsome prettier gradients and a choice of a light/dark theme.  You can set that\nlike this after downloading the theme:</p>\n<div class="gatsby-highlight">\n      <pre class="language-javascript"><code><span class="token string">"theme"</span><span class="token punctuation">:</span> <span class="token string">"Soda Light.sublime-theme"</span><span class="token punctuation">,</span>\n</code></pre>\n      </div>\n<h4>Quickies</h4>\n<p>Here are a few more quick visual tweaks</p>\n<ul>\n<li>“rulers”: set where to show vertical rulers.  Takes an array of integers.  I put one at 80 in order to limit my line lengths in javascript.</li>\n<li>“tab_size”,“translate_tabs_to_spaces”, and “use_tab_stops: Determine space and tabs behaviors.</li>\n<li>“highlight_line”: If true will highlight every line with a cursor</li>\n</ul>\n<h3>Key Bindings</h3>\n<p>This is where all of the information from <a href="http://benmccormick.org/2012/12/30/sublime-text-for-javascript-keyboard-shortcuts">Monday’s post</a> starts to become a whole lot less useful.  All of the keyboard shortcuts that were discussed in that post are completely configurable.  Again you want to use the “User” preferences file in\nPackages/User to set the keybindings.  Keybindings are stored in json form like this:</p>\n<div class="gatsby-highlight">\n      <pre class="language-json"><code><span class="token punctuation">{</span> <span class="token property">"keys"</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">"ctrl+z"</span><span class="token punctuation">]</span><span class="token punctuation">,</span> <span class="token property">"command"</span><span class="token operator">:</span> <span class="token string">"undo"</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>\n<span class="token punctuation">{</span> <span class="token property">"keys"</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">"ctrl+shift+z"</span><span class="token punctuation">]</span><span class="token punctuation">,</span> <span class="token property">"command"</span><span class="token operator">:</span> <span class="token string">"redo"</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>\n<span class="token punctuation">{</span> <span class="token property">"keys"</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">"ctrl+y"</span><span class="token punctuation">]</span><span class="token punctuation">,</span> <span class="token property">"command"</span><span class="token operator">:</span> <span class="token string">"redo_or_repeat"</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>\n<span class="token punctuation">{</span> <span class="token property">"keys"</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">"ctrl+u"</span><span class="token punctuation">]</span><span class="token punctuation">,</span> <span class="token property">"command"</span><span class="token operator">:</span> <span class="token string">"soft_undo"</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>\n<span class="token punctuation">{</span> <span class="token property">"keys"</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">"ctrl+shift+u"</span><span class="token punctuation">]</span><span class="token punctuation">,</span> <span class="token property">"command"</span><span class="token operator">:</span> <span class="token string">"soft_redo"</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>\n</code></pre>\n      </div>\n<p>You can override existing shortcuts to make common commands more convenient or\ncreate your own by combining <a href="http://www.sublimetext.com/docs/commands">sublime commands</a>.  One cool trick is the ability to define keyboard shortcuts to toggle settings.</p>\n<blockquote>\n<p>The toggle_setting command can be used to toggle a setting. For example, to make a key binding that toggles the word_wrap setting on the current file, you can use (in Preferences/Key Bindings - User):</p>\n</blockquote>\n<div class="gatsby-highlight">\n      <pre class="language-json"><code><span class="token punctuation">{</span>\n    <span class="token property">"keys"</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">"alt+w"</span><span class="token punctuation">]</span><span class="token punctuation">,</span>\n    <span class="token property">"command"</span><span class="token operator">:</span> <span class="token string">"toggle_setting"</span><span class="token punctuation">,</span>\n    <span class="token property">"args"</span><span class="token operator">:</span>\n    <span class="token punctuation">{</span>\n        <span class="token property">"setting"</span><span class="token operator">:</span> <span class="token string">"word_wrap"</span>\n    <span class="token punctuation">}</span>\n<span class="token punctuation">}</span>\n</code></pre>\n      </div>\n<blockquote>\n<p>The set_setting command can be used to set a setting to a specific value. For example, this key binding makes the current file use the Cobalt color scheme:</p>\n</blockquote>\n<div class="gatsby-highlight">\n      <pre class="language-json"><code><span class="token punctuation">{</span>\n    <span class="token property">"keys"</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">"ctrl+k"</span><span class="token punctuation">,</span> <span class="token string">"ctrl+c"</span><span class="token punctuation">]</span><span class="token punctuation">,</span>\n    <span class="token property">"command"</span><span class="token operator">:</span> <span class="token string">"set_setting"</span><span class="token punctuation">,</span>\n    <span class="token property">"args"</span><span class="token operator">:</span>\n    <span class="token punctuation">{</span>\n        <span class="token property">"setting"</span><span class="token operator">:</span> <span class="token string">"color_scheme"</span><span class="token punctuation">,</span>\n        <span class="token property">"value"</span><span class="token operator">:</span> <span class="token string">"Packages/Color Scheme - Default/Cobalt.tmTheme"</span>\n    <span class="token punctuation">}</span>\n<span class="token punctuation">}</span>\n</code></pre>\n      </div>\n<p>The settings modified here are buffer specific settings: they override any settings placed in a settings file, but apply to the current file only.</p>\n<h3>Plugins</h3>\n<p>Plugins also sometimes have their own configuration files.  These generally mimic the format of the editor, and its adviced as usual to use the User Settings for these so as to avoid having your settings blown away with updates</p>\n<h3>Build Systems</h3>\n<p>Sublime also lets you configure custom build systems to build your project.  These can be defined at the same levels of everything else, though in this case it probably makes most sense at the syntax and project level.</p>\n<h3>Projects</h3>\n<p>Projects are a great way to organize your Sublime Text files.  You can set up a project\nat any time by creating a .sublime-project file (this will happen automatically if you choose save project or edit project in the Project toolbar menu).  The project configuration menu takes a list of folders, a list of settings, and a list of build system settings as a JSON file.  These settings will then override your user level settings for files in the folders that you specify.  This lets you meet project specifications for things like tabs or line length without constantly fiddling with settings.  You also can enable or disable different plugins based on project, and create visual distinction between projects with different color themes.</p>\n<h3>Macros</h3>\n<p>Macros let you save a series of common commands as a json file.  You can then run them\nfrom the “Tools/Macro” menu.  There’s more information in the <a href="http://docs.sublimetext.info/en/latest/extensibility/macros.html">unofficial docs</a></p>\n<h3>Snippets</h3>\n<p>One final thing that you can configure in Sublime Text is “Snippets”.  Sublime Snippets provide advanced templating ability thats configured with an XML template.  A detailed description of what you can do with snippets is available in the <a href="http://docs.sublimetext.info/en/latest/extensibility/snippets.html">unofficial docs</a>.  Suffice it to say that it allows everything from a simple text replacement to full  templating based on a variety of environment variables.</p>\n<p>Sublime contains several Javascript related snippets by default for several basic tasks, and there are more that you can find in other places around the internet.  <a href="http://freshbrewedcode.com/jonathancreamer/2012/07/13/a-couple-of-useful-javascript-sublime-text-2-snippets/">Here’s one example by Jonathan Creamer</a> with a few snippets for plugin development, and a nice little console.log snippet for quick development.</p>\n<h3>Summary</h3>\n<ol>\n<li>Pretty much everything in Sublime can be customized using JSON files</li>\n<li>Use User files or project/syntax specific files, not the Default files</li>\n<li>Learn your options and you can get a lot more out of Sublime Text</li>\n</ol>\n<p>I hope this is helpful.  I’ll be following up with one final post later this week on helpful Sublime plugins for javascript development.</p>',frontmatter:{title:"Sublime Text For Javascript: Configuration",keywords:null,category:"tools",date:"2013-01-01T18:00:00+00:00",path:"/2013/01/01/sublime-text-for-javascript-configuration",layout:"post",hideFooter:null},fields:{slug:"/2013/01/01/sublime-text-for-javascript-configuration"}}},pathContext:{slug:"/2013/01/01/sublime-text-for-javascript-configuration",relatedPosts:[{path:"/2012/11/08/shutdown-tiles-for-windows-8-start-screen",data:{title:"Shutdown Tiles for Windows 8 Start Screen",path:"/2012/11/08/shutdown-tiles-for-windows-8-start-screen",description:"A solve for shutting down Windows 8 easily",date:"2012-11-08T12:00:00+00:00"}},{path:"/2012/12/30/sublime-text-for-javascript-keyboard-shortcuts",data:{title:"Sublime Text For Javascript: Keyboard Shortcuts",path:"/2012/12/30/sublime-text-for-javascript-keyboard-shortcuts",description:"Helpful keyboard shortcuts for JS developers",date:"2012-12-30T21:00:00+00:00"}},{path:"/2012/11/07/sync-multiple-google-calendars-in-windows-8",data:{title:"Sync Multiple Google Calendars in Windows 8",path:"/2012/11/07/sync-multiple-google-calendars-in-windows-8",description:"A helpful tip for using Google Calendar in Windows 8",date:"2012-11-07T12:00:00+00:00"}}]}}}});
//# sourceMappingURL=path---2013-01-01-sublime-text-for-javascript-configuration-b0416fd1cf8e3fa90d05.js.map