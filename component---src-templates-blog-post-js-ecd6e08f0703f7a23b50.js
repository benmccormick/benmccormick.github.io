webpackJsonp([0x620f737b6699],{930:function(e,t){function n(e,t,n){if("function"!=typeof e)throw new TypeError(r);return setTimeout(function(){e.apply(void 0,n)},t)}var r="Expected a function";e.exports=n},1020:function(e,t,n){var r=n(930),o=n(147),i=o(function(e,t){return r(e,1,t)});e.exports=i},294:function(e,t,n){(function(e){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function i(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function a(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}t.__esModule=!0,t.Ad=void 0;var c=n(2),l=r(c),s=n(1020),u=r(s),p=n(16),f=r(p),d=f.default.div({height:"300px",width:"150px",overflow:"hidden",margin:"0 0 1rem 0","@media all and (max-width: 700px)":{display:"none"}}),m=t.Ad=function(t){function n(e){o(this,n);var r=i(this,t.call(this,e));return r.state={url:null},r}return a(n,t),n.prototype.insertScript=function(){if(!this.container)return!1;var e=document.getElementById("carbonads");e&&e.remove();var t=document.createElement("script");for(t.src="//cdn.carbonads.com/carbon.js?zoneid=1673&serve=C6AILKT&placement=benmccormickorg",t.type="text/javascript",t.id="_carbonads_js",t.async=!0;this.container.hasChildNodes();)this.container.removeChild(this.container.lastChild);this.container.appendChild(t)},n.prototype.componentDidMount=function(){var e=this;(0,u.default)(function(){return e.insertScript()}),this.props.history.listen(function(t){var n=t.pathname;n!==e.state.url&&e.insertScript(),e.setState({url:n})})},n.prototype.render=function(){var t=this;return e.createElement(d,{innerRef:function(e){return t.container=e}})},n}(l.default.Component);m.propTypes={}}).call(t,n(8))},295:function(e,t,n){(function(e){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function i(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function a(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}t.__esModule=!0,t.BlogPostHeadContent=void 0;var c=n(2),l=r(c),s=n(5),u=r(s),p=n(37),f=n(65),d=r(f),m=n(17),b=r(m),h=t.BlogPostHeadContent=function(t){function n(){return o(this,n),i(this,t.apply(this,arguments))}return a(n,t),n.prototype.render=function(){var t=this.props,n=t.post,r=t.slug,o=t.body,i="http://benmccormick.org/"+r;return e.createElement(p.HeadContent,{title:n.title?n.title+" | benmccormick.org":"benmccormick.org",description:n.description,keywords:n.keywords,meta:{"twitter:card":"summary","twitter:site":"@benmccormickorg","twitter:creator":"@ben336","twitter:title":n.title,"twitter:description":n.description||"","twitter:image":n.image||"http://benmccormick.org/logo.png"},script:[{type:"application/ld+json",innerHTML:'{\n                  "@context": "http://schema.org"\n                  "@type": "BlogPosting",\n                  "headline": "'+n.title+'",\n                  "genre": "Software Development",\n                  "keywords": "'+(n.keywords||"")+'",\n                  "url": "'+i+'",\n                  "image": "http://benmccormick.org/logo.png",\n                  "datePublished": "'+(0,d.default)((0,b.default)(n.date),"YYYY-MM-D")+'",\n                  '+(n.description?'"description": "'+n.description+'",':"")+'\n                  "articleBody": "'+o.replace(/\"/g,'\\"')+'",\n                    "author": {\n                      "@type": "Person",\n                      "name": "Ben McCormick"\n                      "email": "mailto:ben@benmccormick.org",\n                      "image": "/profile_pic.jpg",\n                      "jobTitle": "Software Engineer",\n                      "alumniOf": "Duke",\n                      "birthPlace": "Pittsburgh, PA",\n                      "gender": "male",\n                      "url": "http://benmccormick.org",\n                \t    "sameAs" : [\n                        "https://www.linkedin.com/in/benmccormick",\n                        "http://twitter.com/ben336",\n                      ]\n                   }\n                }'}]})},n}(l.default.Component);h.propTypes={post:u.default.object.isRequired,slug:u.default.string.isRequired,body:u.default.string.isRequired}}).call(t,n(8))},298:function(e,t,n){(function(e){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function i(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function a(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}t.__esModule=!0,t.EmailSubscribe=void 0;var c=n(2),l=r(c),s=n(27),u=r(s),p=n(303),f=n(16),d=r(f),m=d.default.h6({margin:0,fontSize:u.default.scale(-.5).fontSize,lineHeight:u.default.scale(-.5).lineHeight,letterSpacing:-.25});t.EmailSubscribe=function(t){function n(){return o(this,n),i(this,t.apply(this,arguments))}return a(n,t),n.prototype.render=function(){return e.createElement(p.SubscribeBlock,null,e.createElement("div",{id:"mc_embed_signup"},e.createElement(m,null,"Subscribe via email"),e.createElement("form",{action:"//benmccormick.us8.list-manage.com/subscribe/post?u=115446b80fd9d930ba091cc27&id=f5b9f5acf2",method:"post",id:"mc-embedded-subscribe-form",name:"mc-embedded-subscribe-form",className:"validate",target:"_blank",noValidate:!0},e.createElement("div",{id:"mc_embed_signup_scroll"},e.createElement("div",{className:"mc-field-group sidebar-group"},e.createElement("input",{type:"email",defaultValue:"",name:"EMAIL",className:"subscribe-email required email",id:"mce-EMAIL",placeholder:"Email Address"}),e.createElement("input",{type:"submit",value:">",name:"subscribe",id:"mc-embedded-subscribe",className:"subscribe-button button"})),e.createElement("div",{id:"mce-responses",className:"clear"},e.createElement("div",{className:"response",id:"mce-error-response",style:{display:"none"}}),e.createElement("div",{className:"response",id:"mce-success-response",style:{display:"none"}})),e.createElement("div",{style:{position:"absolute",left:"-5000px"},"aria-hidden":"true"},e.createElement("input",{type:"text",name:"b_115446b80fd9d930ba091cc27_f5b9f5acf2",tabIndex:"-1",value:""})),e.createElement("div",{className:"clear"})))))},n}(l.default.Component)}).call(t,n(8))},301:function(e,t,n){(function(r){"use strict";function o(e){return e&&e.__esModule?e:{default:e}}function i(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function a(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function c(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}t.__esModule=!0;var l=n(5),s=o(l),u=n(2),p=o(u),f=n(302),d=o(f);n(424);var m=function(e){function t(){return i(this,t),a(this,e.apply(this,arguments))}return c(t,e),t.prototype.render=function(){var e=this.props.recommendedPosts;return r.createElement(d.default,{recommendedPosts:e})},t}(p.default.Component);m.propTypes={post:s.default.object.isRequired,recommendedPosts:s.default.array},t.default=m,e.exports=t.default}).call(t,n(8))},302:function(e,t,n){(function(r){"use strict";function o(e){return e&&e.__esModule?e:{default:e}}function i(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function a(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function c(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}t.__esModule=!0;var l=n(5),s=o(l),u=n(2),p=o(u),f=n(38),d=o(f),m=function(e){function t(){return i(this,t),a(this,e.apply(this,arguments))}return c(t,e),t.prototype.render=function(){var e=this.props.recommendedPosts;return r.createElement("div",null,r.createElement("hr",null),r.createElement(d.default,{title:"You Might Also Like These Articles",pages:e,showCategory:!1,showDate:!0,useBox:!0}))},t}(p.default.Component);m.propTypes={pages:s.default.array},t.default=m,e.exports=t.default}).call(t,n(8))},303:function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}t.__esModule=!0,t.SubscribeBlock=void 0;var o=n(16),i=r(o);t.SubscribeBlock=i.default.div({overflow:"hidden",margin:0,"& #mc_embed_signup form":{marginBottom:"20px"},"@media all and (max-width: 700px)":{paddingRight:0,width:"100% !important",padding:"0 10px","& .mc-field-group":{width:"100% !important"},"& .mc-field-group input":{width:"100% !important",fontSize:"0.8em",height:"2.4em"}}})},419:function(e,t){},421:function(e,t){},422:function(e,t){},424:function(e,t){},425:function(e,t){},135:function(e,t){},310:function(e,t,n){(function(e){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function i(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function a(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}t.__esModule=!0,t.pageQuery=void 0,n(419),n(421),n(422),n(425),n(135);var c=n(2),l=r(c),s=n(65),u=r(s),p=n(294),f=n(298),d=n(295),m=n(79),b=n(27),h=r(b),y=n(301),g=r(y),w=n(16),_=r(w),E=_.default.h5({display:"block",fontFamily:b.serifFontStack,fontSize:"16px",color:"rgba(100,100,100, 0.8)",marginTop:h.default.rhythm(.5),marginBottom:h.default.rhythm(.5)}),v=_.default.h1({display:"block",maxWidth:"100%"}),x=_.default.div({maxWidth:"100%","& li":{paddingLeft:"10px"},"& .reading-img img":{width:"150px",float:"right",margin:"0px 10px 20px 10px"},"& img.full-width":{maxHeight:"none"},"& img.half-width":{maxHeight:"none",width:"50%"}}),k=_.default.div({paddingLeft:"2rem"}),j=function(t){function n(){return o(this,n),i(this,t.apply(this,arguments))}return a(n,t),n.prototype.componentDidMount=function(){(0,m.fadeIn)(this.markdownContainer)},n.prototype.render=function(){var t=this,n=this.props,r=n.data,o=n.pathContext,i=n.history,a=r.markdownRemark.frontmatter,c=r.markdownRemark.html,l=r.markdownRemark.fields.slug,s="post"===a.layout,m="weekly-links"===a.layout,b=s||m,h=function(e){return s?e:null},y=function(e){return b?e:null};return e.createElement("div",{className:"markdown",ref:function(e){return t.markdownContainer=e}},e.createElement(d.BlogPostHeadContent,{post:a,slug:l,body:c}),e.createElement("div",{className:"post-title-area"},e.createElement(v,null,a.title),h(e.createElement(E,null,"Originally Posted ",(0,u.default)(new Date(a.date),"MMMM Do YYYY")))),e.createElement("div",{className:"columns"},e.createElement(x,{dangerouslySetInnerHTML:{__html:c}}),y(e.createElement(k,{className:"no-mobile"},e.createElement(p.Ad,{history:i}),e.createElement(f.EmailSubscribe,null)))),h(e.createElement(g.default,{post:a,recommendedPosts:o.relatedPosts})))},n}(l.default.Component);t.default=j;t.pageQuery="** extracted graphql fragment **"}).call(t,n(8))}});
//# sourceMappingURL=component---src-templates-blog-post-js-ecd6e08f0703f7a23b50.js.map