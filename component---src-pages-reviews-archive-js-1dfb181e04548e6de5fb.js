(window.webpackJsonp=window.webpackJsonp||[]).push([[4],{180:function(t,n,e){"use strict";e.r(n),function(t){e.d(n,"pageQuery",function(){return h});var r=e(6),i=e.n(r),a=e(4),o=e.n(a),u=e(0),l=e.n(u),f=e(237),c=e(214),s=e(250),d=e(232),p=e(190),m=e.n(p),v=function(n){function e(){return n.apply(this,arguments)||this}return i()(e,n),e.prototype.render=function(){var n=this,e=this.props.data.allMarkdownRemark.edges,r=Object(c.c)(e),i=/Book Review: (.+)/;return t.createElement(d.a,null,t.createElement("div",{ref:function(t){return n.archiveContainer=t}},t.createElement(f.a,{keywords:"blog,articles,posts,javascript,software tools,web development"}),t.createElement(s.a,{pages:r,title:"Book Reviews",titleFn:function(t){return function(t){var n=m()(t,"data.title")||t.path,e=i.exec(n);return e?e[1]:n}(t)}})))},e}(l.a.Component);v.propTypes={route:o.a.object},n.default=v;var h="1833641684"}.call(this,e(79))},202:function(t,n,e){var r=e(206),i=e(201);t.exports=function(t,n,e){return t&&t.length?(n=e||void 0===n?1:i(n),r(t,0,n<0?0:n)):[]}},203:function(t,n,e){var r=e(233),i=e(219),a=e(242),o=e(215),u=a(function(t,n){if(null==t)return[];var e=n.length;return e>1&&o(t,n[0],n[1])?n=[]:e>2&&o(n[0],n[1],n[2])&&(n=[n[0]]),i(t,r(n,1),[])});t.exports=u},206:function(t,n){t.exports=function(t,n,e){var r=-1,i=t.length;n<0&&(n=-n>i?0:i+n),(e=e>i?i:e)<0&&(e+=i),i=n>e?0:e-n>>>0,n>>>=0;for(var a=Array(i);++r<i;)a[r]=t[r+n];return a}},207:function(t,n,e){var r=e(196),i=e(235),a=/^\s+/,o=r.parseInt;t.exports=function(t,n,e){return e||null==n?n=0:n&&(n=+n),o(i(t).replace(a,""),n||0)}},208:function(t,n,e){var r=e(200);t.exports=function(t,n){return r(n,function(n){return t[n]})}},209:function(t,n,e){var r=e(208),i=e(223);t.exports=function(t){return null==t?[]:r(t,i(t))}},210:function(t,n){t.exports=function(t,n,e){for(var r=e-1,i=t.length;++r<i;)if(t[r]===n)return r;return-1}},211:function(t,n){t.exports=function(t){return t!=t}},212:function(t,n,e){var r=e(229),i=e(211),a=e(210);t.exports=function(t,n,e){return n==n?a(t,n,e):r(t,i,e)}},213:function(t,n,e){var r=e(212),i=e(193),a=e(238),o=e(201),u=e(209),l=Math.max;t.exports=function(t,n,e,f){t=i(t)?t:u(t),e=e&&!f?o(e):0;var c=t.length;return e<0&&(e=l(c+e,0)),a(t)?e<=c&&t.indexOf(n,e)>-1:!!c&&r(t,n,e)>-1}},214:function(t,n,e){"use strict";e.d(n,"a",function(){return y}),e.d(n,"b",function(){return b}),e.d(n,"e",function(){return E}),e.d(n,"c",function(){return F}),e.d(n,"d",function(){return C});var r=e(190),i=e.n(r),a=e(213),o=e.n(a),u=e(207),l=e.n(u),f=e(203),c=e.n(f),s=e(202),d=e.n(s),p=e(230),m=e.n(p),v=function(t){return i()(t,"node.frontmatter.isDraft",!1)},h=function(t){return!o()(t.node.frontmatter.path,"/404")&&!t.node.frontmatter.dontfeature&&"post"===i()(t,"node.frontmatter.layout")},g=function(t){return i()(t,"node.fields.slug")},x=function(t){return l()(i()(t,"node.frontmatter.last30pageViews")||0)},w=function(t){return l()(i()(t,"node.frontmatter.pageViews")||0)},y=function(t,n){return void 0===n&&(n=1/0),d()(c()(t,x).reverse().filter(function(t){return!o()(t.node.frontmatter.path,"/404")&&!t.node.frontmatter.dontfeature&&!v(t)&&"post"===i()(t,"node.frontmatter.layout")}).map(function(t){return{data:t.node.frontmatter,path:t.node.fields.slug}}),n)},b=function(t,n,e){void 0===n&&(n=1/0),void 0===e&&(e=!1);var r=function(t,n){return d()(c()(t,w).reverse().filter(h).map(g),n)}(t,10),a=function(t,n){var e=t.filter(h).filter(function(t){return x(t)>30}).filter(function(t){return x(t)!==w(t)}),r=c()(t,w),i=c()(e,x),a=c()(e,function(t){var n=function(n){return m()(n,function(n){return g(n)===g(t)})};return n(r)-n(i)});return d()(a.map(g),n)}(t,10),u=["post"];return e&&u.push("review"),d()(c()(t,function(t){return new Date(i()(t,"node.frontmatter.date"))}).reverse().filter(function(t){return o()(u,i()(t,"node.frontmatter.layout"))&&!v(t)&&!i()(t,"node.frontmatter.dontfeature")}).map(function(t){var n=g(t),e=t.node.frontmatter;return e.isTrending=o()(a,n),e.isPopular=o()(r,n),{data:e,path:n}}),n)},E=function(t,n){return void 0===n&&(n=1/0),d()(c()(t,function(t){return i()(t,"node.frontmatter.date")}).reverse().filter(function(t){return"weekly-links"===i()(t,"node.frontmatter.layout")}).map(function(t){return{data:t.node.frontmatter,path:t.node.fields.slug}}),n)},F=function(t,n){return void 0===n&&(n=1/0),d()(c()(t,function(t){return i()(t,"node.frontmatter.date")}).reverse().filter(function(t){return"review"===i()(t,"node.frontmatter.layout")&&!v(t)}).map(function(t){return{data:t.node.frontmatter,path:t.node.fields.slug}}),n)},C=function(t,n){return void 0===n&&(n=1/0),d()(t.map(function(t){return{data:{title:t},path:"topics/"+t}}),n)}},215:function(t,n,e){var r=e(228),i=e(193),a=e(227),o=e(224);t.exports=function(t,n,e){if(!o(e))return!1;var u=typeof n;return!!("number"==u?i(e)&&a(n,e.length):"string"==u&&n in e)&&r(e[n],t)}},216:function(t,n,e){var r=e(222);t.exports=function(t,n){if(t!==n){var e=void 0!==t,i=null===t,a=t==t,o=r(t),u=void 0!==n,l=null===n,f=n==n,c=r(n);if(!l&&!c&&!o&&t>n||o&&u&&f&&!l&&!c||i&&u&&f||!e&&f||!a)return 1;if(!i&&!o&&!c&&t<n||c&&e&&a&&!i&&!o||l&&e&&a||!u&&a||!f)return-1}return 0}},217:function(t,n,e){var r=e(216);t.exports=function(t,n,e){for(var i=-1,a=t.criteria,o=n.criteria,u=a.length,l=e.length;++i<u;){var f=r(a[i],o[i]);if(f)return i>=l?f:f*("desc"==e[i]?-1:1)}return t.index-n.index}},218:function(t,n){t.exports=function(t,n){var e=t.length;for(t.sort(n);e--;)t[e]=t[e].value;return t}},219:function(t,n,e){var r=e(200),i=e(225),a=e(234),o=e(218),u=e(236),l=e(217),f=e(226);t.exports=function(t,n,e){var c=-1;n=r(n.length?n:[f],u(i));var s=a(t,function(t,e,i){return{criteria:r(n,function(n){return n(t)}),index:++c,value:t}});return o(s,function(t,n){return l(t,n,e)})}},249:function(t,n,e){"use strict";(function(t){var r=e(6),i=e.n(r),a=e(4),o=e.n(a),u=e(0),l=e.n(u),f=e(192),c=e(190),s=e.n(c),d=e(188),p=(e(194),e(191),e(189)),m=(e(199),e(198),e(195),e(197)),v=e(50),h=Object(v.css)({fontFamily:d.b,fontSize:"120%",margin:"0 1px "+d.a.rhythm(.5)+" 1px",color:"initial",background:"#FFFFFF",transition:"all 0.5s ease",display:"grid",gridTemplateColumns:"1fr",gridTemplateRows:"200px 1fr",justifyItems:"center",alignItems:"baseline",boxShadow:"0 1px 2px 0 rgba(43, 59, 93, 0.29)",":hover":{textDecoration:"none",boxShadow:"0 10px 30px 0 rgba(0, 0, 0, 0.29)"},height:"100%"}),g=p.a.div({maxWidth:"60vw","@media all and (max-width: 700px)":{maxWidth:"100vw"},display:"flex",justifyContent:"space-between",alignItems:"center",padding:"1rem"}),x=p.a.p({fontFamily:d.c,fontSize:"18px",margin:0,"@media all and (max-width: 700px)":{fontSize:"70%"}}),w=p.a.div({display:"flex",justifyContent:"space-between",alignItems:"center","> *":{marginRight:"10px"},"@media all and (max-width: 700px)":{fontSize:"80%"}}),y=p.a.img({height:"90%",margin:"5%"}),b=p.a.div({padding:"10% 20%",width:"100%",height:"100%"}),E=function(n){function e(){return n.apply(this,arguments)||this}return i()(e,n),e.prototype.render=function(){var n=this.props,e=n.page,r=(0,n.titleFn)(e);return t.createElement(f.Link,{className:h,to:e.path},e.data.image?t.createElement(y,{src:e.data.image}):t.createElement(b,null,t.createElement(m.a,{category:"reviews"})),t.createElement(g,null,t.createElement("div",null,t.createElement(w,null,r),t.createElement(x,null,e.data.description))))},e}(l.a.Component);E.propTypes={page:o.a.object.isRequired,showDate:o.a.bool.isRequired,titleFn:o.a.func.isRequired},E.defaultProps={showDate:!0,showDescription:!0,titleFn:function(t){return s()(t,"data.title")||t.path}},n.a=E}).call(this,e(79))},250:function(t,n,e){"use strict";(function(t){var r=e(6),i=e.n(r),a=e(0),o=e.n(a),u=e(190),l=e.n(u),f=e(189),c=e(4),s=e.n(c),d=e(249),p=f.a.h2({color:"inherit"}),m=f.a.li({listStyle:"none",display:"block"}),v=f.a.ul({display:"grid",gridTemplateColumns:"30% 30% 30%",gridColumnGap:"5%",gridRowGap:"30px",gridAutoRows:"1fr","@media all and (max-width: 960px)":{gridTemplateColumns:"45% 45%",gridColumnGap:"10%",justifyContent:"center"},"@media all and (max-width: 700px)":{gridTemplateColumns:"300px",justifyContent:"center"}}),h=function(n){function e(){return n.apply(this,arguments)||this}return i()(e,n),e.prototype.render=function(){var n=this.props,e=n.pages,r=n.title,i=n.description,a=n.className,o=n.titleFn,u=e.map(function(n){return t.createElement(m,null,t.createElement(d.a,{key:n.path,page:n,titleFn:o}))});return t.createElement("div",{className:a},r?t.createElement(p,null,r):null,i||null,t.createElement(v,null,u))},e}(o.a.Component);h.propTypes={pages:s.a.array.isRequired,title:s.a.string,description:s.a.node,className:s.a.any.isRequired,titleFn:s.a.func.isRequired,useBox:s.a.bool.isRequired},h.defaultProps={className:"",useBox:!1,titleFn:function(t){return l()(t,"data.title")||t.path}},n.a=h}).call(this,e(79))}}]);
//# sourceMappingURL=component---src-pages-reviews-archive-js-1dfb181e04548e6de5fb.js.map