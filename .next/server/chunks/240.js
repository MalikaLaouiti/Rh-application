"use strict";exports.id=240,exports.ids=[240],exports.modules={35664:(e,t,n)=>{n.d(t,{Ry:()=>s});var r=new WeakMap,o=new WeakMap,a={},u=0,i=function(e){return e&&(e.host||i(e.parentNode))},c=function(e,t,n,c){var s=(Array.isArray(e)?e:[e]).map(function(e){if(t.contains(e))return e;var n=i(e);return n&&t.contains(n)?n:(console.error("aria-hidden",e,"in not contained inside",t,". Doing nothing"),null)}).filter(function(e){return!!e});a[n]||(a[n]=new WeakMap);var l=a[n],d=[],f=new Set,v=new Set(s),m=function(e){!e||f.has(e)||(f.add(e),m(e.parentNode))};s.forEach(m);var p=function(e){!e||v.has(e)||Array.prototype.forEach.call(e.children,function(e){if(f.has(e))p(e);else try{var t=e.getAttribute(c),a=null!==t&&"false"!==t,u=(r.get(e)||0)+1,i=(l.get(e)||0)+1;r.set(e,u),l.set(e,i),d.push(e),1===u&&a&&o.set(e,!0),1===i&&e.setAttribute(n,"true"),a||e.setAttribute(c,"true")}catch(t){console.error("aria-hidden: cannot operate on ",e,t)}})};return p(t),f.clear(),u++,function(){d.forEach(function(e){var t=r.get(e)-1,a=l.get(e)-1;r.set(e,t),l.set(e,a),t||(o.has(e)||e.removeAttribute(c),o.delete(e)),a||e.removeAttribute(n)}),--u||(r=new WeakMap,r=new WeakMap,o=new WeakMap,a={})}},s=function(e,t,n){void 0===n&&(n="data-aria-hidden");var r,o=Array.from(Array.isArray(e)?e:[e]),a=t||(r=e,"undefined"==typeof document?null:(Array.isArray(r)?r[0]:r).ownerDocument.body);return a?(o.push.apply(o,Array.from(a.querySelectorAll("[aria-live]"))),c(o,a,n,"aria-hidden")):function(){return null}}},62881:(e,t,n)=>{n.d(t,{Z:()=>c});var r=n(17577);/**
 * @license lucide-react v0.424.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */let o=e=>e.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase(),a=(...e)=>e.filter((e,t,n)=>!!e&&n.indexOf(e)===t).join(" ");/**
 * @license lucide-react v0.424.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */var u={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};/**
 * @license lucide-react v0.424.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */let i=(0,r.forwardRef)(({color:e="currentColor",size:t=24,strokeWidth:n=2,absoluteStrokeWidth:o,className:i="",children:c,iconNode:s,...l},d)=>(0,r.createElement)("svg",{ref:d,...u,width:t,height:t,stroke:e,strokeWidth:o?24*Number(n)/Number(t):n,className:a("lucide",i),...l},[...s.map(([e,t])=>(0,r.createElement)(e,t)),...Array.isArray(c)?c:[c]])),c=(e,t)=>{let n=(0,r.forwardRef)(({className:n,...u},c)=>(0,r.createElement)(i,{ref:c,iconNode:t,className:a(`lucide-${o(e)}`,n),...u}));return n.displayName=`${e}`,n}},58260:(e,t,n)=>{n.d(t,{Z:()=>Y});var r,o,a=function(){return(a=Object.assign||function(e){for(var t,n=1,r=arguments.length;n<r;n++)for(var o in t=arguments[n])Object.prototype.hasOwnProperty.call(t,o)&&(e[o]=t[o]);return e}).apply(this,arguments)};function u(e,t){var n={};for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&0>t.indexOf(r)&&(n[r]=e[r]);if(null!=e&&"function"==typeof Object.getOwnPropertySymbols)for(var o=0,r=Object.getOwnPropertySymbols(e);o<r.length;o++)0>t.indexOf(r[o])&&Object.prototype.propertyIsEnumerable.call(e,r[o])&&(n[r[o]]=e[r[o]]);return n}Object.create,Object.create,"function"==typeof SuppressedError&&SuppressedError;var i=n(17577),c="right-scroll-bar-position",s="width-before-scroll-bar";function l(e,t){return"function"==typeof e?e(t):e&&(e.current=t),e}var d="undefined"!=typeof window?i.useLayoutEffect:i.useEffect,f=new WeakMap;function v(e){return e}var m=function(e){void 0===e&&(e={});var t,n,r,o=(void 0===t&&(t=v),n=[],r=!1,{read:function(){if(r)throw Error("Sidecar: could not `read` from an `assigned` medium. `read` could be used only with `useMedium`.");return n.length?n[n.length-1]:null},useMedium:function(e){var o=t(e,r);return n.push(o),function(){n=n.filter(function(e){return e!==o})}},assignSyncMedium:function(e){for(r=!0;n.length;){var t=n;n=[],t.forEach(e)}n={push:function(t){return e(t)},filter:function(){return n}}},assignMedium:function(e){r=!0;var t=[];if(n.length){var o=n;n=[],o.forEach(e),t=n}var a=function(){var n=t;t=[],n.forEach(e)},u=function(){return Promise.resolve().then(a)};u(),n={push:function(e){t.push(e),u()},filter:function(e){return t=t.filter(e),n}}}});return o.options=a({async:!0,ssr:!1},e),o}(),p=function(){},h=i.forwardRef(function(e,t){var n,r,o,c,s=i.useRef(null),v=i.useState({onScrollCapture:p,onWheelCapture:p,onTouchMoveCapture:p}),h=v[0],g=v[1],y=e.forwardProps,E=e.children,b=e.className,w=e.removeScrollBar,N=e.enabled,C=e.shards,S=e.sideCar,L=e.noIsolation,M=e.inert,T=e.allowPinchZoom,O=e.as,x=e.gapMode,P=u(e,["forwardProps","children","className","removeScrollBar","enabled","shards","sideCar","noIsolation","inert","allowPinchZoom","as","gapMode"]),A=(n=[s,t],r=function(e){return n.forEach(function(t){return l(t,e)})},(o=(0,i.useState)(function(){return{value:null,callback:r,facade:{get current(){return o.value},set current(value){var e=o.value;e!==value&&(o.value=value,o.callback(value,e))}}}})[0]).callback=r,c=o.facade,d(function(){var e=f.get(c);if(e){var t=new Set(e),r=new Set(n),o=c.current;t.forEach(function(e){r.has(e)||l(e,null)}),r.forEach(function(e){t.has(e)||l(e,o)})}f.set(c,n)},[n]),c),R=a(a({},P),h);return i.createElement(i.Fragment,null,N&&i.createElement(S,{sideCar:m,removeScrollBar:w,shards:C,noIsolation:L,inert:M,setCallbacks:g,allowPinchZoom:!!T,lockRef:s,gapMode:x}),y?i.cloneElement(i.Children.only(E),a(a({},R),{ref:A})):i.createElement(void 0===O?"div":O,a({},R,{className:b,ref:A}),E))});h.defaultProps={enabled:!0,removeScrollBar:!0,inert:!1},h.classNames={fullWidth:s,zeroRight:c};var g=function(e){var t=e.sideCar,n=u(e,["sideCar"]);if(!t)throw Error("Sidecar: please provide `sideCar` property to import the right car");var r=t.read();if(!r)throw Error("Sidecar medium not found");return i.createElement(r,a({},n))};g.isSideCarExport=!0;var y=function(){var e=0,t=null;return{add:function(r){if(0==e&&(t=function(){if(!document)return null;var e=document.createElement("style");e.type="text/css";var t=o||n.nc;return t&&e.setAttribute("nonce",t),e}())){var a,u;(a=t).styleSheet?a.styleSheet.cssText=r:a.appendChild(document.createTextNode(r)),u=t,(document.head||document.getElementsByTagName("head")[0]).appendChild(u)}e++},remove:function(){--e||!t||(t.parentNode&&t.parentNode.removeChild(t),t=null)}}},E=function(){var e=y();return function(t,n){i.useEffect(function(){return e.add(t),function(){e.remove()}},[t&&n])}},b=function(){var e=E();return function(t){return e(t.styles,t.dynamic),null}},w={left:0,top:0,right:0,gap:0},N=function(e){return parseInt(e||"",10)||0},C=function(e){var t=window.getComputedStyle(document.body),n=t["padding"===e?"paddingLeft":"marginLeft"],r=t["padding"===e?"paddingTop":"marginTop"],o=t["padding"===e?"paddingRight":"marginRight"];return[N(n),N(r),N(o)]},S=function(e){if(void 0===e&&(e="margin"),"undefined"==typeof window)return w;var t=C(e),n=document.documentElement.clientWidth,r=window.innerWidth;return{left:t[0],top:t[1],right:t[2],gap:Math.max(0,r-n+t[2]-t[0])}},L=b(),M="data-scroll-locked",T=function(e,t,n,r){var o=e.left,a=e.top,u=e.right,i=e.gap;return void 0===n&&(n="margin"),"\n  .".concat("with-scroll-bars-hidden"," {\n   overflow: hidden ").concat(r,";\n   padding-right: ").concat(i,"px ").concat(r,";\n  }\n  body[").concat(M,"] {\n    overflow: hidden ").concat(r,";\n    overscroll-behavior: contain;\n    ").concat([t&&"position: relative ".concat(r,";"),"margin"===n&&"\n    padding-left: ".concat(o,"px;\n    padding-top: ").concat(a,"px;\n    padding-right: ").concat(u,"px;\n    margin-left:0;\n    margin-top:0;\n    margin-right: ").concat(i,"px ").concat(r,";\n    "),"padding"===n&&"padding-right: ".concat(i,"px ").concat(r,";")].filter(Boolean).join(""),"\n  }\n  \n  .").concat(c," {\n    right: ").concat(i,"px ").concat(r,";\n  }\n  \n  .").concat(s," {\n    margin-right: ").concat(i,"px ").concat(r,";\n  }\n  \n  .").concat(c," .").concat(c," {\n    right: 0 ").concat(r,";\n  }\n  \n  .").concat(s," .").concat(s," {\n    margin-right: 0 ").concat(r,";\n  }\n  \n  body[").concat(M,"] {\n    ").concat("--removed-body-scroll-bar-size",": ").concat(i,"px;\n  }\n")},O=function(){var e=parseInt(document.body.getAttribute(M)||"0",10);return isFinite(e)?e:0},x=function(){i.useEffect(function(){return document.body.setAttribute(M,(O()+1).toString()),function(){var e=O()-1;e<=0?document.body.removeAttribute(M):document.body.setAttribute(M,e.toString())}},[])},P=function(e){var t=e.noRelative,n=e.noImportant,r=e.gapMode,o=void 0===r?"margin":r;x();var a=i.useMemo(function(){return S(o)},[o]);return i.createElement(L,{styles:T(a,!t,o,n?"":"!important")})},A=!1;if("undefined"!=typeof window)try{var R=Object.defineProperty({},"passive",{get:function(){return A=!0,!0}});window.addEventListener("test",R,R),window.removeEventListener("test",R,R)}catch(e){A=!1}var k=!!A&&{passive:!1},W=function(e,t){var n=window.getComputedStyle(e);return"hidden"!==n[t]&&!(n.overflowY===n.overflowX&&"TEXTAREA"!==e.tagName&&"visible"===n[t])},D=function(e,t){var n=t.ownerDocument,r=t;do{if("undefined"!=typeof ShadowRoot&&r instanceof ShadowRoot&&(r=r.host),I(e,r)){var o=j(e,r);if(o[1]>o[2])return!0}r=r.parentNode}while(r&&r!==n.body);return!1},I=function(e,t){return"v"===e?W(t,"overflowY"):W(t,"overflowX")},j=function(e,t){return"v"===e?[t.scrollTop,t.scrollHeight,t.clientHeight]:[t.scrollLeft,t.scrollWidth,t.clientWidth]},F=function(e,t,n,r,o){var a,u=(a=window.getComputedStyle(t).direction,"h"===e&&"rtl"===a?-1:1),i=u*r,c=n.target,s=t.contains(c),l=!1,d=i>0,f=0,v=0;do{var m=j(e,c),p=m[0],h=m[1]-m[2]-u*p;(p||h)&&I(e,c)&&(f+=h,v+=p),c instanceof ShadowRoot?c=c.host:c=c.parentNode}while(!s&&c!==document.body||s&&(t.contains(c)||t===c));return d&&(o&&1>Math.abs(f)||!o&&i>f)?l=!0:!d&&(o&&1>Math.abs(v)||!o&&-i>v)&&(l=!0),l},B=function(e){return"changedTouches"in e?[e.changedTouches[0].clientX,e.changedTouches[0].clientY]:[0,0]},_=function(e){return[e.deltaX,e.deltaY]},U=function(e){return e&&"current"in e?e.current:e},$=0,z=[];let K=(r=function(e){var t=i.useRef([]),n=i.useRef([0,0]),r=i.useRef(),o=i.useState($++)[0],a=i.useState(b)[0],u=i.useRef(e);i.useEffect(function(){u.current=e},[e]),i.useEffect(function(){if(e.inert){document.body.classList.add("block-interactivity-".concat(o));var t=(function(e,t,n){if(n||2==arguments.length)for(var r,o=0,a=t.length;o<a;o++)!r&&o in t||(r||(r=Array.prototype.slice.call(t,0,o)),r[o]=t[o]);return e.concat(r||Array.prototype.slice.call(t))})([e.lockRef.current],(e.shards||[]).map(U),!0).filter(Boolean);return t.forEach(function(e){return e.classList.add("allow-interactivity-".concat(o))}),function(){document.body.classList.remove("block-interactivity-".concat(o)),t.forEach(function(e){return e.classList.remove("allow-interactivity-".concat(o))})}}},[e.inert,e.lockRef.current,e.shards]);var c=i.useCallback(function(e,t){if("touches"in e&&2===e.touches.length)return!u.current.allowPinchZoom;var o,a=B(e),i=n.current,c="deltaX"in e?e.deltaX:i[0]-a[0],s="deltaY"in e?e.deltaY:i[1]-a[1],l=e.target,d=Math.abs(c)>Math.abs(s)?"h":"v";if("touches"in e&&"h"===d&&"range"===l.type)return!1;var f=D(d,l);if(!f)return!0;if(f?o=d:(o="v"===d?"h":"v",f=D(d,l)),!f)return!1;if(!r.current&&"changedTouches"in e&&(c||s)&&(r.current=o),!o)return!0;var v=r.current||o;return F(v,t,e,"h"===v?c:s,!0)},[]),s=i.useCallback(function(e){if(z.length&&z[z.length-1]===a){var n="deltaY"in e?_(e):B(e),r=t.current.filter(function(t){var r;return t.name===e.type&&(t.target===e.target||e.target===t.shadowParent)&&(r=t.delta)[0]===n[0]&&r[1]===n[1]})[0];if(r&&r.should){e.cancelable&&e.preventDefault();return}if(!r){var o=(u.current.shards||[]).map(U).filter(Boolean).filter(function(t){return t.contains(e.target)});(o.length>0?c(e,o[0]):!u.current.noIsolation)&&e.cancelable&&e.preventDefault()}}},[]),l=i.useCallback(function(e,n,r,o){var a={name:e,delta:n,target:r,should:o,shadowParent:function(e){for(var t=null;null!==e;)e instanceof ShadowRoot&&(t=e.host,e=e.host),e=e.parentNode;return t}(r)};t.current.push(a),setTimeout(function(){t.current=t.current.filter(function(e){return e!==a})},1)},[]),d=i.useCallback(function(e){n.current=B(e),r.current=void 0},[]),f=i.useCallback(function(t){l(t.type,_(t),t.target,c(t,e.lockRef.current))},[]),v=i.useCallback(function(t){l(t.type,B(t),t.target,c(t,e.lockRef.current))},[]);i.useEffect(function(){return z.push(a),e.setCallbacks({onScrollCapture:f,onWheelCapture:f,onTouchMoveCapture:v}),document.addEventListener("wheel",s,k),document.addEventListener("touchmove",s,k),document.addEventListener("touchstart",d,k),function(){z=z.filter(function(e){return e!==a}),document.removeEventListener("wheel",s,k),document.removeEventListener("touchmove",s,k),document.removeEventListener("touchstart",d,k)}},[]);var m=e.removeScrollBar,p=e.inert;return i.createElement(i.Fragment,null,p?i.createElement(a,{styles:"\n  .block-interactivity-".concat(o," {pointer-events: none;}\n  .allow-interactivity-").concat(o," {pointer-events: all;}\n")}):null,m?i.createElement(P,{gapMode:e.gapMode}):null)},m.useMedium(r),g);var X=i.forwardRef(function(e,t){return i.createElement(h,a({},e,{ref:t,sideCar:K}))});X.classNames=h.classNames;let Y=X},82561:(e,t,n)=>{n.d(t,{M:()=>r});function r(e,t,{checkForDefaultPrevented:n=!0}={}){return function(r){if(e?.(r),!1===n||!r.defaultPrevented)return t?.(r)}}},93095:(e,t,n)=>{n.d(t,{b:()=>u,k:()=>a});var r=n(17577),o=n(10326);function a(e,t){let n=r.createContext(t);function a(e){let{children:t,...a}=e,u=r.useMemo(()=>a,Object.values(a));return(0,o.jsx)(n.Provider,{value:u,children:t})}return a.displayName=e+"Provider",[a,function(o){let a=r.useContext(n);if(a)return a;if(void 0!==t)return t;throw Error(`\`${o}\` must be used within \`${e}\``)}]}function u(e,t=[]){let n=[],a=()=>{let t=n.map(e=>r.createContext(e));return function(n){let o=n?.[e]||t;return r.useMemo(()=>({[`__scope${e}`]:{...n,[e]:o}}),[n,o])}};return a.scopeName=e,[function(t,a){let u=r.createContext(a),i=n.length;function c(t){let{scope:n,children:a,...c}=t,s=n?.[e][i]||u,l=r.useMemo(()=>c,Object.values(c));return(0,o.jsx)(s.Provider,{value:l,children:a})}return n=[...n,a],c.displayName=t+"Provider",[c,function(n,o){let c=o?.[e][i]||u,s=r.useContext(c);if(s)return s;if(void 0!==a)return a;throw Error(`\`${n}\` must be used within \`${t}\``)}]},function(...e){let t=e[0];if(1===e.length)return t;let n=()=>{let n=e.map(e=>({useScope:e(),scopeName:e.scopeName}));return function(e){let o=n.reduce((t,{useScope:n,scopeName:r})=>{let o=n(e)[`__scope${r}`];return{...t,...o}},{});return r.useMemo(()=>({[`__scope${t.scopeName}`]:o}),[o])}};return n.scopeName=t.scopeName,n}(a,...t)]}},825:(e,t,n)=>{n.d(t,{XB:()=>f});var r,o=n(17577),a=n(82561),u=n(45226),i=n(48051),c=n(55049),s=n(10326),l="dismissableLayer.update",d=o.createContext({layers:new Set,layersWithOutsidePointerEventsDisabled:new Set,branches:new Set}),f=o.forwardRef((e,t)=>{let{disableOutsidePointerEvents:n=!1,onEscapeKeyDown:f,onPointerDownOutside:p,onFocusOutside:h,onInteractOutside:g,onDismiss:y,...E}=e,b=o.useContext(d),[w,N]=o.useState(null),C=w?.ownerDocument??globalThis?.document,[,S]=o.useState({}),L=(0,i.e)(t,e=>N(e)),M=Array.from(b.layers),[T]=[...b.layersWithOutsidePointerEventsDisabled].slice(-1),O=M.indexOf(T),x=w?M.indexOf(w):-1,P=b.layersWithOutsidePointerEventsDisabled.size>0,A=x>=O,R=function(e,t=globalThis?.document){let n=(0,c.W)(e),r=o.useRef(!1),a=o.useRef(()=>{});return o.useEffect(()=>{let e=e=>{if(e.target&&!r.current){let r=function(){m("dismissableLayer.pointerDownOutside",n,o,{discrete:!0})},o={originalEvent:e};"touch"===e.pointerType?(t.removeEventListener("click",a.current),a.current=r,t.addEventListener("click",a.current,{once:!0})):r()}else t.removeEventListener("click",a.current);r.current=!1},o=window.setTimeout(()=>{t.addEventListener("pointerdown",e)},0);return()=>{window.clearTimeout(o),t.removeEventListener("pointerdown",e),t.removeEventListener("click",a.current)}},[t,n]),{onPointerDownCapture:()=>r.current=!0}}(e=>{let t=e.target,n=[...b.branches].some(e=>e.contains(t));!A||n||(p?.(e),g?.(e),e.defaultPrevented||y?.())},C),k=function(e,t=globalThis?.document){let n=(0,c.W)(e),r=o.useRef(!1);return o.useEffect(()=>{let e=e=>{e.target&&!r.current&&m("dismissableLayer.focusOutside",n,{originalEvent:e},{discrete:!1})};return t.addEventListener("focusin",e),()=>t.removeEventListener("focusin",e)},[t,n]),{onFocusCapture:()=>r.current=!0,onBlurCapture:()=>r.current=!1}}(e=>{let t=e.target;[...b.branches].some(e=>e.contains(t))||(h?.(e),g?.(e),e.defaultPrevented||y?.())},C);return function(e,t=globalThis?.document){let n=(0,c.W)(e);o.useEffect(()=>{let e=e=>{"Escape"===e.key&&n(e)};return t.addEventListener("keydown",e,{capture:!0}),()=>t.removeEventListener("keydown",e,{capture:!0})},[n,t])}(e=>{x!==b.layers.size-1||(f?.(e),!e.defaultPrevented&&y&&(e.preventDefault(),y()))},C),o.useEffect(()=>{if(w)return n&&(0===b.layersWithOutsidePointerEventsDisabled.size&&(r=C.body.style.pointerEvents,C.body.style.pointerEvents="none"),b.layersWithOutsidePointerEventsDisabled.add(w)),b.layers.add(w),v(),()=>{n&&1===b.layersWithOutsidePointerEventsDisabled.size&&(C.body.style.pointerEvents=r)}},[w,C,n,b]),o.useEffect(()=>()=>{w&&(b.layers.delete(w),b.layersWithOutsidePointerEventsDisabled.delete(w),v())},[w,b]),o.useEffect(()=>{let e=()=>S({});return document.addEventListener(l,e),()=>document.removeEventListener(l,e)},[]),(0,s.jsx)(u.WV.div,{...E,ref:L,style:{pointerEvents:P?A?"auto":"none":void 0,...e.style},onFocusCapture:(0,a.M)(e.onFocusCapture,k.onFocusCapture),onBlurCapture:(0,a.M)(e.onBlurCapture,k.onBlurCapture),onPointerDownCapture:(0,a.M)(e.onPointerDownCapture,R.onPointerDownCapture)})});function v(){let e=new CustomEvent(l);document.dispatchEvent(e)}function m(e,t,n,{discrete:r}){let o=n.originalEvent.target,a=new CustomEvent(e,{bubbles:!1,cancelable:!0,detail:n});t&&o.addEventListener(e,t,{once:!0}),r?(0,u.jH)(o,a):o.dispatchEvent(a)}f.displayName="DismissableLayer",o.forwardRef((e,t)=>{let n=o.useContext(d),r=o.useRef(null),a=(0,i.e)(t,r);return o.useEffect(()=>{let e=r.current;if(e)return n.branches.add(e),()=>{n.branches.delete(e)}},[n.branches]),(0,s.jsx)(u.WV.div,{...e,ref:a})}).displayName="DismissableLayerBranch"},80699:(e,t,n)=>{n.d(t,{EW:()=>a});var r=n(17577),o=0;function a(){r.useEffect(()=>{let e=document.querySelectorAll("[data-radix-focus-guard]");return document.body.insertAdjacentElement("afterbegin",e[0]??u()),document.body.insertAdjacentElement("beforeend",e[1]??u()),o++,()=>{1===o&&document.querySelectorAll("[data-radix-focus-guard]").forEach(e=>e.remove()),o--}},[])}function u(){let e=document.createElement("span");return e.setAttribute("data-radix-focus-guard",""),e.tabIndex=0,e.style.cssText="outline: none; opacity: 0; position: fixed; pointer-events: none",e}},10441:(e,t,n)=>{n.d(t,{M:()=>d});var r=n(17577),o=n(48051),a=n(45226),u=n(55049),i=n(10326),c="focusScope.autoFocusOnMount",s="focusScope.autoFocusOnUnmount",l={bubbles:!1,cancelable:!0},d=r.forwardRef((e,t)=>{let{loop:n=!1,trapped:d=!1,onMountAutoFocus:h,onUnmountAutoFocus:g,...y}=e,[E,b]=r.useState(null),w=(0,u.W)(h),N=(0,u.W)(g),C=r.useRef(null),S=(0,o.e)(t,e=>b(e)),L=r.useRef({paused:!1,pause(){this.paused=!0},resume(){this.paused=!1}}).current;r.useEffect(()=>{if(d){let e=function(e){if(L.paused||!E)return;let t=e.target;E.contains(t)?C.current=t:m(C.current,{select:!0})},t=function(e){if(L.paused||!E)return;let t=e.relatedTarget;null===t||E.contains(t)||m(C.current,{select:!0})};document.addEventListener("focusin",e),document.addEventListener("focusout",t);let n=new MutationObserver(function(e){if(document.activeElement===document.body)for(let t of e)t.removedNodes.length>0&&m(E)});return E&&n.observe(E,{childList:!0,subtree:!0}),()=>{document.removeEventListener("focusin",e),document.removeEventListener("focusout",t),n.disconnect()}}},[d,E,L.paused]),r.useEffect(()=>{if(E){p.add(L);let e=document.activeElement;if(!E.contains(e)){let t=new CustomEvent(c,l);E.addEventListener(c,w),E.dispatchEvent(t),t.defaultPrevented||(function(e,{select:t=!1}={}){let n=document.activeElement;for(let r of e)if(m(r,{select:t}),document.activeElement!==n)return}(f(E).filter(e=>"A"!==e.tagName),{select:!0}),document.activeElement===e&&m(E))}return()=>{E.removeEventListener(c,w),setTimeout(()=>{let t=new CustomEvent(s,l);E.addEventListener(s,N),E.dispatchEvent(t),t.defaultPrevented||m(e??document.body,{select:!0}),E.removeEventListener(s,N),p.remove(L)},0)}}},[E,w,N,L]);let M=r.useCallback(e=>{if(!n&&!d||L.paused)return;let t="Tab"===e.key&&!e.altKey&&!e.ctrlKey&&!e.metaKey,r=document.activeElement;if(t&&r){let t=e.currentTarget,[o,a]=function(e){let t=f(e);return[v(t,e),v(t.reverse(),e)]}(t);o&&a?e.shiftKey||r!==a?e.shiftKey&&r===o&&(e.preventDefault(),n&&m(a,{select:!0})):(e.preventDefault(),n&&m(o,{select:!0})):r===t&&e.preventDefault()}},[n,d,L.paused]);return(0,i.jsx)(a.WV.div,{tabIndex:-1,...y,ref:S,onKeyDown:M})});function f(e){let t=[],n=document.createTreeWalker(e,NodeFilter.SHOW_ELEMENT,{acceptNode:e=>{let t="INPUT"===e.tagName&&"hidden"===e.type;return e.disabled||e.hidden||t?NodeFilter.FILTER_SKIP:e.tabIndex>=0?NodeFilter.FILTER_ACCEPT:NodeFilter.FILTER_SKIP}});for(;n.nextNode();)t.push(n.currentNode);return t}function v(e,t){for(let n of e)if(!function(e,{upTo:t}){if("hidden"===getComputedStyle(e).visibility)return!0;for(;e&&(void 0===t||e!==t);){if("none"===getComputedStyle(e).display)return!0;e=e.parentElement}return!1}(n,{upTo:t}))return n}function m(e,{select:t=!1}={}){if(e&&e.focus){var n;let r=document.activeElement;e.focus({preventScroll:!0}),e!==r&&(n=e)instanceof HTMLInputElement&&"select"in n&&t&&e.select()}}d.displayName="FocusScope";var p=function(){let e=[];return{add(t){let n=e[0];t!==n&&n?.pause(),(e=h(e,t)).unshift(t)},remove(t){e=h(e,t),e[0]?.resume()}}}();function h(e,t){let n=[...e],r=n.indexOf(t);return -1!==r&&n.splice(r,1),n}},88957:(e,t,n)=>{n.d(t,{M:()=>c});var r,o=n(17577),a=n(65819),u=(r||(r=n.t(o,2)))["useId".toString()]||(()=>void 0),i=0;function c(e){let[t,n]=o.useState(u());return(0,a.b)(()=>{e||n(e=>e??String(i++))},[e]),e||(t?`radix-${t}`:"")}},83078:(e,t,n)=>{n.d(t,{h:()=>c});var r=n(17577),o=n(60962),a=n(45226),u=n(65819),i=n(10326),c=r.forwardRef((e,t)=>{let{container:n,...c}=e,[s,l]=r.useState(!1);(0,u.b)(()=>l(!0),[]);let d=n||s&&globalThis?.document?.body;return d?o.createPortal((0,i.jsx)(a.WV.div,{...c,ref:t}),d):null});c.displayName="Portal"},9815:(e,t,n)=>{n.d(t,{z:()=>i});var r=n(17577),o=n(60962),a=n(48051),u=n(65819),i=e=>{let{present:t,children:n}=e,i=function(e){var t,n;let[a,i]=r.useState(),s=r.useRef({}),l=r.useRef(e),d=r.useRef("none"),[f,v]=(t=e?"mounted":"unmounted",n={mounted:{UNMOUNT:"unmounted",ANIMATION_OUT:"unmountSuspended"},unmountSuspended:{MOUNT:"mounted",ANIMATION_END:"unmounted"},unmounted:{MOUNT:"mounted"}},r.useReducer((e,t)=>n[e][t]??e,t));return r.useEffect(()=>{let e=c(s.current);d.current="mounted"===f?e:"none"},[f]),(0,u.b)(()=>{let t=s.current,n=l.current;if(n!==e){let r=d.current,o=c(t);e?v("MOUNT"):"none"===o||t?.display==="none"?v("UNMOUNT"):n&&r!==o?v("ANIMATION_OUT"):v("UNMOUNT"),l.current=e}},[e,v]),(0,u.b)(()=>{if(a){let e=e=>{let t=c(s.current).includes(e.animationName);e.target===a&&t&&o.flushSync(()=>v("ANIMATION_END"))},t=e=>{e.target===a&&(d.current=c(s.current))};return a.addEventListener("animationstart",t),a.addEventListener("animationcancel",e),a.addEventListener("animationend",e),()=>{a.removeEventListener("animationstart",t),a.removeEventListener("animationcancel",e),a.removeEventListener("animationend",e)}}v("ANIMATION_END")},[a,v]),{isPresent:["mounted","unmountSuspended"].includes(f),ref:r.useCallback(e=>{e&&(s.current=getComputedStyle(e)),i(e)},[])}}(t),s="function"==typeof n?n({present:i.isPresent}):r.Children.only(n),l=(0,a.e)(i.ref,function(e){let t=Object.getOwnPropertyDescriptor(e.props,"ref")?.get,n=t&&"isReactWarning"in t&&t.isReactWarning;return n?e.ref:(n=(t=Object.getOwnPropertyDescriptor(e,"ref")?.get)&&"isReactWarning"in t&&t.isReactWarning)?e.props.ref:e.props.ref||e.ref}(s));return"function"==typeof n||i.isPresent?r.cloneElement(s,{ref:l}):null};function c(e){return e?.animationName||"none"}i.displayName="Presence"},55049:(e,t,n)=>{n.d(t,{W:()=>o});var r=n(17577);function o(e){let t=r.useRef(e);return r.useEffect(()=>{t.current=e}),r.useMemo(()=>(...e)=>t.current?.(...e),[])}},52067:(e,t,n)=>{n.d(t,{T:()=>a});var r=n(17577),o=n(55049);function a({prop:e,defaultProp:t,onChange:n=()=>{}}){let[a,u]=function({defaultProp:e,onChange:t}){let n=r.useState(e),[a]=n,u=r.useRef(a),i=(0,o.W)(t);return r.useEffect(()=>{u.current!==a&&(i(a),u.current=a)},[a,u,i]),n}({defaultProp:t,onChange:n}),i=void 0!==e,c=i?e:a,s=(0,o.W)(n);return[c,r.useCallback(t=>{if(i){let n="function"==typeof t?t(e):t;n!==e&&s(n)}else u(t)},[i,e,u,s])]}},65819:(e,t,n)=>{n.d(t,{b:()=>o});var r=n(17577),o=globalThis?.document?r.useLayoutEffect:()=>{}}};