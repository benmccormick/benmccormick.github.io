webpackJsonp([0x67ef26645b2ab800,0x36dfee11ec260a00],{"./node_modules/json-loader/index.js!./.cache/json/layout-index.json":function(e,t){e.exports={layoutContext:{}}},'./node_modules/babel-loader/lib/index.js?{"plugins":["/Users/ben/Blog/benmccormickorg/node_modules/gatsby/dist/utils/babel-plugin-extract-graphql.js","/Users/ben/Blog/benmccormickorg/node_modules/babel-plugin-add-module-exports/lib/index.js","/Users/ben/Blog/benmccormickorg/node_modules/babel-plugin-transform-object-assign/lib/index.js",["transform-react-jsx",{"pragma":"Glamor.createElement"}],"glamor/babel-hoist"],"presets":["/Users/ben/Blog/benmccormickorg/node_modules/babel-preset-env/lib/index.js","/Users/ben/Blog/benmccormickorg/node_modules/babel-preset-stage-0/lib/index.js","/Users/ben/Blog/benmccormickorg/node_modules/babel-preset-react/lib/index.js"],"cacheDirectory":true}!./.cache/layouts/index.js':function(e,t,n){(function(o){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var i=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var o in n)Object.prototype.hasOwnProperty.call(n,o)&&(e[o]=n[o])}return e},s=n("./node_modules/react/react.js"),a=(r(s),n("./src/layouts/index.js")),l=r(a),d=n("./node_modules/json-loader/index.js!./.cache/json/layout-index.json"),c=r(d);t.default=function(e){return o.createElement(l.default,i({},e,c.default))},e.exports=t.default}).call(t,n("./node_modules/glamor/react.js"))},"./node_modules/css-loader/lib/css-base.js":function(e,t){e.exports=function(){var e=[];return e.toString=function(){for(var e=[],t=0;t<this.length;t++){var n=this[t];n[2]?e.push("@media "+n[2]+"{"+n[1]+"}"):e.push(n[1])}return e.join("")},e.i=function(t,n){"string"==typeof t&&(t=[[null,t,""]]);for(var o={},r=0;r<this.length;r++){var i=this[r][0];"number"==typeof i&&(o[i]=!0)}for(r=0;r<t.length;r++){var s=t[r];"number"==typeof s[0]&&o[s[0]]||(n&&!s[2]?s[2]=n:n&&(s[2]="("+s[2]+") and ("+n+")"),e.push(s))}},e}},"./node_modules/element-resize-event/index.js":function(e,t){function n(e){var t=e.target||e.srcElement;t.__resizeRAF__&&r(t.__resizeRAF__),t.__resizeRAF__=o(function(){var n=t.__resizeTrigger__;n.__resizeListeners__.forEach(function(t){t.call(n,e)})})}var o=function(){var e=this,t=e.requestAnimationFrame||e.mozRequestAnimationFrame||e.webkitRequestAnimationFrame||function(t){return e.setTimeout(t,20)};return function(e){return t(e)}}(),r=function(){var e=this,t=e.cancelAnimationFrame||e.mozCancelAnimationFrame||e.webkitCancelAnimationFrame||e.clearTimeout;return function(e){return t(e)}}(),t=function(e,t){function o(){this.contentDocument.defaultView.__resizeTrigger__=this.__resizeElement__,this.contentDocument.defaultView.addEventListener("resize",n)}var r,i=this,s=i.document,a=s.attachEvent;if("undefined"!=typeof navigator&&(r=navigator.userAgent.match(/Trident/)||navigator.userAgent.match(/Edge/)),!e.__resizeListeners__)if(e.__resizeListeners__=[],a)e.__resizeTrigger__=e,e.attachEvent("onresize",n);else{"static"===getComputedStyle(e).position&&(e.style.position="relative");var l=e.__resizeTrigger__=s.createElement("object");l.setAttribute("style","display: block; position: absolute; top: 0; left: 0; height: 100%; width: 100%; overflow: hidden; pointer-events: none; z-index: -1; opacity: 0;"),l.setAttribute("class","resize-sensor"),l.__resizeElement__=e,l.onload=o,l.type="text/html",r&&e.appendChild(l),l.data="about:blank",r||e.appendChild(l)}e.__resizeListeners__.push(t)};e.exports="undefined"==typeof window?t:t.bind(window),e.exports.unbind=function(e,t){var o=document.attachEvent;t?e.__resizeListeners__.splice(e.__resizeListeners__.indexOf(t),1):e.__resizeListeners__=[],e.__resizeListeners__.length||(o?e.detachEvent("onresize",n):(e.__resizeTrigger__.contentDocument.defaultView.removeEventListener("resize",n),delete e.__resizeTrigger__.contentDocument.defaultView.__resizeTrigger__,e.__resizeTrigger__=!e.removeChild(e.__resizeTrigger__)),delete e.__resizeListeners__)}},"./node_modules/raf/index.js":function(e,t,n){for(var o=n("./node_modules/raf/node_modules/performance-now/lib/performance-now.js"),r="undefined"==typeof window?{}:window,i=["moz","webkit"],s="AnimationFrame",a=r["request"+s],l=r["cancel"+s]||r["cancelRequest"+s],d=!0,c=0;c<i.length&&!a;c++)a=r[i[c]+"Request"+s],l=r[i[c]+"Cancel"+s]||r[i[c]+"CancelRequest"+s];if(!a||!l){d=!1;var u=0,p=0,m=[],f=1e3/60;a=function(e){if(0===m.length){var t=o(),n=Math.max(0,f-(t-u));u=n+t,setTimeout(function(){var e=m.slice(0);m.length=0;for(var t=0;t<e.length;t++)if(!e[t].cancelled)try{e[t].callback(u)}catch(e){setTimeout(function(){throw e},0)}},Math.round(n))}return m.push({handle:++p,callback:e,cancelled:!1}),p},l=function(e){for(var t=0;t<m.length;t++)m[t].handle===e&&(m[t].cancelled=!0)}}e.exports=function(e){return d?a.call(r,function(){try{e.apply(this,arguments)}catch(e){setTimeout(function(){throw e},0)}}):a.call(r,e)},e.exports.cancel=function(){l.apply(r,arguments)}},"./node_modules/raf/node_modules/performance-now/lib/performance-now.js":function(e,t,n){(function(t){(function(){var n,o,r;"undefined"!=typeof performance&&null!==performance&&performance.now?e.exports=function(){return performance.now()}:"undefined"!=typeof t&&null!==t&&t.hrtime?(e.exports=function(){return(n()-r)/1e6},o=t.hrtime,n=function(){var e;return e=o(),1e9*e[0]+e[1]},r=n()):Date.now?(e.exports=function(){return Date.now()-r},r=Date.now()):(e.exports=function(){return(new Date).getTime()-r},r=(new Date).getTime())}).call(this)}).call(t,n("./node_modules/process/browser.js"))},"./node_modules/react-component-width-mixin/index.js":function(e,t,n){var o=n("./node_modules/react-dom/index.js"),r=n("./node_modules/element-resize-event/index.js");e.exports={getInitialState:function(){return void 0!==this.props.initialComponentWidth&&null!==this.props.initialComponentWidth?{componentWidth:this.props.initialComponentWidth}:{}},componentDidMount:function(){this.setState({componentWidth:o.findDOMNode(this).getBoundingClientRect().width}),r(o.findDOMNode(this),this.onResize)},componentDidUpdate:function(){0===o.findDOMNode(this).getElementsByClassName("resize-sensor").length&&r(o.findDOMNode(this),this.onResize)},onResize:function(){this.setState({componentWidth:o.findDOMNode(this).getBoundingClientRect().width})}}},"./node_modules/react-page-width/dist/index.js":function(e,t,n){var o;o=n("./node_modules/react-page-width/dist/resizeListener.js"),e.exports={getInitialState:function(){return this.props.initialPageWidth?{pageWidth:this.props.initialPageWidth}:{}},componentDidMount:function(){return o.on(this.onResize)},componentWillUnmount:function(){return o.off(this.onResize)},onResize:function(e){return this.setState({pageWidth:e})}}},"./node_modules/react-page-width/dist/resizeListener.js":function(e,t,n){var o,r,i,s,a,l;i=n("./node_modules/raf/index.js"),o=void 0,s=[],a=!1,"undefined"!=typeof window&&null!==window&&(o=window.innerWidth),r=function(){if(!a)return a=!0,i(l)},l=function(){var e,t,n;for(o=window.innerWidth,e=0,t=s.length;e<t;e++)(n=s[e])(o);return a=!1},"undefined"!=typeof window&&null!==window&&window.addEventListener("resize",r),e.exports={on:function(e){return e(o),s.push(e)},off:function(e){return s.splice(s.indexOf(e),1)}}},"./node_modules/react-responsive-grid/dist/components/Breakpoint.js":function(e,t,n){var o,r,i,s,a,l;s=n("./node_modules/react/react.js"),a=n("./node_modules/react-component-width-mixin/index.js"),i=n("./node_modules/react-page-width/dist/index.js"),l=n("./node_modules/object-assign/index.js"),o=s.createClass({displayName:"Breakpoint",mixins:[a],propTypes:{minWidth:s.PropTypes.number,maxWidth:s.PropTypes.number},getDefaultProps:function(){return{minWidth:0,maxWidth:1e21}},renderChildren:function(){return s.Children.map(this.props.children,function(e){return function(t){var n;return"Span"===(null!=t&&null!=(n=t.type)?n.displayName:void 0)?s.cloneElement(t,{context:e.props.context}):t}}(this))},render:function(){var e,t;return e=l({},this.props),delete e.maxWidth,delete e.minWidth,delete e.widthMethod,this.state.componentWidth&&this.props.minWidth<=(t=this.state.componentWidth)&&t<this.props.maxWidth?s.createElement("div",Object.assign({},e),this.renderChildren()):s.createElement("div",null)}}),r=s.createClass({displayName:"Breakpoint",mixins:[i],propTypes:{minWidth:s.PropTypes.number,maxWidth:s.PropTypes.number},getDefaultProps:function(){return{minWidth:0,maxWidth:1e21}},renderChildren:function(){return s.Children.map(this.props.children,function(e){return function(t){var n;return"Span"===(null!=(n=t.type)?n.displayName:void 0)?s.cloneElement(t,{context:e.props.context}):t}}(this))},render:function(){var e,t;return e=l({},this.props),delete e.maxWidth,delete e.minWidth,delete e.widthMethod,this.state.pageWidth&&this.props.minWidth<=(t=this.state.pageWidth)&&t<this.props.maxWidth?s.createElement("div",Object.assign({},e),this.renderChildren()):s.createElement("div",null)}}),e.exports=s.createClass({displayName:"Breakpoint",propTypes:{widthMethod:s.PropTypes.string.isRequired,minWidth:s.PropTypes.number,maxWidth:s.PropTypes.number},getDefaultProps:function(){return{widthMethod:"pageWidth"}},render:function(){return"pageWidth"===this.props.widthMethod?s.createElement(r,Object.assign({},this.props)):"componentWidth"===this.props.widthMethod?s.createElement(o,Object.assign({},this.props)):void 0}})},"./node_modules/react-responsive-grid/dist/components/Container.js":function(e,t,n){var o,r;o=n("./node_modules/react/react.js"),r=n("./node_modules/object-assign/index.js"),e.exports=o.createClass({displayName:"Container",render:function(){var e,t,n,i;return t={maxWidth:"960px",marginLeft:"auto",marginRight:"auto"},i=r(t,this.props.style),e=this.props.children,n=r({},this.props),delete n.children,delete n.style,o.createElement("div",Object.assign({},n,{style:i}),e,o.createElement("span",{style:{display:"block",clear:"both"}}," "))}})},"./node_modules/react-responsive-grid/dist/components/Grid.js":function(e,t,n){var o,r;o=n("./node_modules/react/react.js"),r=n("./node_modules/object-assign/index.js"),e.exports=o.createClass({displayName:"Grid",propTypes:{columns:o.PropTypes.number,gutterRatio:o.PropTypes.number},getDefaultProps:function(){return{columns:12,gutterRatio:.25}},renderChildren:function(){return o.Children.map(this.props.children,function(e){return function(t){var n,r;return"Breakpoint"===(n=null!=(r=t.type)?r.displayName:void 0)||"Span"===n?o.cloneElement(t,{context:{columns:e.props.columns,gutterRatio:e.props.gutterRatio}}):t}}(this))},render:function(){var e;return e=r({},this.props),delete e.gutterRatio,delete e.columns,o.createElement("div",Object.assign({},e),this.renderChildren(),o.createElement("span",{style:{display:"block",clear:"both"}}," "))}})},"./node_modules/react-responsive-grid/dist/components/Span.js":function(e,t,n){var o,r,i;o=n("./node_modules/react/react.js"),r=n("./node_modules/object-assign/index.js"),i=n("./node_modules/react-responsive-grid/dist/utils/SpanCalculate.js"),e.exports=o.createClass({displayName:"Span",propTypes:{context:o.PropTypes.object,columns:o.PropTypes.number,at:o.PropTypes.number,pre:o.PropTypes.number,post:o.PropTypes.number,squish:o.PropTypes.number,last:o.PropTypes.bool,break:o.PropTypes.bool},getDefaultProps:function(){return{at:0,pre:0,post:0,squish:0,last:!1,first:!1,break:!1}},renderChildren:function(){return o.Children.map(this.props.children,function(e){return function(t){var n;return"Span"===(null!=t&&null!=(n=t.type)?n.displayName:void 0)?o.cloneElement(t,{context:{columns:e.props.columns,gutterRatio:e.props.context.gutterRatio}}):t}}(this))},render:function(){var e,t;return t=i({contextColumns:this.props.context.columns,gutterRatio:this.props.context.gutterRatio,columns:this.props.columns,at:this.props.at,pre:this.props.pre,post:this.props.post,squish:this.props.squish,last:this.props.last,break:this.props.break}),t=r(t,this.props.style),e=r({},this.props,{style:t}),delete e.at,delete e.break,delete e.columns,delete e.context,delete e.first,delete e.last,delete e.post,delete e.pre,delete e.squish,delete e.style,o.createElement("div",Object.assign({},e,{style:t}),this.renderChildren(),o.createElement("span",{style:{display:"block",clear:"both"}}," "))}})},"./node_modules/react-responsive-grid/dist/index.js":function(e,t,n){t.Container=n("./node_modules/react-responsive-grid/dist/components/Container.js"),t.Grid=n("./node_modules/react-responsive-grid/dist/components/Grid.js"),t.Breakpoint=n("./node_modules/react-responsive-grid/dist/components/Breakpoint.js"),t.Span=n("./node_modules/react-responsive-grid/dist/components/Span.js")},"./node_modules/react-responsive-grid/dist/utils/SpanCalculate.js":function(e,t,n){var o;o=n("./node_modules/object-assign/index.js"),e.exports=function(e){var t,n,r,i,s,a,l,d,c,u;return r={columns:3,at:0,pre:0,post:0,squish:0,contextColumns:12,gutterRatio:.25,first:!1,last:!1},c=o(r,e),d=100/(c.contextColumns+(c.contextColumns-1)*c.gutterRatio),s=c.gutterRatio*d,n=function(e){return d*e+s*(e-1)},t=function(e){return 0===e?0:n(e)+s},u=n(c.columns),a=0===c.at&&0===c.pre&&0===c.squish?0:t(c.at)+t(c.pre)+t(c.squish),c.last&&0===c.post&&0===c.squish?l=0:0!==c.post||0!==c.squish?(l=t(c.post)+t(c.squish),c.last||(l+=s)):l=s,i=c.last?"right":"left",u+="%",a+="%",l+="%",{float:i,marginLeft:a,marginRight:l,width:u,clear:c.break?"both":"none"}}},"./src/components/Header.js":function(e,t,n){(function(e){"use strict";function o(e){return e&&e.__esModule?e:{default:e}}function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function i(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function s(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0}),t.Header=void 0;var a=function(){function e(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(t,n,o){return n&&e(t.prototype,n),o&&e(t,o),t}}(),l=n("./node_modules/react/react.js"),d=o(l),c=n("./node_modules/gatsby-link/index.js"),u=o(c);n("./src/css/header.css");var p=n("./node_modules/glamorous/dist/glamorous.cjs.js"),m=o(p),f=n("./node_modules/glamor/lib/index.js"),h=m.default.div({display:"flex",paddingBottom:"1rem",flexDirection:"row",justifyContent:"space-between",flexWrap:"wrap"}),g=m.default.span({padding:"0 0.5rem","@media all and (max-width: 400px)":{padding:"0 0.25rem"}}),b=m.default.h3({margin:"0 20px 0 0",paddingBottom:0,"& a":{boxShadow:"none",textDecoration:"none",color:"inherit"}}),_=m.default.div({color:"rgba(100,100,100, 0.7)"}),y=(0,f.css)({color:"rgba(100,100,100, 0.7)",fontFamily:"brandon-grotesque, Helvetica, sans-serif",":hover":{color:"#E2777A"}}),x=t.Header=function(t){function n(){return r(this,n),i(this,(n.__proto__||Object.getPrototypeOf(n)).apply(this,arguments))}return s(n,t),a(n,[{key:"render",value:function(){var t=this.props.blogTitle;return e.createElement(h,null,e.createElement(b,null,e.createElement(u.default,{name:"title",to:"/"},t)),e.createElement(_,null,e.createElement(u.default,{className:y,to:"/archive/"},"Blog"),e.createElement(g,null),e.createElement(u.default,{className:y,to:"/subscribe/"},"Subscribe"),e.createElement(g,null),e.createElement(u.default,{className:y,to:"/speaking/"},"Speaking"),e.createElement(g,null),e.createElement("a",{className:y,href:"http://twitter.com/ben336"},"Twitter"),e.createElement(g,null),e.createElement(u.default,{className:y,to:"/about/"},"About")))}}]),n}(d.default.Component);x.propTypes={blogTitle:d.default.PropTypes.string.isRequired}}).call(t,n("./node_modules/glamor/react.js"))},"./src/css/header.css":function(e,t,n){t=e.exports=n("./node_modules/css-loader/lib/css-base.js")(),t.push([e.id,"#carbonads{height:300px;font-size:14px;width:150px;position:relative;border:3px solid #f0f0f0;padding:7px}.carbon-wrap{width:130px;display:flex;flex-direction:column}.carbon-text{padding:5px 10px;max-height:120px;display:inline-block;overflow:hidden;line-height:1.3}.carbon-poweredby{color:hsla(0,0%,39%,.7);position:absolute;right:5px;bottom:0}.post-title-area{padding:1em 0}",""])},"./src/css/mobile.css":function(e,t,n){t=e.exports=n("./node_modules/css-loader/lib/css-base.js")(),t.push([e.id,".columns{display:flex}@media (max-width:700px){.columns{flex-wrap:wrap}.columns>*{max-width:100%}.no-mobile{display:none}}@media (max-width:321px){html{font-size:100%!important}}",""])},"./src/css/typography.css":function(e,t,n){t=e.exports=n("./node_modules/css-loader/lib/css-base.js")(),t.push([e.id,"a{color:#e2777a;text-decoration:none;cursor:pointer}a:hover{text-decoration:underline}.footnote-backref,.footnote-ref{text-decoration:none;padding-left:3px}blockquote{border-left:5px solid #57a3e8;background:#eee;font-weight:400;font-size:.9rem;padding:1.5rem 2rem;margin:0 0 1rem}blockquote p{margin-bottom:.667em}h2,h3{color:#57a3e8}.explanation{padding:10px;background:#eee;border-radius:10px;margin:20px auto;font-size:.85em}.footnotes{font-size:80%}.footnotes li>*{display:inline;margin-bottom:0}",""])},"./src/layouts/index.js":function(e,t,n){(function(o){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}function i(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function s(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function a(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var l=function(){function e(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(t,n,o){return n&&e(t.prototype,n),o&&e(t,o),t}}(),d=n("./node_modules/react/react.js"),c=r(d),u=n("./node_modules/react-responsive-grid/dist/index.js"),p=n("./src/utils/typography.js"),m=n("./src/components/Header.js");n("./src/css/mobile.css"),n("./src/css/typography.css");var f=function(e){function t(){return i(this,t),s(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments))}return a(t,e),l(t,[{key:"render",value:function(){var e=this.props,t=e.children,n=e.history;return o.createElement(u.Container,{style:{padding:(0,p.rhythm)(1.5)+" "+(0,p.rhythm)(.75)}},o.createElement(m.Header,{blogTitle:"benmccormick.org",history:n}),t())}}]),t}(c.default.Component);f.propTypes={children:c.default.PropTypes.any,route:c.default.PropTypes.object},t.default=f,e.exports=t.default}).call(t,n("./node_modules/glamor/react.js"))}});
//# sourceMappingURL=component---src-layouts-index-js-b367be037b716367a19a.js.map