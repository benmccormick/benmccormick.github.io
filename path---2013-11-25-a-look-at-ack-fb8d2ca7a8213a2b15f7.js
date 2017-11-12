webpackJsonp([0x2b8660e01429c600],{"./node_modules/json-loader/index.js!./.cache/json/2013-11-25-a-look-at-ack.json":function(e,t){e.exports={data:{markdownRemark:{html:'<p>Do you spend a lot of time searching your projects for a specific piece of code?  Frustrated by grep’s weird syntax or slow IDE search tools?  <a href="http://beyondgrep.com/">Ack</a> is a tool like grep designed for programmers.  I use it for searching my source code to track down sections of code or look for occurences of a variable or reference.  It’s a simple open-source tool that does one job well, and does it with blazing speed.</p>\n<p>Ack performs a subset of grep’s functionality, optimizing for the programmer’s use case. In the simplest usage it will allow you to enter an expression, and will search files in the current directory/subdirectory for it, ignoring version control artifacts like .svn and .git files.</p>\n<div class="gatsby-highlight">\n      <pre class="language-none"><code># search all files in current directory recursively\n# to see if they contain "foobar"\nack foobar</code></pre>\n      </div>\n<p>Ack then spits out nicely formatted output with the full file paths and line numbers of each occurence. For instance here is the output of searching the directory containing my blog posts for references to Microsoft.</p>\n<p>\n  <a\n    class="gatsby-resp-image-link"\n    href="undefined"\n    style="display: block"\n    target="_blank"\n    rel="noopener"\n  >\n  \n  <span\n    class="gatsby-resp-image-wrapper"\n    style="position: relative; z-index: -1; display: block; "\n  >\n    <span\n      class="gatsby-resp-image-background-image"\n      style="padding-bottom: 40.433772269558474%;position: relative; width: 100%; bottom: 0; left: 0; background-image: url(\'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAICAIAAAB2/0i6AAAACXBIWXMAAAsTAAALEwEAmpwYAAABOklEQVQY012Q2U7DMBBF8wnQXTSk2GnLUpGkceJl7DjOhlCLEE9I/P+PMM5DRZGOrsYj28eeYF+7p6bbWUd0xQeetkCgItqsmJmlap7B/AiYe1WumZxlcPsqLgSRhHsBkTKh0FnLU1euGF8yMU3lNJGTESxCxueZmCTq6jDVhmgbG0uNlW8yVrA4arTFUmylWBxhmWvsYPon+MLg0pPrYCNdbAaqewId0b0768eqwWJvOwr1vXChcGte35U25A7BApuYiDdHUocC1hwwQ+5VF1vuCiLkqPI/5y0LS+Xl44aAgjdvVIty79f9g2o90BVDXQ41Nb5/cE11wkH2uBOTmiGSTYBDJmD6z3Jr8L6rYf7jZuRqYOxsT9+J/MjT9+LrJzkM/LkXL4M8DHLnir9saxbXBbWeXStiJ34B7WlauEpcJT4AAAAASUVORK5CYII=\'); background-size: cover; display: block;"\n    >\n      <img\n        class="gatsby-resp-image-image"\n        style="width: 100%; margin: 0; vertical-align: middle; position: absolute; top: 0; left: 0; box-shadow: inset 0px 0px 0px 400px white;"\n        alt="ack usage example"\n        title=""\n        src="/static/6822157d461dd85024f1a6ecb0089337-d766e.png"\n        srcset="/static/6822157d461dd85024f1a6ecb0089337-a6b6e.png 143w,\n/static/6822157d461dd85024f1a6ecb0089337-8e488.png 285w,\n/static/6822157d461dd85024f1a6ecb0089337-d766e.png 570w,\n/static/6822157d461dd85024f1a6ecb0089337-13239.png 855w,\n/static/6822157d461dd85024f1a6ecb0089337-cab6d.png 1140w,\n/static/6822157d461dd85024f1a6ecb0089337-81e03.png 1291w"\n        sizes="(max-width: 570px) 100vw, 570px"\n      />\n    </span>\n  </span>\n  \n  </a>\n    </p>\n<p>These are very simple examples.  Because of ack’s sensible defaults and focused design, these basic commands cover about 80% of what I’m looking for from a code search tool. But for those who want to do a bit more, ack can be much more powerful.  Because ack is written in perl, any perl-compatible regular expression can be used to search your files.  Ack provides plenty of options for formatting the output and it’s also very easy to filter by filetype.</p>\n<p>For instance, I have a small side project where I’m creating an event signup site with the front end code written in CoffeeScript.  If I want to see which files I’ve referenced events in without necessarily seeing all the details, I can use the <code>-l</code> flag to only show file names.</p>\n<p>\n  <a\n    class="gatsby-resp-image-link"\n    href="undefined"\n    style="display: block"\n    target="_blank"\n    rel="noopener"\n  >\n  \n  <span\n    class="gatsby-resp-image-wrapper"\n    style="position: relative; z-index: -1; display: block; "\n  >\n    <span\n      class="gatsby-resp-image-background-image"\n      style="padding-bottom: 68.41379310344827%;position: relative; width: 100%; bottom: 0; left: 0; background-image: url(\'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAOCAIAAACgpqunAAAACXBIWXMAAAsTAAALEwEAmpwYAAABkElEQVQoz4VSCXKCQBD0BYmg8UjEk0NTRogiN7uAyJH8/z/p3RUjsZJUdW0NR2/39ExnYEfbnGo03J1TxbXHR0c2fdnyexY7Aakp8F4yW3VHI4WR1EZSaqTUSbGMzisgPite2jf97psrNbivOzotdVpxlAatdVIZtFqE+SI4jY/kcev8ASgzTY2WMz+buMnzkU4cIHlx6OA9/IcMQTUu9KSCVRhehnnP9OQdA7O3dS648XxFZ51WUJ55qeIlUy8FhvtouA85ohGro+Eh6iGhezLSAnkeZFM/W4QndMv0I5w5TjzO/dPoELVcNIBtKFdwDttGUuGudVrzgqWokgKfFBfJB+Df98x/4mQW+IWGEbAg8VIlbBwQ7/5CRmYsLTE2g7bIq7jAFGTTe2g4LduCvLyShTgpMD+VrU0uIfmdy/LnI2gpCwVBRo2e1+icX4Ga8cMc4lNsgU2erOA7baEsyJCCeSOtX7NPTJ77x/xZZmxt42J0iH/2LDZM42lh1TfZxyYFav5YYtUExnbct4Jb8hfJD54FJ0zXDwAAAABJRU5ErkJggg==\'); background-size: cover; display: block;"\n    >\n      <img\n        class="gatsby-resp-image-image"\n        style="width: 100%; margin: 0; vertical-align: middle; position: absolute; top: 0; left: 0; box-shadow: inset 0px 0px 0px 400px white;"\n        alt="filenames only"\n        title=""\n        src="/static/60dba8e1289abe5c1cd1d144a95daad7-d766e.png"\n        srcset="/static/60dba8e1289abe5c1cd1d144a95daad7-a6b6e.png 143w,\n/static/60dba8e1289abe5c1cd1d144a95daad7-8e488.png 285w,\n/static/60dba8e1289abe5c1cd1d144a95daad7-d766e.png 570w,\n/static/60dba8e1289abe5c1cd1d144a95daad7-7c4ee.png 725w"\n        sizes="(max-width: 570px) 100vw, 570px"\n      />\n    </span>\n  </span>\n  \n  </a>\n    </p>\n<p>Obviously this search brings up several types of files. Along with the CoffeeScript files I’m interested in, ack shows some html and css files, as well as a random server side file.  It also shows the generated JavaScript files.  I could get rid of these files by specifying a different root directory, but instead I’m going to show ack’s  smart filtering by filetype.  To search only coffeescript files, I just need to add the <code>--coffee</code> flag to see all CoffeeScript matches.</p>\n<p>\n  <a\n    class="gatsby-resp-image-link"\n    href="undefined"\n    style="display: block"\n    target="_blank"\n    rel="noopener"\n  >\n  \n  <span\n    class="gatsby-resp-image-wrapper"\n    style="position: relative; z-index: -1; display: block; "\n  >\n    <span\n      class="gatsby-resp-image-background-image"\n      style="padding-bottom: 42.685589519650655%;position: relative; width: 100%; bottom: 0; left: 0; background-image: url(\'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAJCAIAAAC9o5sfAAAACXBIWXMAAAsTAAALEwEAmpwYAAABb0lEQVQoz3WR+0rDMBTG9wJubq6tIuvauaLY+yXJOUmTrtm6zYmioiC+/4MYC/Pyh/Dj8BHy5cs5ZzDn9a0W6bZJOukJcCqwS7AKmKRoGCdgOD3WL9Gfn/UMAoFWRqycPr9hc6hmFPYPmQfANmWpScAxUjSU7LyUdlGPY3ZqiKgRhsEV8FFEhyENpN494lI03QN4qJyMODk7S5iV0mna3zbJvXl8ZOAjOgVxykrd06gVPhc+smmK5rkechISI0zANz/JPvJpRs23H5/zRa190U4ytHJ5XiqrqNU2d4r6t/OP+QrEMGSjkCWSLMQ21t2tUrhfXSt99ySeXnHG2v/NnNs5uSjpOGEuqLhVbFfrex4I+fFe3ajW/pU87Kfz0/Mc8VpW2Ro8LlzgS2GiYBjBJMGTEEcxmxx3Y6qdg1PAlzY7M2aXCJfyRHeB2i/l7vDSxK2+pM2i7lxoPbH2xWbGVn69mUNbrKU8NC5bTTNuzJ+1HGHRtSERcgAAAABJRU5ErkJggg==\'); background-size: cover; display: block;"\n    >\n      <img\n        class="gatsby-resp-image-image"\n        style="width: 100%; margin: 0; vertical-align: middle; position: absolute; top: 0; left: 0; box-shadow: inset 0px 0px 0px 400px white;"\n        alt="ack filetype filtering"\n        title=""\n        src="/static/452a97bdd94106ace4c6ae680b2f0068-d766e.png"\n        srcset="/static/452a97bdd94106ace4c6ae680b2f0068-a6b6e.png 143w,\n/static/452a97bdd94106ace4c6ae680b2f0068-8e488.png 285w,\n/static/452a97bdd94106ace4c6ae680b2f0068-d766e.png 570w,\n/static/452a97bdd94106ace4c6ae680b2f0068-13239.png 855w,\n/static/452a97bdd94106ace4c6ae680b2f0068-bc4cb.png 916w"\n        sizes="(max-width: 570px) 100vw, 570px"\n      />\n    </span>\n  </span>\n  \n  </a>\n    </p>\n<p>Its also easy to add multiple filetype flags in order to search several filetypes, and you can even define custom filetype flags with an .ackrc file.  These also let you specify default options and set certain directories to be ignored on a global or per-project basis.</p>\n<h4>Other Options</h4>\n<p>Ack is hardly the only code search tool out there.  It’s meant to improve on grep by focusing on the programmer’s use cases, but there are <del>many</del> some situations where grep is still a good option.  Ack is situationally optimized for searching code, <del>and doesn’t work as well for filtering piped output</del>. Grep is also installed on many remote servers where you won’t have access to ack.  So ack makes a great complement to grep, moreso than a replacement.</p>\n<p><em>Update: You can totally use Ack to filter piped output.  Another reason to use grep gone.</em></p>\n<p>In terms of direct competition, <a href="https://github.com/ggreer/the_silver_searcher">ag</a> is an attempt to improve on ack, mostly in terms of speed. Ag uses various tricks to optimize speed performance for code search, using an ack compatible syntax. Since its written in C rather than perl, it is indeed significantly faster.  I personally am more comfortable with ack.  Its more mature, has better documentation, and has always been fast enough for me.</p>\n<p><del>Ag was not updated to support ack 2’s filetype filtering, and generally seems to have focused on speed over all else.</del>  It also has dependencies that I’ve found are a problem on old operating systems. Ack only depends on perl, and is thus very portable, even to Windows systems.  Still, if you find ack to be slow on your code base, or just like knowing you’re doing everything as fast as possible, ag is a great alternative.</p>\n<p><em>Update: As of version 0.22.0 ag supports ack’s filetype syntax, but does not allow you to define custom file types, a very useful ack feature.</em></p>\n<h4>Summary</h4>\n<p>If you’ve been using grep or slow GUI tools to search your source code, you can do better. Ack is fast, easy to use, and optimized for programmers.  It’s also free, open-source code you can use without cost or licensing worries.  If you want to go even faster, consider using ag.  Just make sure you’re using a tool that was built for the work you’re doing.</p>',frontmatter:{title:"A look at Ack",keywords:null,category:"tools",date:"2013-11-25T23:50:00+00:00",path:"/2013/11/25/a-look-at-ack",layout:"post",hideFooter:null},fields:{slug:"/2013/11/25/a-look-at-ack"}}},pathContext:{slug:"/2013/11/25/a-look-at-ack",relatedPosts:[{path:"/2012/11/08/shutdown-tiles-for-windows-8-start-screen",data:{title:"Shutdown Tiles for Windows 8 Start Screen",path:"/2012/11/08/shutdown-tiles-for-windows-8-start-screen",description:"A solve for shutting down Windows 8 easily",date:"2012-11-08T12:00:00+00:00"}},{path:"/2012/11/07/sync-multiple-google-calendars-in-windows-8",data:{title:"Sync Multiple Google Calendars in Windows 8",path:"/2012/11/07/sync-multiple-google-calendars-in-windows-8",description:"A helpful tip for using Google Calendar in Windows 8",date:"2012-11-07T12:00:00+00:00"}},{path:"/2012/12/30/sublime-text-for-javascript-keyboard-shortcuts",data:{title:"Sublime Text For Javascript: Keyboard Shortcuts",path:"/2012/12/30/sublime-text-for-javascript-keyboard-shortcuts",description:"Helpful keyboard shortcuts for JS developers",date:"2012-12-30T21:00:00+00:00"}}]}}}});
//# sourceMappingURL=path---2013-11-25-a-look-at-ack-fb8d2ca7a8213a2b15f7.js.map