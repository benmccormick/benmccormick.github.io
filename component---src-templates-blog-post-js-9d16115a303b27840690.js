webpackJsonp([0x620f737b6699e400],{"./node_modules/lodash/_baseDelay.js":function(e,t){function o(e,t,o){if("function"!=typeof e)throw new TypeError(n);return setTimeout(function(){e.apply(void 0,o)},t)}var n="Expected a function";e.exports=o},"./node_modules/lodash/defer.js":function(e,t,o){var n=o("./node_modules/lodash/_baseDelay.js"),r=o("./node_modules/lodash/_baseRest.js"),s=r(function(e,t){return n(e,1,t)});e.exports=s},"./node_modules/lodash/map.js":function(e,t,o){function n(e,t){var o=i(e)?r:a;return o(e,s(t,3))}var r=o("./node_modules/lodash/_arrayMap.js"),s=o("./node_modules/lodash/_baseIteratee.js"),a=o("./node_modules/lodash/_baseMap.js"),i=o("./node_modules/lodash/isArray.js");e.exports=n},"./src/components/Ad.js":function(e,t,o){"use strict";function n(e){return e&&e.__esModule?e:{default:e}}function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function s(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function a(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}t.__esModule=!0,t.Ad=void 0;var i=o("./node_modules/react/react.js"),c=n(i),l=o("./node_modules/lodash/defer.js"),d=n(l),u=t.Ad=function(e){function t(o){r(this,t);var n=s(this,e.call(this,o));return n.state={url:null},n}return a(t,e),t.prototype.insertScript=function(){var e=document.getElementById("carbonads");e&&e.remove();var t=document.createElement("script");for(t.src="//cdn.carbonads.com/carbon.js?zoneid=1673&serve=C6AILKT&placement=benmccormickorg",t.type="text/javascript",t.id="_carbonads_js",t.async=!0;this.container.hasChildNodes();)this.container.removeChild(this.container.lastChild);this.container.appendChild(t)},t.prototype.componentDidMount=function(){var e=this;(0,d.default)(function(){return e.insertScript()}),this.props.history.listen(function(t){var o=t.pathname;o!==e.state.url&&e.insertScript(),e.setState({url:o})})},t.prototype.render=function(){var e=this;return c.default.createElement("div",{className:"ad-wrapper",ref:function(t){return e.container=t}})},t}(c.default.Component);u.propTypes={}},"./src/components/EmailSubscribe.js":function(e,t,o){"use strict";function n(e){return e&&e.__esModule?e:{default:e}}function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function s(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function a(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}t.__esModule=!0,t.EmailSubscribe=void 0;var i=o("./node_modules/react/react.js"),c=n(i),l=o("./src/utils/typography.js");t.EmailSubscribe=function(e){function t(){return r(this,t),s(this,e.apply(this,arguments))}return a(t,e),t.prototype.render=function(){return c.default.createElement("div",{className:"subscribe-block"},c.default.createElement("div",{id:"mc_embed_signup"},c.default.createElement("h6",{style:{margin:0,fontSize:(0,l.scale)(-.5).fontSize,lineHeight:(0,l.scale)(-.5).lineHeight,letterSpacing:-.25}},"Subscribe via email"),c.default.createElement("form",{action:"//benmccormick.us8.list-manage.com/subscribe/post?u=115446b80fd9d930ba091cc27&id=f5b9f5acf2",method:"post",id:"mc-embedded-subscribe-form",name:"mc-embedded-subscribe-form",className:"validate",target:"_blank",noValidate:!0},c.default.createElement("div",{id:"mc_embed_signup_scroll"},c.default.createElement("div",{className:"mc-field-group sidebar-group"},c.default.createElement("input",{type:"email",defaultValue:"",name:"EMAIL",className:"subscribe-email required email",id:"mce-EMAIL",placeholder:"Email Address"}),c.default.createElement("input",{type:"submit",value:">",name:"subscribe",id:"mc-embedded-subscribe",className:"subscribe-button button"})),c.default.createElement("div",{id:"mce-responses",className:"clear"},c.default.createElement("div",{className:"response",id:"mce-error-response",style:{display:"none"}}),c.default.createElement("div",{className:"response",id:"mce-success-response",style:{display:"none"}})),c.default.createElement("div",{style:{position:"absolute",left:"-5000px"},"aria-hidden":"true"},c.default.createElement("input",{type:"text",name:"b_115446b80fd9d930ba091cc27_f5b9f5acf2",tabIndex:"-1",value:""})),c.default.createElement("div",{className:"clear"})))))},t}(c.default.Component)},"./src/components/PostFooter.js":function(e,t,o){"use strict";function n(e){return e&&e.__esModule?e:{default:e}}function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function s(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function a(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}t.__esModule=!0;var i=o("./node_modules/react/react.js"),c=n(i),l=o("./src/components/RecommendedPosts.js"),d=n(l);o("./src/css/subscribe.css");var u=function(e){function t(){return r(this,t),s(this,e.apply(this,arguments))}return a(t,e),t.prototype.render=function(){var e=this.props.recommendedPosts;return c.default.createElement(d.default,{recommendedPosts:e})},t}(c.default.Component);u.propTypes={post:c.default.PropTypes.object.isRequired,recommendedPosts:c.default.PropTypes.array},t.default=u,e.exports=t.default},"./src/components/RecommendedPosts.js":function(e,t,o){"use strict";function n(e){return e&&e.__esModule?e:{default:e}}function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function s(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function a(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}t.__esModule=!0;var i=o("./node_modules/react/react.js"),c=n(i),l=o("./node_modules/gatsby-link/index.js"),d=n(l),u=o("./node_modules/lodash/map.js"),p=n(u),m=o("./src/utils/typography.js"),f=n(m),b=f.default.rhythm,h=f.default.scale,g=function(e){function t(){return r(this,t),s(this,e.apply(this,arguments))}return a(t,e),t.prototype.render=function(){var e=this.props.recommendedPosts;return c.default.createElement("div",{className:"up-next-block"},c.default.createElement("h4",{style:{margin:0,lineHeight:h(1.2).lineHeight,letterSpacing:-.25}},"You Might Also Like:"),(0,p.default)(e,function(e,t){return c.default.createElement("div",{key:e.path},c.default.createElement("h3",{style:{marginTop:0,marginBottom:b(.25)}},c.default.createElement(d.default,{to:e.path},e.title)),c.default.createElement("p",null,e.description))}))},t}(c.default.Component);g.propTypes={pages:c.default.PropTypes.array},t.default=g,e.exports=t.default},"./src/css/codeformat.css":function(e,t,o){t=e.exports=o("./node_modules/css-loader/lib/css-base.js")(),t.push([e.id,".markdown pre{display:block;background:#343d46;color:#d8dee9}.token.comment,.token.quote{color:#a7adba}.token.addition,.token.attr,.token.selector-tag,.token.string{color:#99c794}.token.doctag,.token.meta .token.meta-string,.token.regexp{color:#89ddf3}.token.built_in,.token.function{color:#5fb3b3}.token.name,.token.section,.token.selector-class,.token.selector-id,.token.title{color:#69c}.token.attribute,.token.class .token.title,.token.template-variable,.token.type,.token.variable{color:#fac863}.token.bullet,.token.link,.token.meta,.token.meta .token.keyword,.token.selector-attr,.token.selector-pseudo,.token.subst,.token.symbol{color:#f9ae58}.token.boolean,.token.deletion,.token.literal,.token.number{color:#f07178}.token.keyword{color:#c594c5}.token.formula{background:#a7adba}.token.emphasis{font-style:italic}.token.strong{font-weight:700}",""])},"./src/css/images.css":function(e,t,o){t=e.exports=o("./node_modules/css-loader/lib/css-base.js")(),t.push([e.id,".article-body .reading-img img{width:150px;float:right;margin:0 10px 20px}.gatsby-resp-image-wrapper{max-width:75%;display:block;margin:40px auto 20px}.article-body img.full-width{max-height:none}.article-body img.half-width{max-height:none;width:50%}.bordered-img{border:3px solid #57a3e8}.img-group{display:flex;justify-content:space-between}.img-group img{padding:0;height:auto}",""])},"./src/css/mailchimp.css":function(e,t,o){t=e.exports=o("./node_modules/css-loader/lib/css-base.js")(),t.push([e.id,".subscribe-page-group{width:400px;display:flex;flex-direction:row;justify-content:flex-start;align-items:center;padding:8px 0}.subscribe-page-group input{border-radius:3px;max-width:350px;width:80vw;border:1px solid #ccc;margin-right:10px;height:30px}.mc-field-group label{font-size:.9em;font-weight:600}.subscribe-button-large{color:#fff;background:#57a3e8;border-radius:4px;border:0;padding:0 10px;margin:10px 0;cursor:pointer;width:40vw}.subscribe-button-large:hover{background:#3e8acf}.twitter-row{display:flex;flex-wrap:wrap}.twitter-row>div{padding-right:20px;min-width:300px}",""])},"./src/css/subscribe.css":function(e,t,o){t=e.exports=o("./node_modules/css-loader/lib/css-base.js")(),t.push([e.id,".sidebar-group{display:flex;flex-direction:row;justify-content:flex-start;align-items:center;padding:8px 0}.sidebar{padding-left:2rem}.subscribe-container{display:flex;justify-content:flex-end;flex-wrap:wrap}.subscribe-block{overflow:hidden}.subscribe-block #mc_embed_signup form{margin-bottom:20px}.subscribe-block{margin:0}.subscribe-email{padding:0 .1rem;margin:0 .2rem 0 0;font-size:.7rem;height:1.5rem;width:6rem}.subscribe-button{color:#fff;background:#57a3e8;border-radius:4px;font-size:1rem;line-height:1rem;height:1.5rem;width:1.5rem;max-width:2rem;flex-grow:0;border:0;margin:0;cursor:pointer}.rss{padding-bottom:10px}.rss a{display:flex}.rss-icon{display:block;width:17px;margin-right:.5em;height:50px}.rss-icon *{fill:#e2777a}.twitter-item{display:flex;align-items:center;margin-bottom:15px}.twitter-item iframe{margin:0 0 0 10px}",""])},"./src/css/twitter.css":function(e,t,o){t=e.exports=o("./node_modules/css-loader/lib/css-base.js")(),t.push([e.id,"twitterwidget{margin-left:auto;margin-right:auto}",""])},"./src/css/typography.css":function(e,t,o){t=e.exports=o("./node_modules/css-loader/lib/css-base.js")(),t.push([e.id,"a{color:#e2777a;text-decoration:none;cursor:pointer}a:hover{text-decoration:underline}.footnote-backref,.footnote-ref{text-decoration:none;padding-left:3px}blockquote{border-left:5px solid #57a3e8;background:#eee;font-weight:400;font-size:.9rem;padding:1.5rem 2rem;margin:0 0 1rem}blockquote p{margin-bottom:.667em}h2,h3{color:#57a3e8}.explanation{padding:10px;background:#eee;border-radius:10px;margin:20px auto;font-size:.85em}.footnotes li>*{display:inline;margin-bottom:0}.article-body li{padding-left:10px}",""])},'./node_modules/babel-loader/lib/index.js?{"plugins":["/Users/ben/Blog/benmccormickorg/node_modules/gatsby/dist/utils/babel-plugin-extract-graphql.js","/Users/ben/Blog/benmccormickorg/node_modules/babel-plugin-add-module-exports/lib/index.js","/Users/ben/Blog/benmccormickorg/node_modules/babel-plugin-transform-object-assign/lib/index.js"],"presets":[["/Users/ben/Blog/benmccormickorg/node_modules/babel-preset-env/lib/index.js",{"loose":true,"uglify":true,"modules":"commonjs","targets":{"browsers":["> 1%","last 2 versions","IE >= 9"]},"exclude":["transform-regenerator","transform-es2015-typeof-symbol"]}],"/Users/ben/Blog/benmccormickorg/node_modules/babel-preset-stage-0/lib/index.js","/Users/ben/Blog/benmccormickorg/node_modules/babel-preset-react/lib/index.js"],"cacheDirectory":true}!./src/templates/blog-post.js':function(e,t,o){"use strict";function n(e){return e&&e.__esModule?e:{default:e}}function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function s(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function a(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}t.__esModule=!0,t.pageQuery=void 0,o("./src/css/codeformat.css"),o("./src/css/images.css"),o("./src/css/mailchimp.css"),o("./src/css/twitter.css"),o("./src/css/typography.css");var i=o("./node_modules/react-helmet/lib/Helmet.js"),c=n(i),l=o("./node_modules/react/react.js"),d=n(l),u=o("./node_modules/date-fns/format/index.js"),p=n(u),m=o("./node_modules/date-fns/parse/index.js"),f=n(m),b=o("./src/components/Ad.js"),h=o("./src/components/EmailSubscribe.js"),g=o("./src/utils/typography.js"),y=o("./src/components/PostFooter.js"),w=n(y),k=function(e){function t(){return r(this,t),s(this,e.apply(this,arguments))}return a(t,e),t.prototype.componentDidMount=function(){var e=this.markdownContainer;e.style.opacity=0,window.requestAnimationFrame(function(){e.style.transition="opacity 500ms",e.style.opacity=1})},t.prototype.render=function(){var e=this,t=this.props,o=t.data,n=t.pathContext,r=t.history,s=o.markdownRemark.frontmatter,a=o.markdownRemark.html,i=o.markdownRemark.fields.slug,l="page"===s.layout,u="post"===s.layout,m="http://benmccormick.org/"+i;return d.default.createElement("div",{className:"markdown",ref:function(t){return e.markdownContainer=t}},d.default.createElement(c.default,{title:s.title+" | benmccormick.org",meta:[{name:"description",content:s.description||"Ben McCormick's blog on JavaScript and Web Development"},{name:"keywords",content:s.keywords||""},{name:"twitter:card",content:"summary"},{name:"twitter:site",content:"@benmccormickorg"},{name:"twitter:creator",content:"@ben336"},{name:"twitter:title",content:s.title},{name:"twitter:description",content:s.description||""},{name:"twitter:image",content:s.image||"http://benmccormick.org/logo.png"}],script:[{type:"application/ld+json",innerHTML:'{\n                  "@context": "http://schema.org"\n                  "@type": "BlogPosting",\n                  "headline": "'+s.title+'",\n                  "genre": "Software Development",\n                  "keywords": "'+(s.keywords||"")+'",\n                  "url": "'+m+'",\n                  "image": "http://benmccormick.org/logo.png",\n                  "datePublished": "'+(0,p.default)((0,f.default)(s.date),"YYYY-MM-D")+'",\n                  '+(s.description?'"description": "'+s.description+'",':"")+'\n                  "articleBody": "'+a.replace(/\"/g,'\\"')+'",\n                    "author": {\n                      "@type": "Person",\n                      "name": "Ben McCormick"\n                      "email": "mailto:ben@benmccormick.org",\n                      "image": "/profile_pic.jpg",\n                      "jobTitle": "Software Engineer",\n                      "alumniOf": "Duke",\n                      "birthPlace": "Pittsburgh, PA",\n                      "gender": "male",\n                      "url": "http://benmccormick.org",\n                \t    "sameAs" : [\n                        "https://www.linkedin.com/in/benmccormick",\n                        "http://twitter.com/ben336",\n                      ]\n                   }\n                }'}]}),d.default.createElement("div",{className:"post-title-area"},d.default.createElement("h1",{style:{marginTop:(0,g.rhythm)(.5)}},s.title),l?null:d.default.createElement("h5",{style:{display:"block",fontFamily:"ff-tisa-web-pro, serif",fontSize:"14px",color:"rgba(100,100,100, 0.7)",marginTop:(0,g.rhythm)(.5),marginBottom:(0,g.rhythm)(1.25)}},"Originally Posted ",(0,p.default)(new Date(s.date),"MMMM Qo YYYY"))),d.default.createElement("div",{className:"columns"},d.default.createElement("div",{className:"article-body",dangerouslySetInnerHTML:{__html:a}}),u?d.default.createElement("div",{className:"sidebar"},d.default.createElement(b.Ad,{history:r}),d.default.createElement(h.EmailSubscribe,null)):null),u?d.default.createElement("div",null,d.default.createElement("hr",null),"Have Comments? ",d.default.createElement("a",{href:"mailto:ben@benmccormick.org"},"Email me"),", ",d.default.createElement("a",{href:"http://twitter.com/ben336"},"tweet at @ben336"),", or write your own blog post and send me a link. I'll update the post to link to replies where possible.",d.default.createElement("hr",null)):null,u?d.default.createElement(w.default,{post:s,recommendedPosts:n.relatedPosts}):null)},t}(d.default.Component);t.default=k;t.pageQuery="** extracted graphql fragment **"}});
//# sourceMappingURL=component---src-templates-blog-post-js-9d16115a303b27840690.js.map