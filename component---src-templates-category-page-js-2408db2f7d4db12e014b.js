(window.webpackJsonp=window.webpackJsonp||[]).push([[11],{189:function(t,n,r){"use strict";r.r(n),function(t){r.d(n,"pageQuery",function(){return c});r(82);var e=r(4),o=r.n(e),u=(r(0),r(300)),i=r(210),a=r(229),f=function(n){var r=n.data,e=n.pageContext,o=n.history,f=r.allMarkdownRemark.edges,c=Object(i.b)(f);return t.createElement(a.a,{history:o},t.createElement(u.a,{pages:c,categoryKey:e.category}))};f.propTypes={route:o.a.object},n.default=f;var c="919390859"}.call(this,r(83))},199:function(t,n,r){var e=r(202),o=r(198);t.exports=function(t,n,r){return t&&t.length?(n=r||void 0===n?1:o(n),e(t,0,n<0?0:n)):[]}},200:function(t,n,r){var e=r(230),o=r(215),u=r(239),i=r(211),a=u(function(t,n){if(null==t)return[];var r=n.length;return r>1&&i(t,n[0],n[1])?n=[]:r>2&&i(n[0],n[1],n[2])&&(n=[n[0]]),o(t,e(n,1),[])});t.exports=a},202:function(t,n){t.exports=function(t,n,r){var e=-1,o=t.length;n<0&&(n=-n>o?0:o+n),(r=r>o?o:r)<0&&(r+=o),o=n>r?0:r-n>>>0,n>>>=0;for(var u=Array(o);++e<o;)u[e]=t[e+n];return u}},203:function(t,n,r){var e=r(196),o=r(232),u=/^\s+/,i=e.parseInt;t.exports=function(t,n,r){return r||null==n?n=0:n&&(n=+n),i(o(t).replace(u,""),n||0)}},204:function(t,n,r){var e=r(197);t.exports=function(t,n){return e(n,function(n){return t[n]})}},205:function(t,n,r){var e=r(204),o=r(218);t.exports=function(t){return null==t?[]:e(t,o(t))}},206:function(t,n){t.exports=function(t,n,r){for(var e=r-1,o=t.length;++e<o;)if(t[e]===n)return e;return-1}},207:function(t,n){t.exports=function(t){return t!=t}},208:function(t,n,r){var e=r(225),o=r(207),u=r(206);t.exports=function(t,n,r){return n==n?u(t,n,r):e(t,o,r)}},209:function(t,n,r){var e=r(208),o=r(195),u=r(235),i=r(198),a=r(205),f=Math.max;t.exports=function(t,n,r,c){t=o(t)?t:a(t),r=r&&!c?i(r):0;var s=t.length;return r<0&&(r=f(s+r,0)),u(t)?r<=s&&t.indexOf(n,r)>-1:!!s&&e(t,n,r)>-1}},210:function(t,n,r){"use strict";r.d(n,"a",function(){return w}),r.d(n,"b",function(){return b}),r.d(n,"e",function(){return k}),r.d(n,"c",function(){return E}),r.d(n,"d",function(){return C});var e=r(193),o=r.n(e),u=r(209),i=r.n(u),a=r(203),f=r.n(a),c=r(200),s=r.n(c),d=r(199),l=r.n(d),p=r(226),v=r.n(p),m=function(t){return o()(t,"node.frontmatter.isDraft",!1)},g=function(t){return!i()(t.node.frontmatter.path,"/404")&&!t.node.frontmatter.dontfeature&&"post"===o()(t,"node.frontmatter.layout")},h=function(t){return o()(t,"node.fields.slug")},y=function(t){return f()(o()(t,"node.frontmatter.last30pageViews")||0)},x=function(t){return f()(o()(t,"node.frontmatter.pageViews")||0)},w=function(t,n){return void 0===n&&(n=1/0),l()(s()(t,y).reverse().filter(function(t){return!i()(t.node.frontmatter.path,"/404")&&!t.node.frontmatter.dontfeature&&!m(t)&&"post"===o()(t,"node.frontmatter.layout")}).map(function(t){return{data:t.node.frontmatter,path:t.node.fields.slug}}),n)},b=function(t,n,r){void 0===n&&(n=1/0),void 0===r&&(r=!1);var e=function(t,n){return l()(s()(t,x).reverse().filter(g).map(h),n)}(t,10),u=function(t,n){var r=t.filter(g).filter(function(t){return y(t)>30}).filter(function(t){return y(t)!==x(t)}),e=s()(t,x),o=s()(r,y),u=s()(r,function(t){var n=function(n){return v()(n,function(n){return h(n)===h(t)})};return n(e)-n(o)});return l()(u.map(h),n)}(t,10),a=["post"];return r&&a.push("review"),l()(s()(t,function(t){return new Date(o()(t,"node.frontmatter.date"))}).reverse().filter(function(t){return i()(a,o()(t,"node.frontmatter.layout"))&&!m(t)&&!o()(t,"node.frontmatter.dontfeature")}).map(function(t){var n=h(t),r=t.node.frontmatter;return r.isTrending=i()(u,n),r.isPopular=i()(e,n),{data:r,path:n}}),n)},k=function(t,n){return void 0===n&&(n=1/0),l()(s()(t,function(t){return o()(t,"node.frontmatter.date")}).reverse().filter(function(t){return"weekly-links"===o()(t,"node.frontmatter.layout")}).map(function(t){return{data:t.node.frontmatter,path:t.node.fields.slug}}),n)},E=function(t,n){return void 0===n&&(n=1/0),l()(s()(t,function(t){return o()(t,"node.frontmatter.date")}).reverse().filter(function(t){return"review"===o()(t,"node.frontmatter.layout")&&!m(t)}).map(function(t){return{data:t.node.frontmatter,path:t.node.fields.slug}}),n)},C=function(t,n){return void 0===n&&(n=1/0),l()(t.map(function(t){return{data:{title:t},path:"topics/"+t}}),n)}},211:function(t,n,r){var e=r(224),o=r(195),u=r(223),i=r(219);t.exports=function(t,n,r){if(!i(r))return!1;var a=typeof n;return!!("number"==a?o(r)&&u(n,r.length):"string"==a&&n in r)&&e(r[n],t)}},212:function(t,n,r){var e=r(217);t.exports=function(t,n){if(t!==n){var r=void 0!==t,o=null===t,u=t==t,i=e(t),a=void 0!==n,f=null===n,c=n==n,s=e(n);if(!f&&!s&&!i&&t>n||i&&a&&c&&!f&&!s||o&&a&&c||!r&&c||!u)return 1;if(!o&&!i&&!s&&t<n||s&&r&&u&&!o&&!i||f&&r&&u||!a&&u||!c)return-1}return 0}},213:function(t,n,r){var e=r(212);t.exports=function(t,n,r){for(var o=-1,u=t.criteria,i=n.criteria,a=u.length,f=r.length;++o<a;){var c=e(u[o],i[o]);if(c)return o>=f?c:c*("desc"==r[o]?-1:1)}return t.index-n.index}},214:function(t,n){t.exports=function(t,n){var r=t.length;for(t.sort(n);r--;)t[r]=t[r].value;return t}},215:function(t,n,r){var e=r(197),o=r(221),u=r(231),i=r(214),a=r(233),f=r(213),c=r(222);t.exports=function(t,n,r){var s=-1;n=e(n.length?n:[c],a(o));var d=u(t,function(t,r,o){return{criteria:e(n,function(n){return n(t)}),index:++s,value:t}});return i(d,function(t,n){return f(t,n,r)})}},300:function(t,n,r){"use strict";(function(t){var e=r(6),o=r.n(e),u=(r(82),r(0)),i=r.n(u),a=r(242),f=r.n(a),c=r(193),s=r.n(c),d=r(200),l=r.n(d),p=r(234),v=r(240),m=r(243),g=function(n){function r(){return n.apply(this,arguments)||this}return o()(r,n),r.prototype.render=function(){var n=this.props,r=n.pages,e=n.categoryKey,o=f()(m.categories,{key:e}),u=l()(r,function(t){return s()(t,"data.date")}).filter(function(t){return t.data.category===e&&"post"===s()(t,"data.layout")}).reverse(),i=o.description,a=o.title+" Articles";return t.createElement("div",null,t.createElement(p.a,{title:"benmccormick.org - "+a,keywords:"blog,articles,posts,"+a}),t.createElement(v.a,{pages:u,title:a,description:t.createElement("p",null,i),showCategory:!1}))},r}(i.a.Component);n.a=g}).call(this,r(83))}}]);
//# sourceMappingURL=component---src-templates-category-page-js-2408db2f7d4db12e014b.js.map