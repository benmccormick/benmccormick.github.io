(window.webpackJsonp=window.webpackJsonp||[]).push([[5],{180:function(t,n,e){"use strict";e.r(n),function(t){e.d(n,"pageQuery",function(){return h});var r=e(6),i=e.n(r),o=e(4),a=e.n(o),u=e(0),l=e.n(u),c=e(237),f=e(214),s=e(250),d=e(232),p=e(190),m=e.n(p),v=function(n){function e(){return n.apply(this,arguments)||this}return i()(e,n),e.prototype.render=function(){var n=this,e=this.props.data.allMarkdownRemark.edges,r=Object(f.c)(e),i=/Book Review: (.+)/;return t.createElement(d.a,null,t.createElement("div",{ref:function(t){return n.archiveContainer=t}},t.createElement(c.a,{keywords:"blog,articles,posts,javascript,software tools,web development"}),t.createElement(s.a,{pages:r,title:"Book Reviews",titleFn:function(t){return function(t){var n=m()(t,"data.title")||t.path,e=i.exec(n);return e?e[1]:n}(t)}})))},e}(l.a.Component);v.propTypes={route:a.a.object},n.default=v;var h="1833641684"}.call(this,e(79))},202:function(t,n,e){var r=e(206),i=e(201);t.exports=function(t,n,e){return t&&t.length?(n=e||void 0===n?1:i(n),r(t,0,n<0?0:n)):[]}},203:function(t,n,e){var r=e(233),i=e(219),o=e(242),a=e(215),u=o(function(t,n){if(null==t)return[];var e=n.length;return e>1&&a(t,n[0],n[1])?n=[]:e>2&&a(n[0],n[1],n[2])&&(n=[n[0]]),i(t,r(n,1),[])});t.exports=u},206:function(t,n){t.exports=function(t,n,e){var r=-1,i=t.length;n<0&&(n=-n>i?0:i+n),(e=e>i?i:e)<0&&(e+=i),i=n>e?0:e-n>>>0,n>>>=0;for(var o=Array(i);++r<i;)o[r]=t[r+n];return o}},207:function(t,n,e){var r=e(195),i=e(235),o=/^\s+/,a=r.parseInt;t.exports=function(t,n,e){return e||null==n?n=0:n&&(n=+n),a(i(t).replace(o,""),n||0)}},208:function(t,n,e){var r=e(199);t.exports=function(t,n){return r(n,function(n){return t[n]})}},209:function(t,n,e){var r=e(208),i=e(223);t.exports=function(t){return null==t?[]:r(t,i(t))}},210:function(t,n){t.exports=function(t,n,e){for(var r=e-1,i=t.length;++r<i;)if(t[r]===n)return r;return-1}},211:function(t,n){t.exports=function(t){return t!=t}},212:function(t,n,e){var r=e(229),i=e(211),o=e(210);t.exports=function(t,n,e){return n==n?o(t,n,e):r(t,i,e)}},213:function(t,n,e){var r=e(212),i=e(193),o=e(238),a=e(201),u=e(209),l=Math.max;t.exports=function(t,n,e,c){t=i(t)?t:u(t),e=e&&!c?a(e):0;var f=t.length;return e<0&&(e=l(f+e,0)),o(t)?e<=f&&t.indexOf(n,e)>-1:!!f&&r(t,n,e)>-1}},214:function(t,n,e){"use strict";e.d(n,"a",function(){return w}),e.d(n,"b",function(){return b}),e.d(n,"e",function(){return E}),e.d(n,"c",function(){return F}),e.d(n,"d",function(){return k});var r=e(190),i=e.n(r),o=e(213),a=e.n(o),u=e(207),l=e.n(u),c=e(203),f=e.n(c),s=e(202),d=e.n(s),p=e(230),m=e.n(p),v=function(t){return i()(t,"node.frontmatter.isDraft",!1)},h=function(t){return!a()(t.node.frontmatter.path,"/404")&&!t.node.frontmatter.dontfeature&&"post"===i()(t,"node.frontmatter.layout")},g=function(t){return i()(t,"node.fields.slug")},x=function(t){return l()(i()(t,"node.frontmatter.last30pageViews")||0)},y=function(t){return l()(i()(t,"node.frontmatter.pageViews")||0)},w=function(t,n){return void 0===n&&(n=1/0),d()(f()(t,x).reverse().filter(function(t){return!a()(t.node.frontmatter.path,"/404")&&!t.node.frontmatter.dontfeature&&!v(t)&&"post"===i()(t,"node.frontmatter.layout")}).map(function(t){return{data:t.node.frontmatter,path:t.node.fields.slug}}),n)},b=function(t,n,e){void 0===n&&(n=1/0),void 0===e&&(e=!1);var r=function(t,n){return d()(f()(t,y).reverse().filter(h).map(g),n)}(t,10),o=function(t,n){var e=t.filter(h).filter(function(t){return x(t)>30}).filter(function(t){return x(t)!==y(t)}),r=f()(t,y),i=f()(e,x),o=f()(e,function(t){var n=function(n){return m()(n,function(n){return g(n)===g(t)})};return n(r)-n(i)});return d()(o.map(g),n)}(t,10),u=["post"];return e&&u.push("review"),d()(f()(t,function(t){return new Date(i()(t,"node.frontmatter.date"))}).reverse().filter(function(t){return a()(u,i()(t,"node.frontmatter.layout"))&&!v(t)&&!i()(t,"node.frontmatter.dontfeature")}).map(function(t){var n=g(t),e=t.node.frontmatter;return e.isTrending=a()(o,n),e.isPopular=a()(r,n),{data:e,path:n}}),n)},E=function(t,n){return void 0===n&&(n=1/0),d()(f()(t,function(t){return i()(t,"node.frontmatter.date")}).reverse().filter(function(t){return"weekly-links"===i()(t,"node.frontmatter.layout")}).map(function(t){return{data:t.node.frontmatter,path:t.node.fields.slug}}),n)},F=function(t,n){return void 0===n&&(n=1/0),d()(f()(t,function(t){return i()(t,"node.frontmatter.date")}).reverse().filter(function(t){return"review"===i()(t,"node.frontmatter.layout")&&!v(t)}).map(function(t){return{data:t.node.frontmatter,path:t.node.fields.slug}}),n)},k=function(t,n){return void 0===n&&(n=1/0),d()(t.map(function(t){return{data:{title:t},path:"topics/"+t}}),n)}},215:function(t,n,e){var r=e(228),i=e(193),o=e(227),a=e(224);t.exports=function(t,n,e){if(!a(e))return!1;var u=typeof n;return!!("number"==u?i(e)&&o(n,e.length):"string"==u&&n in e)&&r(e[n],t)}},216:function(t,n,e){var r=e(222);t.exports=function(t,n){if(t!==n){var e=void 0!==t,i=null===t,o=t==t,a=r(t),u=void 0!==n,l=null===n,c=n==n,f=r(n);if(!l&&!f&&!a&&t>n||a&&u&&c&&!l&&!f||i&&u&&c||!e&&c||!o)return 1;if(!i&&!a&&!f&&t<n||f&&e&&o&&!i&&!a||l&&e&&o||!u&&o||!c)return-1}return 0}},217:function(t,n,e){var r=e(216);t.exports=function(t,n,e){for(var i=-1,o=t.criteria,a=n.criteria,u=o.length,l=e.length;++i<u;){var c=r(o[i],a[i]);if(c)return i>=l?c:c*("desc"==e[i]?-1:1)}return t.index-n.index}},218:function(t,n){t.exports=function(t,n){var e=t.length;for(t.sort(n);e--;)t[e]=t[e].value;return t}},219:function(t,n,e){var r=e(199),i=e(225),o=e(234),a=e(218),u=e(236),l=e(217),c=e(226);t.exports=function(t,n,e){var f=-1;n=r(n.length?n:[c],u(i));var s=o(t,function(t,e,i){return{criteria:r(n,function(n){return n(t)}),index:++f,value:t}});return a(s,function(t,n){return l(t,n,e)})}},249:function(t,n,e){"use strict";(function(t){var r=e(6),i=e.n(r),o=e(4),a=e.n(o),u=e(0),l=e.n(u),c=e(192),f=e(190),s=e.n(f),d=e(188),p=e(189),m=(e(198),e(197),e(194),e(196)),v=e(50),h=Object(v.css)({fontFamily:d.b,fontSize:"120%",margin:"0 1px "+d.a.rhythm(.5)+" 1px",color:"initial",background:"#FFFFFF",transition:"all 0.5s ease",display:"grid",gridTemplateColumns:"1fr",gridTemplateRows:"1fr",position:"relative",justifyItems:"center",alignItems:"baseline",boxShadow:"0 1px 2px 0 rgba(43, 59, 93, 0.29)",":hover":{textDecoration:"none",boxShadow:"0 10px 30px 0 rgba(0, 0, 0, 0.29)"},height:"100%"}),g=p.a.div({display:"flex",justifyContent:"space-between",alignItems:"center",padding:"1rem",position:"absolute",bottom:0,left:0,right:0,top:0,width:"100%",background:"rgba(255, 255, 255, 1)",opacity:0,":hover":{opacity:.9}}),x=p.a.p({fontFamily:d.c,fontSize:"18px",margin:0,"@media all and (max-width: 700px)":{fontSize:"70%"}}),y=p.a.div({display:"flex",justifyContent:"space-between",alignItems:"center","> *":{marginRight:"10px"},"@media all and (max-width: 700px)":{fontSize:"80%"}}),w=p.a.img({height:"100%"}),b=p.a.div({width:"100%",height:"100%",display:"flex",flexDirection:"column",alignItems:"center"}),E=function(n){function e(){return n.apply(this,arguments)||this}return i()(e,n),e.prototype.render=function(){var n=this.props,e=n.page,r=(0,n.titleFn)(e);return t.createElement(c.Link,{className:h,to:e.path},e.data.image?t.createElement(w,{src:e.data.image}):t.createElement(b,null,t.createElement(m.a,{category:"reviews"}),t.createElement("div",null,r)),t.createElement(g,null,t.createElement("div",null,t.createElement(y,null,r),t.createElement(x,null,e.data.description))))},e}(l.a.Component);E.propTypes={page:a.a.object.isRequired,showDate:a.a.bool.isRequired,titleFn:a.a.func.isRequired},E.defaultProps={showDate:!0,showDescription:!0,titleFn:function(t){return s()(t,"data.title")||t.path}},n.a=E}).call(this,e(79))},250:function(t,n,e){"use strict";(function(t){var r=e(6),i=e.n(r),o=e(0),a=e.n(o),u=e(190),l=e.n(u),c=e(189),f=e(4),s=e.n(f),d=e(249),p=c.a.h2({color:"inherit"}),m=c.a.li({listStyle:"none",display:"block"}),v=c.a.ul({display:"grid",gridTemplateColumns:"30% 30% 30%",gridColumnGap:"5%",gridRowGap:"30px",gridAutoRows:"1fr","@media all and (max-width: 960px)":{gridTemplateColumns:"45% 45%",gridColumnGap:"10%",justifyContent:"center"},"@media all and (max-width: 700px)":{gridTemplateColumns:"300px",justifyContent:"center"}}),h=function(n){function e(){return n.apply(this,arguments)||this}return i()(e,n),e.prototype.render=function(){var n=this.props,e=n.pages,r=n.title,i=n.description,o=n.className,a=n.titleFn,u=e.map(function(n){return t.createElement(m,null,t.createElement(d.a,{key:n.path,page:n,titleFn:a}))});return t.createElement("div",{className:o},r?t.createElement(p,null,r):null,i||null,t.createElement(v,null,u))},e}(a.a.Component);h.propTypes={pages:s.a.array.isRequired,title:s.a.string,description:s.a.node,className:s.a.any.isRequired,titleFn:s.a.func.isRequired,useBox:s.a.bool.isRequired},h.defaultProps={className:"",useBox:!1,titleFn:function(t){return l()(t,"data.title")||t.path}},n.a=h}).call(this,e(79))}}]);
//# sourceMappingURL=component---src-pages-reviews-archive-js-c337c185d02274405aee.js.map