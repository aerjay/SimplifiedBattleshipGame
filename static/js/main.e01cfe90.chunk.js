(this.webpackJsonpbattleship=this.webpackJsonpbattleship||[]).push([[0],{13:function(e,t,n){},14:function(e,t,n){"use strict";n.r(t);var c=n(0),a=n(1),r=n.n(a),s=n(6),o=n.n(s),i=(n(13),n(7)),u=n(2);function l(e){return Object(c.jsx)("button",{className:e.customStyle,"data-testid":e.testId,onClick:e.onClick})}l.defaultProps={customStyle:""};var h=l,d="A".charCodeAt(),j="none",b="ship",p=Array.from(Array(11).keys()).splice(1),f=Array.from(Array(10).keys()).map((function(e){return String.fromCharCode(e+d)}));var y=function(e){var t=Object(a.useState)(function(){var e=new Map;return p.forEach((function(t){f.forEach((function(n){e.set(n+t,j)}))})),e}()),n=Object(u.a)(t,2),r=n[0],s=n[1],o=Object(a.useState)([]),i=Object(u.a)(o,2),l=i[0],d=i[1],y=Object(a.useState)(!1),m=Object(u.a)(y,2),O=m[0],v=m[1],x=Object(a.useState)(!1),S=Object(u.a)(x,2),k=S[0],g=S[1],w=Object(a.useState)(!1),N=Object(u.a)(w,2),C=N[0],E=N[1];function P(t,n){var c=l.slice(),a=new Map(r),o=k,i=!1;k||(O?a.get(t+n)===b?(a.set(t+n,"hit"),o=c.every((function(e){return"hit"===a.get(e.x+e.y)})),i=!0,E(!1)):a.get(t+n)===j?(a.set(t+n,"miss"),i=!0,E(!1)):E(!0):function(e,t,n,c){if(0===e.length)return e.push({x:t,y:n}),c.set(t+n,b),void E(!1);e.length<3&&!e.some((function(e){return e.x===t&&e.y===n}))&&(e.every((function(e){return e.y===n}))&&e.some((function(e){return e.x.charCodeAt()-t.charCodeAt()===1||e.x.charCodeAt()-t.charCodeAt()===-1}))||e.every((function(e){return e.x===t}))&&e.some((function(e){return e.y-n===1||e.y-n===-1})))?(e.push({x:t,y:n}),c.set(t+n,b),E(!1)):E(!0)}(c,t,n,a),O||3!==c.length||(v(!0),e.onShipPlacement()),o&&(g(o),e.onShipHasSunk()),i&&e.onEnemyEndOfTurn(),s(a),d(c))}function A(t,n){var a=r.get(t+n);return e.showShipMarker||a!==b?Object(c.jsx)(h,{testId:t+n,customStyle:a,onClick:function(){return P(t,n)}},t+n):Object(c.jsx)(h,{testId:t+n,customStyle:"",onClick:function(){return P(t,n)}},t+n)}return Object(c.jsxs)("div",{className:"board",children:[Object(c.jsx)("div",{className:"column-label",children:f.map((function(e){return Object(c.jsx)("div",{children:e},e)}))}),Object(c.jsxs)("div",{children:[Object(c.jsx)("div",{className:C?"grid invalid-click":"grid",children:function(){var e=[],t=[];return p.forEach((function(n,a){t=[],f.forEach((function(e){t.push(A(e,n))})),e.push(Object(c.jsx)("div",{className:"grid-row",children:t},a))})),e}()}),Object(c.jsx)("div",{className:"row-label",children:p.map((function(e){return Object(c.jsx)("div",{children:e},e)}))})]})]})};function m(e){return Object(c.jsxs)("div",{className:"split-child-container ".concat(e.customStyle),children:[Object(c.jsx)("h3",{className:"text-center",children:e.name}),Object(c.jsx)(y,{showShipMarker:e.showShipOnBoard,onShipHasSunk:function(){e.onPlayerHasLost(e.name)},onEnemyEndOfTurn:function(){e.onEnemyEndOfTurn(e.name)},onShipPlacement:function(){e.onPlayerShipPlacement(e.name)}})]})}m.defaultProps={customStyle:""};var O=m,v="Player 1",x="Player 2";var S=function(){var e=Object(a.useState)(""),t=Object(u.a)(e,2),n=t[0],r=t[1],s=Object(a.useState)(v),o=Object(u.a)(s,2),l=o[0],h=o[1],d=Object(a.useState)(new Map([[v,!1],[x,!1]])),j=Object(u.a)(d,2),b=j[0],p=j[1];function f(e){h(e)}function y(e){r(e===v?x:v)}function m(e){var t=e===v?x:v,n=new Map(b);n.set(e,!0),h(t),p(n)}function S(e,t,n){var a=arguments.length>3&&void 0!==arguments[3]&&arguments[3],r=t?"hide-board":"";return r=a?"".concat(r," unclickable-board"):r,Object(c.jsx)(O,{name:e,customStyle:r,showShipOnBoard:n,onPlayerHasLost:y,onEnemyEndOfTurn:f,onPlayerShipPlacement:m},e)}function k(e){var t=arguments.length>1&&void 0!==arguments[1]&&arguments[1];return t?Object(c.jsxs)("div",{className:"split-child-container",children:[Object(c.jsx)("p",{className:"text-center",children:e}),Object(c.jsx)("button",{className:"reset-button",onClick:function(){return window.location.reload()},children:"Play again!"})]},"info"):Object(c.jsx)("div",{className:"split-child-container",children:Object(c.jsx)("p",{className:"text-center",children:e})},"info")}return Object(c.jsx)("div",{className:"split",children:function(){var e=Object(i.a)(b.values()),t=new Array(3);if(n){t.push(S(v,!1,!0,!0));var c=n===v?x:v;t.push(k("Congratulations ".concat(n,"!! You sunk your ").concat(c,"'s ship."),!0)),t.push(S(x,!1,!0,!0))}else e.every((function(e){return!0===e}))?l===v?(t.push(S(v,!0,!1)),t.push(k("".concat(v," attack ").concat(x," by clicking any square."))),t.push(S(x,!1,!1))):(t.push(S(v,!1,!1)),t.push(k("".concat(x," attack ").concat(v," by clicking any square."))),t.push(S(x,!0,!1))):l===v?(t.push(S(v,!1,!0)),t.push(k("".concat(v," place your ship on board by clicking 3 adjacent squares horizontally or vertically."))),t.push(S(x,!0,!0))):(t.push(S(v,!0,!0)),t.push(k("".concat(x," place your ship on board by clicking 3 adjacent squares horizontally or vertically."))),t.push(S(x,!1,!0)));return t}()})};o.a.render(Object(c.jsx)(r.a.StrictMode,{children:Object(c.jsx)(S,{})}),document.getElementById("root"))}},[[14,1,2]]]);
//# sourceMappingURL=main.e01cfe90.chunk.js.map