(window.webpackJsonp=window.webpackJsonp||[]).push([[1],{195:function(e,t,n){"use strict";n.d(t,"b",function(){return s}),n.d(t,"c",function(){return l});var r=n(280),o=n.n(r),i=n(281),a=n.n(i),c=n(283),s='"mr-eaves-xl-modern", "Helvetica Neue", Arial, sans-serif',l='"minion-3", Garamond, serif',u=new o.a({baseFontSize:"18px",baseLineHeight:1.6,headerFontFamily:["mr-eaves-xl-modern","sans-serif","Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol"],bodyFontFamily:["minion-3","Garamond","serif","Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol"],scaleRatio:1.6,blockMarginTop:.75,blockMarginBottom:.75,plugins:[new a.a],overrideStyles:function(){var e;return(e={"h1,h2,h3,h4,h5,h6":{lineHeight:1.1},"tt,code":{fontSize:"14px"},pre:{lineHeight:1.1},"pre code":{lineHeight:1.1}})[c.MOBILE_MEDIA_QUERY]={html:{fontSize:"112.5%"}},e}});u.injectStyles(),t.a=u},197:function(e,t,n){"use strict";(function(e){n(85);var r=n(0),o=n.n(r),i=n(4),a=n.n(i),c=n(201),s=n.n(c);n.d(t,"a",function(){return s.a});n(246),n(38),o.a.createContext({});a.a.object,a.a.string.isRequired,a.a.func,a.a.func}).call(this,n(86))},199:function(e,t,n){"use strict";n.d(t,"b",function(){return E}),n.d(t,"c",function(){return T}),n.d(t,"e",function(){return S}),n.d(t,"d",function(){return j}),n.d(t,"a",function(){return C});var r=n(225),o=n(196),i=n.n(o),a=n(241),c=n.n(a),s=n(434),l=n.n(s),u=n(440),p=n.n(u),d=n(304),f=n.n(d),m=n(305),v=n.n(m),h=n(301),g=n.n(h),b=function(e){return i()(e,"node.frontmatter.isDraft",!1)},y=function(e){return!l()(e.node.frontmatter.path,"/404")&&!e.node.frontmatter.dontfeature&&"post"===i()(e,"node.frontmatter.layout")},w=function(e){return i()(e,"node.fields.slug")},x=function(e){return p()(i()(e,"node.frontmatter.last30pageViews")||0)},k=function(e){return p()(i()(e,"node.frontmatter.pageViews")||0)},E=function(e,t){return void 0===t&&(t=1/0),v()(f()(e,function(e){return+e.data.last30pageViews}).reverse(),t)},T=function(e,t,n){void 0===t&&(t=1/0),void 0===n&&(n=!1);var r=function(e,t){return v()(f()(e,k).reverse().filter(y).map(w),t)}(e,10),o=function(e,t){var n=e.filter(y).filter(function(e){return x(e)>30}).filter(function(e){return x(e)!==k(e)}),r=f()(e,k),o=f()(n,x),i=f()(n,function(e){var t=function(t){return g()(t,function(t){return w(t)===w(e)})};return t(r)-t(o)});return v()(i.map(w),t)}(e,10),a=["post"];return n&&a.push("review"),v()(f()(e,function(e){return new Date(i()(e,"node.frontmatter.date"))}).reverse().filter(function(e){return l()(a,i()(e,"node.frontmatter.layout"))&&!b(e)&&!i()(e,"node.frontmatter.dontfeature")}).map(function(e){var t=w(e),n=e.node.frontmatter;return n.isTrending=l()(o,t),n.isPopular=l()(r,t),{data:n,path:t}}),t)},S=function(e,t){return void 0===t&&(t=1/0),v()(f()(e,function(e){return i()(e,"node.frontmatter.date")}).reverse().filter(function(e){return"weekly-links"===i()(e,"node.frontmatter.layout")}).map(function(e){return{data:e.node.frontmatter,path:e.node.fields.slug}}),t)},j=function(e,t){return void 0===t&&(t=1/0),v()(f()(e,function(e){return i()(e,"node.frontmatter.date")}).reverse().filter(function(e){return"review"===i()(e,"node.frontmatter.layout")&&!b(e)}).map(function(e){return{data:e.node.frontmatter,path:e.node.fields.slug}}),t)},C=function(e){var t=i()(r,"categories",[]);return c()(t,{key:e})}},202:function(e,t,n){"use strict";(function(e){var r=n(194),o=(n(85),n(4)),i=n.n(o),a=(n(0),n(303)),c=n.n(a),s=function(t){var n=t.icon,o=t.color,i=t.dimensions,a=function(e,t){return Object(r.a)("span",{target:"efpzdjd0"})({display:"block",width:t+"rem",height:t+"rem",marginRight:"0.5rem","& *":{fill:e},"& > i":{height:.2*t+"rem"}})}(o,void 0===i?2:i);return e.createElement(a,{color:o},e.createElement(c.a,{src:n}))};s.propTypes={color:i.a.string.isRequired,icon:i.a.string.isRequired},t.a=s}).call(this,n(86))},215:function(e,t,n){"use strict";(function(e){n.d(t,"a",function(){return v});var r=n(7),o=n.n(r),i=(n(85),n(0)),a=n.n(i),c=n(4),s=n.n(c),l=n(284),u=n.n(l),p=n(219),d=n.n(p),f=n(299),m=n.n(f),v=function(t){function n(){return t.apply(this,arguments)||this}return o()(n,t),n.prototype.render=function(){var t=this.props,n=t.title,r=t.description,o=t.keywords,i=t.meta,a=t.script,c=d()(i,function(e,t){return{name:t,content:e}});return e.createElement(u.a,{title:n,meta:m()([{name:"description",content:r},{name:"keywords",content:o}],c),script:a})},n}(a.a.Component);v.propTypes={title:s.a.string.isRequired,description:s.a.string.isRequired,keywords:s.a.string.isRequired,script:s.a.array.isRequired,meta:s.a.array.isRequired},v.defaultProps={title:"Ben McCormick",description:"Ben McCormick's blog on JavaScript and Web Development",keywords:"blog javascript development code react vim",script:[],meta:[]}}).call(this,n(86))},216:function(e,t,n){"use strict";(function(e){var r=n(7),o=n.n(r),i=n(194),a=(n(85),n(4)),c=n.n(a),s=n(0),l=n.n(s),u=n(195),p=n(265),d=n(267),f=(n(268),n(248),u.a.rhythm),m=Object(i.a)("div",{target:"em100y90"})({width:"100%",maxWidth:"1000px",margin:"0 auto",padding:f(1.5)+" 20px"}),v=function(t){function n(){return t.apply(this,arguments)||this}return o()(n,t),n.prototype.render=function(){var t=this.props.children;return e.createElement(l.a.Fragment,null,e.createElement(m,null,e.createElement(p.a,{blogTitle:"Ben McCormick"}),t),e.createElement(d.a,null))},n}(l.a.Component);v.propTypes={children:c.a.any},t.a=v}).call(this,n(86))},217:function(e,t){e.exports='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 14 16"><path fill-rule="evenodd" d="M14 6l-4.9-.64L7 1 4.9 5.36 0 6l3.6 3.26L2.67 14 7 11.67 11.33 14l-.93-4.74z"></path></svg>'},218:function(e,t){e.exports='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 12 16"><path fill-rule="evenodd" d="M5.05.31c.81 2.17.41 3.38-.52 4.31C3.55 5.67 1.98 6.45.9 7.98c-1.45 2.05-1.7 6.53 3.53 7.7-2.2-1.16-2.67-4.52-.3-6.61-.61 2.03.53 3.33 1.94 2.86 1.39-.47 2.3.53 2.27 1.67-.02.78-.31 1.44-1.13 1.81 3.42-.59 4.78-3.42 4.78-5.56 0-2.84-2.53-3.22-1.25-5.61-1.52.13-2.03 1.13-1.89 2.75.09 1.08-1.02 1.8-1.86 1.33-.67-.41-.66-1.19-.06-1.78C8.18 5.31 8.68 2.45 5.05.32L5.03.3l.02.01z"></path></svg>'},225:function(e){e.exports={categories:[{title:"JavaScript Libraries",description:"These posts cover development using JavaScript frameworks and libraries, including React, jQuery, Knockout, and Backbone",key:"frameworks",icon:"beaker",color:"rgba(240, 219, 79, 1.00)",altColor:"#333",subscribeText:"JavaScript development"},{title:"JavaScript Language",description:"These posts cover the JavaScript language, its evolution over time, and practical usage examples.",key:"javascript",icon:"code",color:"rgb(42, 194, 240)",altColor:"#333",subscribeText:"JavaScript"},{title:"Architecture",description:"These posts cover ideas, practices and concepts related to structuring the front end code of web applications.",key:"fe-architecture",icon:"organization",color:"#C6687B",subscribeText:"front end architecture"},{title:"Software Productivity",description:"These posts cover techniques and ideas around improving productivity and writing better software.",key:"software-productivity",icon:"project",color:"#F1684E",subscribeText:"Software engineering"},{title:"Meta",key:"meta",description:"These posts are updates about the site, messages to the readers or news from me",icon:"info",color:"#170537",subscribeText:"Web development"},{title:"Software Tools",description:"These posts cover tools and applications I use in software development",key:"tools",icon:"tools",color:"#5F9EA0",subscribeText:"Software tooling"},{title:"Reviews",description:"These posts are reviews of books I've read and products I've used",key:"reviews",icon:"book",color:"rgba(99, 159, 110, 1.00)",subscribeText:"Web development"},{title:"Web Platform",description:"These posts cover the technologies and standards behind the web, especially how they relate to software development",key:"platform",icon:"browser",color:"rgba(29, 100, 158, 1.00)",subscribeText:"The web platform"},{title:"Opinion",description:"These posts cover my thoughts on a variety of technology related subjects",key:"opinion",icon:"megaphone",color:"rgba(154, 116, 170, 1.00)",subscribeText:"Web development"},{title:"Computer Science",description:"These posts cover more academic computer science concepts",key:"computer-science",icon:"desktop",color:"#F08080",subscribeText:"Computer Science"},{title:"Soft Skills",description:"These posts cover the human skills you need to succeed in a software career",key:"soft-skills",icon:"smiley",color:"#FF3366",subscribeText:"Soft Skills"}]}},226:function(e,t,n){var r=n(250),o=n(213),i=n(298),a=n(430),c=n(292),s=n(431),l=n(249);e.exports=function(e,t,n){var u=-1;t=r(t.length?t:[l],c(o));var p=i(e,function(e,n,o){return{criteria:r(t,function(t){return t(e)}),index:++u,value:e}});return a(p,function(e,t){return s(e,t,n)})}},246:function(e,t,n){var r;e.exports=(r=n(266))&&r.default||r},247:function(e,t,n){},248:function(e,t,n){},265:function(e,t,n){"use strict";(function(e){n.d(t,"a",function(){return b});var r=n(7),o=n.n(r),i=n(194),a=(n(85),n(4)),c=n.n(a),s=n(0),l=n.n(s),u=n(197),p=(n(247),n(57)),d=n(195),f=Object(i.a)("div",{target:"e1b8f8ar0"})({name:"13vv67v",styles:"display:flex;padding-bottom:2rem;flex-direction:row;justify-content:space-between;flex-wrap:wrap;"}),m=Object(i.a)("span",{target:"e1b8f8ar1"})({name:"12jh0su",styles:"padding:0 0.5rem;@media all and (max-width: 400px){padding:0 0.25rem;}"}),v=Object(i.a)("h3",{target:"e1b8f8ar2"})({name:"txnzm6",styles:"margin:0 20px 0 0;padding-bottom:0;& a{box-shadow:none;text-decoration:none;color:inherit;:hover{text-decoration:none;}}"}),h=Object(i.a)("div",{target:"e1b8f8ar3"})({name:"177tisd",styles:"color:#999999;"}),g=Object(p.css)({color:"#999999",fontSize:"16px",fontFamily:d.b,":hover":{color:"#F1684E"}}),b=function(t){function n(){return t.apply(this,arguments)||this}return o()(n,t),n.prototype.render=function(){var t=this.props.blogTitle;return e.createElement(f,null,e.createElement(v,null,e.createElement(u.a,{name:"title",to:"/"},t)),e.createElement(h,null,e.createElement(u.a,{className:g,to:"/archive/"},"Blog"),e.createElement(m,null),e.createElement(u.a,{className:g,to:"/subscribe/"},"Subscribe"),e.createElement(m,null),e.createElement(u.a,{className:g,to:"/speaking/"},"Speaking"),e.createElement(m,null),e.createElement("a",{className:g,href:"http://twitter.com/_benmccormick"},"Twitter"),e.createElement(m,null),e.createElement(u.a,{className:g,to:"/about/"},"About")))},n}(l.a.Component);b.propTypes={blogTitle:c.a.string.isRequired}}).call(this,n(86))},266:function(e,t,n){"use strict";n.r(t);n(58);var r=n(0),o=n.n(r),i=n(4),a=n.n(i),c=n(63),s=n(2),l=function(e){var t=e.location,n=s.default.getResourcesForPathnameSync(t.pathname);return o.a.createElement(c.a,Object.assign({location:t,pageResources:n},n.json))};l.propTypes={location:a.a.shape({pathname:a.a.string.isRequired}).isRequired},t.default=l},267:function(e,t,n){"use strict";(function(e){n.d(t,"a",function(){return b});var r=n(7),o=n.n(r),i=n(194),a=(n(85),n(0)),c=n.n(a),s=n(197),l=(n(247),n(57)),u=n(195),p=u.a.rhythm,d=Object(i.a)("div",{target:"e7oz9l30"})({name:"1tfasoy",styles:"width:100%;display:flex;padding:3em 0 1em 0;flex-direction:column;justify-content:center;background-color:RGBA(191, 237, 253, 0.5);border-top:1px solid #68d4fa;"}),f=Object(i.a)("div",{target:"e7oz9l31"})({width:"100%",minHeight:"200px",maxWidth:"960px",margin:"0 auto",padding:"0 "+p(.75),display:"grid",gridTemplateColumns:"45% 45%",gridColumnGap:"10%",gridRowGap:"30px","@media all and (max-width: 450px)":{gridTemplateColumns:"100%"}}),m=Object(i.a)("div",{target:"e7oz9l32"})({name:"1xfqzqa",styles:"display:grid;grid-template-columns:1fr;grid-auto-rows:1fr;grid-row-gap:20px;"}),v=Object(i.a)("h2",{target:"e7oz9l33"})({name:"0",styles:""}),h=Object(l.css)({fontSize:"16px",fontFamily:u.b}),g=Object(i.a)("div",{target:"e7oz9l34"})({fontFamily:u.b,fontSize:"14px",overflow:"visible",whiteSpace:"nowrap"}),b=function(t){function n(){return t.apply(this,arguments)||this}return o()(n,t),n.prototype.render=function(){return e.createElement(d,null,e.createElement(f,null,e.createElement("div",null,e.createElement(v,null,"Content"),e.createElement(m,null,e.createElement(s.a,{className:h,to:"/archive/"},"Blog Archive"),e.createElement(s.a,{className:h,to:"/reviews-archive/"},"Book Reviews"),e.createElement("a",{className:h,href:"https://buttondown.email/benmccormick"},"Newsletter Archives"),e.createElement(s.a,{className:h,to:"/speaking/"},"Speaking"))),e.createElement("div",null,e.createElement(v,null,"Meta"),e.createElement(m,null,e.createElement(s.a,{className:h,to:"/subscribe/"},"Subscribe To The Newsletter"),e.createElement(s.a,{className:h,to:"/built-with/"},"Built With"),e.createElement("a",{className:h,href:"http://twitter.com/_benmccormick"},"Personal Twitter"),e.createElement("a",{className:h,href:"http://twitter.com/benmccormickorg"},"Blog Twitter"),e.createElement(s.a,{className:h,to:"/about/"},"About Me"))),e.createElement(g,null,"Copyright © 2012-2019 · Ben McCormick")))},n}(c.a.Component)}).call(this,n(86))},268:function(e,t,n){},304:function(e,t,n){var r=n(300),o=n(226),i=n(276),a=n(433),c=i(function(e,t){if(null==e)return[];var n=t.length;return n>1&&a(e,t[0],t[1])?t=[]:n>2&&a(t[0],t[1],t[2])&&(t=[t[0]]),o(e,r(t,1),[])});e.exports=c},305:function(e,t,n){var r=n(441),o=n(270);e.exports=function(e,t,n){return e&&e.length?(t=n||void 0===t?1:o(t),r(e,0,t<0?0:t)):[]}},430:function(e,t){e.exports=function(e,t){var n=e.length;for(e.sort(t);n--;)e[n]=e[n].value;return e}},431:function(e,t,n){var r=n(432);e.exports=function(e,t,n){for(var o=-1,i=e.criteria,a=t.criteria,c=i.length,s=n.length;++o<c;){var l=r(i[o],a[o]);if(l)return o>=s?l:l*("desc"==n[o]?-1:1)}return e.index-t.index}},432:function(e,t,n){var r=n(245);e.exports=function(e,t){if(e!==t){var n=void 0!==e,o=null===e,i=e==e,a=r(e),c=void 0!==t,s=null===t,l=t==t,u=r(t);if(!s&&!u&&!a&&e>t||a&&c&&l&&!s&&!u||o&&c&&l||!n&&l||!i)return 1;if(!o&&!a&&!u&&e<t||u&&n&&i&&!o&&!a||s&&n&&i||!c&&i||!l)return-1}return 0}},433:function(e,t,n){var r=n(257),o=n(227),i=n(262),a=n(243);e.exports=function(e,t,n){if(!a(n))return!1;var c=typeof t;return!!("number"==c?o(n)&&i(t,n.length):"string"==c&&t in n)&&r(n[t],e)}},434:function(e,t,n){var r=n(435),o=n(227),i=n(282),a=n(270),c=n(438),s=Math.max;e.exports=function(e,t,n,l){e=o(e)?e:c(e),n=n&&!l?a(n):0;var u=e.length;return n<0&&(n=s(u+n,0)),i(e)?n<=u&&e.indexOf(t,n)>-1:!!u&&r(e,t,n)>-1}},435:function(e,t,n){var r=n(302),o=n(436),i=n(437);e.exports=function(e,t,n){return t==t?i(e,t,n):r(e,o,n)}},436:function(e,t){e.exports=function(e){return e!=e}},437:function(e,t){e.exports=function(e,t,n){for(var r=n-1,o=e.length;++r<o;)if(e[r]===t)return r;return-1}},438:function(e,t,n){var r=n(439),o=n(244);e.exports=function(e){return null==e?[]:r(e,o(e))}},439:function(e,t,n){var r=n(250);e.exports=function(e,t){return r(t,function(t){return e[t]})}},440:function(e,t,n){var r=n(212),o=n(297),i=/^\s+/,a=r.parseInt;e.exports=function(e,t,n){return n||null==t?t=0:t&&(t=+t),a(o(e).replace(i,""),t||0)}},441:function(e,t){e.exports=function(e,t,n){var r=-1,o=e.length;t<0&&(t=-t>o?0:o+t),(n=n>o?o:n)<0&&(n+=o),o=t>n?0:n-t>>>0,t>>>=0;for(var i=Array(o);++r<o;)i[r]=e[r+t];return i}}}]);
//# sourceMappingURL=1-f679f72c9dc28884125e.js.map