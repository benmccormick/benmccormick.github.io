webpackJsonp([32171569942992],{717:function(e,a){e.exports={data:{markdownRemark:{html:'<p>Last year Google coined the term “Progressive Web App” as a way of describing the type of sites and applications that they think are the future of the web.  Progressive Web Apps are sites that load quickly, are always responsive to user input, work as well as possible offline, and integrate with native platforms like native apps.  While this site is not an “app” per say, I do want it to be as fast and responsive as possible, and I also wanted to better understand what Google is pulling under the PWA umbrella.  Fortunately, Google has built a tool <a href="https://developers.google.com/web/tools/lighthouse/">Lighthouse</a> to help developers profile and improve their web applications, comparing them to a set of PWA benchmarks.  So I took this site through Lighthouse, and worked against their suggestions with the goal of learning more about PWAs and improving the experience of using benmccormick.org.  I’m passing along my experience here.</p>\n<h3>Getting Started</h3>\n<p>I began by downloading the Lighthouse extension in the <a href="https://chrome.google.com/webstore/detail/lighthouse/blipmdconlkpinefehnmjammfjpmpbjk">Chrome Web Store</a>.  Lighthouse can be installed either as a chrome extension or a node command line tool.  Both produce the same HTML report, but I chose the chrome extension for the convenience of keeping everything in the browser.  When I ran the initial report, I got the following result:</p>\n\n  <a class="gatsby-resp-image-link" href="/static/first_report_summary-b43f9b9716550b8ad7ac2cd3dad6b796-6cd9b.png" style="display: block" target="_blank" rel="noopener">\n  \n  <span class="gatsby-resp-image-wrapper" style="position: relative; display: block; ; max-width: 570px; margin-left: auto; margin-right: auto;">\n    <span class="gatsby-resp-image-background-image" style="padding-bottom: 15.844402277039848%; position: relative; bottom: 0; left: 0; background-image: url(&apos;data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAADCAYAAACTWi8uAAAACXBIWXMAAAsSAAALEgHS3X78AAAArUlEQVQI13WNzQoBUQBG51XYmiIbLCilPJWdB/EIdv6yU9YyNaE0Ls2l+aNbk5kxc0xTFopTp7P7Pk3vTGn0l1Q6C0rVMcPegP3axFVPpG0jpcTOq5QiSRKiKCqM4/jLMAwLtVp3Sr23RG/PKDfn6K0Ju9UKHmscx+ceBHieh+u6pGnKhyzLfqptDMnGuGKYDkfrwUG8ULctqTXCEjZCnLhcznlFMer7PkF+8o833CjT6nyreNEAAAAASUVORK5CYII=&apos;); background-size: cover; display: block;">\n      <img class="gatsby-resp-image-image" style="width: 100%; height: 100%; margin: 0; vertical-align: middle; position: absolute; top: 0; left: 0; box-shadow: inset 0px 0px 0px 400px white;" alt="first score: 48/100" title="" src="/static/first_report_summary-b43f9b9716550b8ad7ac2cd3dad6b796-d766e.png" srcset="/static/first_report_summary-b43f9b9716550b8ad7ac2cd3dad6b796-a6b6e.png 143w,\n/static/first_report_summary-b43f9b9716550b8ad7ac2cd3dad6b796-8e488.png 285w,\n/static/first_report_summary-b43f9b9716550b8ad7ac2cd3dad6b796-d766e.png 570w,\n/static/first_report_summary-b43f9b9716550b8ad7ac2cd3dad6b796-13239.png 855w,\n/static/first_report_summary-b43f9b9716550b8ad7ac2cd3dad6b796-6cd9b.png 1054w" sizes="(max-width: 570px) 100vw, 570px">\n    </span>\n  </span>\n  \n  </a>\n    \n<p>48 out of 100 didn’t seem like a bad starting place.  Scrolling down it looked like I was mainly dinged on a few main areas:</p>\n<ol>\n<li>I had no offline support</li>\n<li>I did’t have any special setup for being included on a users homescreen. (I did have platform appropriate icons, but no app configuration)</li>\n<li>I had some possible inefficiencies in the assets I loaded.</li>\n</ol>\n\n  <a class="gatsby-resp-image-link" href="/static/first_report_offline-9e55b24731cd8d1af11946a379849de5-1b604.png" style="display: block" target="_blank" rel="noopener">\n  \n  <span class="gatsby-resp-image-wrapper" style="position: relative; display: block; ; max-width: 570px; margin-left: auto; margin-right: auto;">\n    <span class="gatsby-resp-image-background-image" style="padding-bottom: 23.485967503692766%; position: relative; bottom: 0; left: 0; background-image: url(&apos;data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAFCAYAAABFA8wzAAAACXBIWXMAAAsSAAALEgHS3X78AAAAwklEQVQY05WQ4WrFIAyFff8X3GpRp220tqVwyzooV3tuIqzcn1sghnMSkg9VSgnLsmCaJqzrimEYQESY57l5MUaUUvDXULrroPse1lporWGMQc+6Y1+qc65V6UvPsg4h4EOzbyM+DYFSboeP44ASQgoemWlyzjfVL6XQtxnW4kvOPBfSA376gaEDj+8T5flEqRWqcVLARiMiL9u2rS2R5fu+47+hKj/VO+QvB+f9TSJ/OY5j0+d5ovL167rurG/57r8Aia97Rmti89YAAAAASUVORK5CYII=&apos;); background-size: cover; display: block;">\n      <img class="gatsby-resp-image-image" style="width: 100%; height: 100%; margin: 0; vertical-align: middle; position: absolute; top: 0; left: 0; box-shadow: inset 0px 0px 0px 400px white;" alt="offline issues" title="" src="/static/first_report_offline-9e55b24731cd8d1af11946a379849de5-d766e.png" srcset="/static/first_report_offline-9e55b24731cd8d1af11946a379849de5-a6b6e.png 143w,\n/static/first_report_offline-9e55b24731cd8d1af11946a379849de5-8e488.png 285w,\n/static/first_report_offline-9e55b24731cd8d1af11946a379849de5-d766e.png 570w,\n/static/first_report_offline-9e55b24731cd8d1af11946a379849de5-1b604.png 677w" sizes="(max-width: 570px) 100vw, 570px">\n    </span>\n  </span>\n  \n  </a>\n    \n\n  <a class="gatsby-resp-image-link" href="/static/first_report_native-39fef9f1d1910ba1d2f0a61fe1e96fcb-c9a27.png" style="display: block" target="_blank" rel="noopener">\n  \n  <span class="gatsby-resp-image-wrapper" style="position: relative; display: block; ; max-width: 570px; margin-left: auto; margin-right: auto;">\n    <span class="gatsby-resp-image-background-image" style="padding-bottom: 91.183879093199%; position: relative; bottom: 0; left: 0; background-image: url(&apos;data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAASCAYAAABb0P4QAAAACXBIWXMAAAsSAAALEgHS3X78AAACgElEQVQ4y51U13LcMBDz/3+f50rufN3qohopqpEISMolsZ2HcAazvJMEYbmAnsDVNA12u53H8/Mzttst9vs9NpsNoihCWZbIshxFkSMtWkRFj6RQvma5QJ5lSNMUwzDgyRF2XYckSVkl2rb1L6jrGlVVeTIHIQTKovAEUVohTgXirOJvXvMvzKC1xpO1Fpakti1QphEyUaEiaT9O+J/lCd2yRqFJXiHYqr5dsbw+iFcsSYwlYmVLhqoNVZt6xTzDC/qED4WmR98IyCSBInq2MLMVS7WOyHYtrCP4jDcxa31X6H/bCbouoW439PcbNDFzICbPYNKENffkludr2xXL8gOhVyjRZRGqwwHN4Req/Q5iu8HEdk0ciK3sgtKuC/iR0DpCDSVytJcL1N2pvGN0ZLSKyXh+rn3awg56rYQx3xOGNYSWOYieROrxwEwi8PCtKDkMASMlDJX5KoPCL0NxVAsvaNpk4o0Dz22MA4bHHZovmLhHUwMTrTSNa/3eVp5QkehwfMGVA7my1SvV3YgL9ycewY2klTM70XAw75XTL6sOWb3wusQ4rkkZqS5Pz7hcjjiTNGMiBG8WfLBkLeg92feYaJWRygK4H0cMfFaPhvvZd/rpDC2M6jDT0KBNPOIYDGrY0zbMJpjNUDltrEP5khQ/5aVFm8eozxfi5M/SuglT7eKmzMFYJYN1pAxwQ1mn/GdS/L8askjRHI/oTi9QJNWXM81N6ziQ1CoViFx15P+yjctyT9tItqmYX0WFDhP956PnkuG8p/WHH38i9C1TYYjeFT3hPhATz9Ob+i0pf7ds/hU920Ox5fZ0Qsd2JdseSOpz/EbIqfsvjqv05XfR+w3zlm2KEMh4EwAAAABJRU5ErkJggg==&apos;); background-size: cover; display: block;">\n      <img class="gatsby-resp-image-image" style="width: 100%; height: 100%; margin: 0; vertical-align: middle; position: absolute; top: 0; left: 0; box-shadow: inset 0px 0px 0px 400px white;" alt="native issues" title="" src="/static/first_report_native-39fef9f1d1910ba1d2f0a61fe1e96fcb-d766e.png" srcset="/static/first_report_native-39fef9f1d1910ba1d2f0a61fe1e96fcb-a6b6e.png 143w,\n/static/first_report_native-39fef9f1d1910ba1d2f0a61fe1e96fcb-8e488.png 285w,\n/static/first_report_native-39fef9f1d1910ba1d2f0a61fe1e96fcb-d766e.png 570w,\n/static/first_report_native-39fef9f1d1910ba1d2f0a61fe1e96fcb-c9a27.png 794w" sizes="(max-width: 570px) 100vw, 570px">\n    </span>\n  </span>\n  \n  </a>\n    \n\n  <a class="gatsby-resp-image-link" href="/static/first_report_assets-9198b7ff42694743ff6a9ceab414b4bd-9b3dc.png" style="display: block" target="_blank" rel="noopener">\n  \n  <span class="gatsby-resp-image-wrapper" style="position: relative; display: block; ; max-width: 564px; margin-left: auto; margin-right: auto;">\n    <span class="gatsby-resp-image-background-image" style="padding-bottom: 87.41134751773049%; position: relative; bottom: 0; left: 0; background-image: url(&apos;data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAARCAYAAADdRIy+AAAACXBIWXMAAAsSAAALEgHS3X78AAABrUlEQVQ4y51Ui46CMBDk/7/P5B7xEpFHKS95CRwU9nbWlHiIJ7mate1qpzO7A84wDBRFEcVZRnEcy7rve3o15nnezDvTNFFdllQGHmUMmqYp1XUtoE3TUMm/YUYgjxkkLOga2FlWWU5pkpAfBOR5Hp1OJwp4bVkjh73rugL8HJD342xIjQmlWUrn81kOY/6XZHxN/Dk0BwqjkHzfFyY28jwnlMWyseunDPGH5nqloqtESsU1q6pKaohaIe4BXg0HB8IwpJhlepDLDFG/y+WyS+KmZBkqkKaESskFqGHbtr+k7WJ4vzHGUFEUYhUwRDnWgGvwhxpCMhoRKy0W0VpLKGa6lr2n0w6S7XdLx/KL5YZLd3EJgBMuA8wOL9r9OI7PGUqS46P7JKWVgOEwAoctW9gHQIi1dR5sA5uU1c0uCNjHBmqKeUvepmQzGmHjKle6a42NHJghAPpXc+5jkfw+HCnS0VIzvCggE9bZ68GlhqMZKNBvzDBYwMAMzzReBuj+lZ8mgMNSYGztZfdd190Yyt2G/ZYwEINpPgyWCADDOmBqGeMi6wLMKBNmAAPwBxLEJsoJ2pHuAAAAAElFTkSuQmCC&apos;); background-size: cover; display: block;">\n      <img class="gatsby-resp-image-image" style="width: 100%; height: 100%; margin: 0; vertical-align: middle; position: absolute; top: 0; left: 0; box-shadow: inset 0px 0px 0px 400px white;" alt="asset issues" title="" src="/static/first_report_assets-9198b7ff42694743ff6a9ceab414b4bd-9b3dc.png" srcset="/static/first_report_assets-9198b7ff42694743ff6a9ceab414b4bd-b5414.png 143w,\n/static/first_report_assets-9198b7ff42694743ff6a9ceab414b4bd-08cea.png 285w,\n/static/first_report_assets-9198b7ff42694743ff6a9ceab414b4bd-9b3dc.png 564w" sizes="(max-width: 564px) 100vw, 564px">\n    </span>\n  </span>\n  \n  </a>\n    \n<p>Native app support isn’t a huge priority for me, and the assets issue seemed small, so I decided to investigate the offline support issue first.</p>\n<h3>Offline</h3>\n<p>I based my service worker implementation off of <a href="https://github.com/chriscoyier/Simple-Offline-Site">Simple Offline Site</a> a demo Service Worker repo created by Chris Coyier for an article on <a href="https://css-tricks.com/serviceworker-for-offline/">CSS Tricks</a>.  This was perfect since it’s default behavior was what I wanted: cache everything, and check for updates from the server everytime we return from cache so we’re never out of date for long.  You can see what I did specifically in my <a href="https://github.com/benmccormick/benmccormickorg/blob/master/pages/sw.es6">github repo for this site</a>. After adding the service worker, my score moved up to 63/100.  </p>\n<p>Finally, Service Workers only work on HTTPS connections, but most links to my site are not https currently. So to take full advantage (and to address another metric I was flagged on), I used a <a href="https://support.cloudflare.com/hc/en-us/articles/200170536-How-do-I-redirect-all-visitors-to-HTTPS-SSL-">CloudFlare page rule</a> to redirect all visting traffic to use https.  That bumped me up to 69/100.</p>\n\n  <a class="gatsby-resp-image-link" href="/static/second_report_offline-3524d6aba8ebb3d97647be7aa141fefa-25b8d.png" style="display: block" target="_blank" rel="noopener">\n  \n  <span class="gatsby-resp-image-wrapper" style="position: relative; display: block; ; max-width: 570px; margin-left: auto; margin-right: auto;">\n    <span class="gatsby-resp-image-background-image" style="padding-bottom: 86.86868686868686%; position: relative; bottom: 0; left: 0; background-image: url(&apos;data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAARCAYAAADdRIy+AAAACXBIWXMAAAsSAAALEgHS3X78AAACLElEQVQ4y5VT7Y7aMBDk/R+kz9C//V9ahNorB3FCSGIndr4h3yRTr8EnKp16nNGwlhNvZmdnV0v8FQ37Ai9QOPkefN/H8XhEXde4Xq8YhgHzPD+FZVmwQrFGL74hEhmiMEAYBDqGUEohz3OUZWkSP7tW9NeNQBzHUGmKREqIJAFPJGSaY7xO6PoOfd+jbVt0XfcP6NzuiaVOOKNvGrDNFvvvP8HWWzjrX9j9cOG/BChPHGdd/vl8RlVVJlrU93OK9GyaJqx05cC4IM1OiHKOTKZQmmWqMYyaetUA/fi5kse2Q7I7gL86iHcMcu/hHMZoRYpJlVi0hgv9lo9x01DX7wc+hBAQXJiYZRnqqjaNyTTyO4qiMDDn+h171mjZDMPrfOvgrnvFIXEQ+iEC3WXP8+C6LjjnptNmaQb/W4bhvMwgGYdlRN3UCLRtQp3QcRwjNHXu8YKN78EwtBeCIYAoBHjIEUahMTdZidiRXaxxP9TQJvx9eQGTLmQsjYaJ9mIURWZPJqeJebrLxEAJBZUoczlV6VsC+qAdwUeM2lIW9uyty33Xg/kMzGOmEVQuYwz7/d5E0pOi1N4kXUkGgt1TJNCHV0ZMXXUxlJCFRJberHC5TwPZgSaBmDxdMl30XR8xj412hMvlYqSghORTivQendv4uKdIc20YjuOESEZIVGKYkR49Dfw9ISW2oOTv7ek9uqd9qEueAOH9AdtuwDc75PsjyoOP1uNYVIXPrL+YDB4plqIODwAAAABJRU5ErkJggg==&apos;); background-size: cover; display: block;">\n      <img class="gatsby-resp-image-image" style="width: 100%; height: 100%; margin: 0; vertical-align: middle; position: absolute; top: 0; left: 0; box-shadow: inset 0px 0px 0px 400px white;" alt="asset issues" title="" src="/static/second_report_offline-3524d6aba8ebb3d97647be7aa141fefa-d766e.png" srcset="/static/second_report_offline-3524d6aba8ebb3d97647be7aa141fefa-a6b6e.png 143w,\n/static/second_report_offline-3524d6aba8ebb3d97647be7aa141fefa-8e488.png 285w,\n/static/second_report_offline-3524d6aba8ebb3d97647be7aa141fefa-d766e.png 570w,\n/static/second_report_offline-3524d6aba8ebb3d97647be7aa141fefa-25b8d.png 792w" sizes="(max-width: 570px) 100vw, 570px">\n    </span>\n  </span>\n  \n  </a>\n    \n<h3>Native Support</h3>\n<p>As I said previously, native platform support isn’t a major priority for this blog, but I was curious about the process.  Getting native support turned out to be very straightforward.  I had already collected icons for the various platforms, and created a simple manifest when I originally created a favicon for my site.  But the manifest file didn’t have everything and it wasn’t being deployed properly to my site.  Fixing that and making it available at <code>/manifest.json</code>, fixed all of the problems related to native platform support.</p>\n<p>My manifest file now looks like this:</p>\n<div class="gatsby-highlight">\n      <pre class="language-json"><code><span class="token punctuation">{</span>\n\t<span class="token property">"name"</span><span class="token operator">:</span> <span class="token string">"benmccormick.org"</span><span class="token punctuation">,</span>\n  <span class="token property">"short_name"</span><span class="token operator">:</span> <span class="token string">"benmccormick"</span><span class="token punctuation">,</span>\n\t<span class="token property">"icons"</span><span class="token operator">:</span> <span class="token punctuation">[</span>\n\t\t<span class="token punctuation">{</span>\n\t\t\t<span class="token property">"src"</span><span class="token operator">:</span> <span class="token string">"\\/android-chrome-192x192.png?v=yyxgnp97qG"</span><span class="token punctuation">,</span>\n\t\t\t<span class="token property">"sizes"</span><span class="token operator">:</span> <span class="token string">"192x192"</span><span class="token punctuation">,</span>\n\t\t\t<span class="token property">"type"</span><span class="token operator">:</span> <span class="token string">"image\\/png"</span>\n\t\t<span class="token punctuation">}</span><span class="token punctuation">,</span>\n\t\t<span class="token punctuation">{</span>\n\t\t\t<span class="token property">"src"</span><span class="token operator">:</span> <span class="token string">"\\/android-chrome-384x384.png?v=yyxgnp97qG"</span><span class="token punctuation">,</span>\n\t\t\t<span class="token property">"sizes"</span><span class="token operator">:</span> <span class="token string">"384x384"</span><span class="token punctuation">,</span>\n\t\t\t<span class="token property">"type"</span><span class="token operator">:</span> <span class="token string">"image\\/png"</span>\n\t\t<span class="token punctuation">}</span>\n\t<span class="token punctuation">]</span><span class="token punctuation">,</span>\n\t<span class="token property">"theme_color"</span><span class="token operator">:</span> <span class="token string">"#ffffff"</span><span class="token punctuation">,</span>\n\t<span class="token property">"background_color"</span><span class="token operator">:</span> <span class="token string">"#57a3e8"</span><span class="token punctuation">,</span>\n\t<span class="token property">"display"</span><span class="token operator">:</span> <span class="token string">"browser"</span>\n<span class="token punctuation">}</span>\n</code></pre>\n      </div>\n<p>After correctly deploying that manifest file, my score moved all the way up to 100/100!</p>\n\n  <a class="gatsby-resp-image-link" href="/static/third_report_native-29582e44730854d3b22d4e55fcc7e560-8d5ce.png" style="display: block" target="_blank" rel="noopener">\n  \n  <span class="gatsby-resp-image-wrapper" style="position: relative; display: block; ; max-width: 570px; margin-left: auto; margin-right: auto;">\n    <span class="gatsby-resp-image-background-image" style="padding-bottom: 21.822849807445444%; position: relative; bottom: 0; left: 0; background-image: url(&apos;data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAECAYAAACOXx+WAAAACXBIWXMAAAsSAAALEgHS3X78AAAAm0lEQVQY05WPXQrCMBCEc17BC/jgQXzzAOKJ0rTZhpK0FKykkL+OZkHfirjwwTLsDLNimh4g0ui6Dk3TMFJKKKXgvUeMESGEnyzLgnVdIeLTI4XEYkqJqSGVbdtQSvnqOeddPn5x0Vcc5BFmMGhVy02JiBvWvR7/M+Lm7ji1ZwxuAGmCfr/f9z2HGmMwjiOstXDOYZ5nNtXme7wAS0kxWcoQjmQAAAAASUVORK5CYII=&apos;); background-size: cover; display: block;">\n      <img class="gatsby-resp-image-image" style="width: 100%; height: 100%; margin: 0; vertical-align: middle; position: absolute; top: 0; left: 0; box-shadow: inset 0px 0px 0px 400px white;" alt="asset issues" title="" src="/static/third_report_native-29582e44730854d3b22d4e55fcc7e560-d766e.png" srcset="/static/third_report_native-29582e44730854d3b22d4e55fcc7e560-a6b6e.png 143w,\n/static/third_report_native-29582e44730854d3b22d4e55fcc7e560-8e488.png 285w,\n/static/third_report_native-29582e44730854d3b22d4e55fcc7e560-d766e.png 570w,\n/static/third_report_native-29582e44730854d3b22d4e55fcc7e560-8d5ce.png 779w" sizes="(max-width: 570px) 100vw, 570px">\n    </span>\n  </span>\n  \n  </a>\n    \n<p>I clearly benefited from starting in a good spot.  <a href="https://github.com/gatsbyjs/gatsby">Gatsby</a> is “fast by default” as a platform for building blogs, and I’ve done my best to avoid making it slow.  But it was fun seeing what I could do to make the site a better experience for users with bad connectivity, and to learn more about what Google is trying to do with PWAs.  </p>\n<h3>More Resources</h3>\n<ul>\n<li>\n<p>Google has a bunch of resources around creating Progressive Web Apps.  You can find them on <a href="https://developers.google.com/web/progressive-web-apps/">their PWA landing page</a>.</p>\n</li>\n<li>\n<p>It was so easy to make my blog a PWA mostly because it is built on <a href="https://github.com/gatsbyjs/gatsby">Gatsby</a>. Worth looking at if you’re a web developer who blogs.</p>\n</li>\n</ul>',frontmatter:{title:"Evaluating Web Apps With Lighthouse",keywords:"Lighthouse Performance Progressive Web App",category:"tools",date:"2017-02-14T03:30:00+00:00",path:"/2017/02/13/improving-site-performance-with-lighthouse",layout:"post",hideFooter:null},fields:{slug:"/2017/02/13/improving-site-performance-with-lighthouse"}}},pathContext:{slug:"/2017/02/13/improving-site-performance-with-lighthouse",relatedPosts:[{path:"/2017/02/18/context-to-best-practices/",data:{title:"Giving Context To Best Practices",path:"/2017/02/18/context-to-best-practices/",description:"What we talk about when we talk about best practices",date:"2017-02-18T23:30:00+00:00"}},{path:"/2016/09/19/testing-with-jest-snapshots-first-impressions/",data:{title:"Testing with Jest Snapshots: First Impressions",path:"/2016/09/19/testing-with-jest-snapshots-first-impressions/",description:"First impression of testing UI components using Jest snapshots",date:"2016-09-19T12:41:00+00:00"}},{path:"/2016/12/02/whole-new-site/",data:{title:"A whole new site",path:"/2016/12/02/whole-new-site/",description:"Introducing a new look for benmccormick.org",date:"2016-12-02T16:00:00+00:00"}}]}}}});
//# sourceMappingURL=path---2017-02-13-improving-site-performance-with-lighthouse-d31ebe8862111ccaa153.js.map