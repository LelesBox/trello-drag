!function(t){function e(o){if(n[o])return n[o].exports;var r=n[o]={exports:{},id:o,loaded:!1};return t[o].call(r.exports,r,r.exports,e),r.loaded=!0,r.exports}var n={};return e.m=t,e.c=n,e.p="./",e(0)}([function(t,e,n){"use strict";function o(t){return t&&t.__esModule?t:{"default":t}}function r(t){return document.querySelectorAll(t)}function i(){return"rgba("+Math.round(255*Math.random())+", "+Math.round(255*Math.random())+", "+Math.round(255*Math.random())+", 1)"}function a(t){for(var e=document.createDocumentFragment(),n=0;n<t;n++){var o=document.createElement("div");o.className="drag",o.setAttribute("drag",""),o.style.backgroundColor=i(),e.appendChild(o)}return e}function s(){this.reqA=null,this.increase=5,this.run=function(t,e,n){var o=this;return function r(i){var a=document.documentElement.scrollLeft||document.body.scrollLeft;n>0&&a+document.body.offsetWidth<e?(window.scrollTo(a+o.increase,t),o.reqA=window.requestAnimationFrame(r)):n<0&&a>0?(window.scrollTo(a-o.increase,t),o.reqA=window.requestAnimationFrame(r)):o.reqA=null}}}var u=n(1),l=o(u),c=n(2);!function(){for(var t=0,e=["webkit","moz"],n=0;n<e.length&&!window.requestAnimationFrame;++n)window.requestAnimationFrame=window[e[n]+"RequestAnimationFrame"],window.cancelAnimationFrame=window[e[n]+"CancelAnimationFrame"]||window[e[n]+"CancelRequestAnimationFrame"];window.requestAnimationFrame||(window.requestAnimationFrame=function(e,n){var o=(new Date).getTime(),r=Math.max(0,16.7-(o-t)),i=window.setTimeout(function(){e(o+r)},r);return t=o+r,i}),window.cancelAnimationFrame||(window.cancelAnimationFrame=function(t){clearTimeout(t)})}();for(var d=7,m=0;d--;){var f=++m+1;r(".blocks")[d].appendChild(a(f))}var h={startX:0,startY:0,offsetLeft:0},p=!1;(0,c.on)(r(".co")[0],"mousedown",function(t){p||0!==t.button||t.target!==this||(h.startX=t.clientX,h.startY=t.clientY,h.offsetLeft=document.documentElement.scrollLeft||document.body.scrollLeft,p=!0)}),(0,c.on)(r(".co")[0],"mousemove",function(t){if(p){var e=h.startX-t.clientX;window.scrollTo(h.offsetLeft+e,document.documentElement.scrollTop||document.body.scrollTop)}}),(0,c.on)(r(".co")[0],"mouseup",function(t){p=!1}),(0,c.on)(r(".co")[0],"mouseleave",function(t){p=!1}),s.prototype.left=function(t,e,n){n&&(this.increase=n),this.reqA||(this.reqA=window.requestAnimationFrame(this.run(t,e,-1)))},s.prototype.right=function(t,e,n){n&&(this.increase=n),this.reqA||(this.reqA=window.requestAnimationFrame(this.run(t,e,1)))},s.prototype.stop=function(){this.reqA&&(window.cancelAnimationFrame(this.reqA),this.increase=5,this.reqA=null)};var g=document.getElementsByClassName("co")[0],v=document.documentElement.scrollTop||document.body.scrollTop,w=new s,b=g.offsetWidth,A=(0,l["default"])(r(".blocks"),function(t,e,n){var o=e.right-document.body.clientWidth,r=5;o>0?(o>60?r=20:o>30&&(r=10),w.right(v,b,r)):e.left<0?(e.left<-60?r=20:e.left<-30&&(r=10),w.left(v,b,r)):w.stop()});(0,l["default"])(r(".co"),function(t,e,n){e.right>document.body.clientWidth?w.right(v,b):e.left<0?w.left(v,b):w.stop()}),(0,c.on)(document,"mouseup",function(){w.stop()}),document.addEventListener("click",function(t){if("addone"===t.target.className){var e=t.target.parentNode.children[0];e.appendChild(a(1)),A.update()}})},function(t,e,n){"use strict";function o(t){var e=t.cloneNode(!0);e.style.position="fixed";var n=t.getBoundingClientRect();return e.style.margin="0px",e.style.top=n.top+"px",e.style.left=n.left+"px",e.style.zIndex=9999,e.style.width=t.clientWidth+"px",e.setAttribute("draggable",!1),e}function r(t,e,n){var o=t[e];t[e]=t[n],t[n]=o}function i(t,e){for(var n=t.length;n--;)if(t[n]===e)return n;return-1}function a(t,e,n){var o=t.getBoundingClientRect(),r=e.getBoundingClientRect(),i=Math.min(o.bottom,r.bottom)-Math.max(o.top,r.top),a=Math.min(o.right,r.right)-Math.max(o.left,r.left);if(i>0&&a>0){var s=i*a,u=Math.min(o.width*o.height,r.width*r.height);if(s/u>n)return e}return null}function s(t,e){var n=[],o=[];if(void 0!==t.length)for(var s=0,u=t.length;s<u;s++){var l=t[s].children;n.push(t[s]);for(var c=0,d=l.length;c<d;c++)null!==l[c].getAttribute("drag")&&o.push(l[c])}else{n.push(t),l=t.children;for(var m=0,f=l.length;m<f;m++)null!==l[m].getAttribute("drag")&&o.push(l[c])}var h=o.length,p=n.length;return function(t,s,u){t.style.transform="translate3d("+(u.moveX-u.startX)+"px, "+(u.moveY-u.startY)+"px, 0) rotate(5deg)";var l=t.getBoundingClientRect();e&&e(t,l,u);for(var c,d,m=h,f=p,g=i(o,s);f--;){var v=n[f];if(v!==s.parentNode&&0===v.children.length&&a(t,v.parentNode,.7))return void v.appendChild(s)}for(;m--;)if(c=o[m],c!==s)if(c.parentNode===s.parentNode){if(a(t,c,.7))return void(g<m?(c.parentNode.insertBefore(s,c.nextSibling),r(o,g,m)):g>m&&(c.parentNode.insertBefore(s,c),r(o,g,m)))}else if(a(t,c,.3))return d=c.getBoundingClientRect(),void(l.top>d.top?c.parentNode.insertBefore(s,c.nextSibling):l.bottom<d.bottom&&c.parentNode.insertBefore(s,c))}}var u=n(2),l=document.createElement("style");l.innerHTML='.drag-mask::after {\n  content: "";\n  position: absolute;\n  top:0;\n  left:0;\n  width: 100%;\n  height: 100%;\n  background-color: #c0c6ca;\n  user-select: none;\n  -webkit-user-select:none;\n  -moz-user-select: none;\n  z-index: 9999;\n  border-radius: 4px;\n}\n[drag] {\n  position: relative;\n  cursor: pointer;\n  box-sizing: border-box;\n}',document.getElementsByTagName("head")[0].appendChild(l);var c=0,d={},m=null,f=null,h=null,p={startX:0,startY:0,moveX:0,moveY:0};(0,u.on)(document,"mousedown",function(t){if(0===t.button&&null!==t.target.getAttribute("drag")){p.startX=t.clientX,p.startY=t.clientY;var e=t.target.parentNode.getAttribute("drag-id");if(void 0===e)return;m=d[e],setTimeout(function(){h=t.target,f=o(h),(0,u.addClass)(h,"drag-mask"),document.body.appendChild(f)})}}),(0,u.on)(document,"mousemove",function(t){null!==f&&(p.moveX=t.clientX,p.moveY=t.clientY,m(f,h,p),t.preventDefault())}),(0,u.on)(document,"mouseup",function(){f&&(document.body.contains(f)&&document.body.removeChild(f),(0,u.removeClass)(h,"drag-mask"),f=null)}),(0,u.on)(document,"mouseleave",function(){f&&(document.body.contains(f)&&document.body.removeChild(f),(0,u.removeClass)(h,"drag-mask"),f=null)}),t.exports=function(t,e){var n=c++;if(void 0===t.length)t.setAttribute("drag-id",n);else for(var o=0,r=t.length;o<r;o++)t[o].setAttribute("drag-id",n);return d[n]=s(t,e),{update:function(){d[n]=s(t,e)}}}},function(t,e){"use strict";var n=function(t){return(t||"").replace(/^[\s\uFEFF]+|[\s\uFEFF]+$/g,"")},o=function(t,e){if(!t||!e)return!1;if(e.indexOf(" ")!==-1)throw new Error("className should not contain space.");return t.classList?t.classList.contains(e):(" "+t.className+" ").indexOf(" "+e+" ")>-1},r=function(t,e){if(t){for(var n=t.className,r=(e||"").split(" "),i=0,a=r.length;i<a;i++){var s=r[i];s&&(t.classList?t.classList.add(s):o(t,s)||(n+=" "+s))}t.classList||(t.className=n)}},i=function(t,e){if(t&&e){for(var r=e.split(" "),i=" "+t.className+" ",a=0,s=r.length;a<s;a++){var u=r[a];u&&(t.classList?t.classList.remove(u):o(t,u)&&(i=i.replace(" "+u+" "," ")))}t.classList||(t.className=n(i))}},a=function(t,e){return t+":"+e},s=function(){return document.addEventListener?function(t,e,n){if(t&&e&&n)if(void 0!==t.length)for(var o=0,r=t.length;o<r;o++)t[o].addEventListener(e,n,!1);else t.addEventListener(e,n,!1)}:function(t,e,n){if(t&&e&&n)if(void 0!==t.length)for(var o=0,r=t.length;o<r;o++)t[o].attachEvent("on"+e,n);else t.attachEvent("on"+e,n)}}();t.exports={hasClass:o,addClass:r,removeClass:i,addVendor:a,on:s}}]);
//# sourceMappingURL=dragable.js.map