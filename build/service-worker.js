if(!self.define){const e=e=>{"require"!==e&&(e+=".js");let s=Promise.resolve();return r[e]||(s=new Promise(async s=>{if("document"in self){const r=document.createElement("script");r.src=e,document.head.appendChild(r),r.onload=s}else importScripts(e),s()})),s.then(()=>{if(!r[e])throw new Error(`Module ${e} didn’t register its module`);return r[e]})},s=(s,r)=>{Promise.all(s.map(e)).then(e=>r(1===e.length?e[0]:e))},r={require:Promise.resolve(s)};self.define=(s,i,t)=>{r[s]||(r[s]=Promise.resolve().then(()=>{let r={};const c={uri:location.origin+s.slice(1)};return Promise.all(i.map(s=>{switch(s){case"exports":return r;case"module":return c;default:return e(s)}})).then(e=>{const s=t(...e);return r.default||(r.default=s),r})}))}}define("./service-worker.js",["./workbox-dce9cbc5"],(function(e){"use strict";self.addEventListener("message",e=>{e.data&&"SKIP_WAITING"===e.data.type&&self.skipWaiting()}),e.clientsClaim(),e.precacheAndRoute([{url:"/index.html",revision:"eaf7e296d9a82d912e91e5063b6a63a5"},{url:"/static/css/2.2f5cae6d.chunk.css",revision:"b70c2d1c9f734aef2b8feac1ee459928"},{url:"/static/js/2.864ba545.chunk.js",revision:"5b8ecfce0e007673d27b71237b88f97b"},{url:"/static/js/2.864ba545.chunk.js.LICENSE.txt",revision:"cdf6e6b34674f199330e65ec0e02d3ee"},{url:"/static/js/main.d2310404.chunk.js",revision:"90b6b4aa21f4c9a46f08bcabca3e4f3d"},{url:"/static/js/runtime-main.59a51242.js",revision:"bf8fc6dca3fe2f41f02b1436941ca446"}],{}),e.registerRoute(new e.NavigationRoute(e.createHandlerBoundToURL("/index.html"),{denylist:[/^\/_/,/\/[^/?]+\.[^/]+$/]}))}));
//# sourceMappingURL=service-worker.js.map