if(!self.define){let e,i={};const s=(s,c)=>(s=new URL(s+".js",c).href,i[s]||new Promise((i=>{if("document"in self){const e=document.createElement("script");e.src=s,e.onload=i,document.head.appendChild(e)}else e=s,importScripts(s),i()})).then((()=>{let e=i[s];if(!e)throw new Error(`Module ${s} didn’t register its module`);return e})));self.define=(c,d)=>{const a=e||("document"in self?document.currentScript.src:"")||location.href;if(i[a])return;let o={};const r=e=>s(e,a),t={module:{uri:a},exports:o,require:r};i[a]=Promise.all(c.map((e=>t[e]||r(e)))).then((e=>(d(...e),o)))}}define(["./workbox-6da860f9"],(function(e){"use strict";self.addEventListener("message",(e=>{e.data&&"SKIP_WAITING"===e.data.type&&self.skipWaiting()})),e.precacheAndRoute([{url:"asset-manifest.json",revision:"daa76489ac78ba2dd883275f53ce15b3"},{url:"favicon.ico",revision:"1f9456e1d5c2fd8cf6de4ceeb50fa77b"},{url:"index.html",revision:"1cf031ba707721029c13e73472767b4a"},{url:"logo192.png",revision:"33dbdd0177549353eeeb785d02c294af"},{url:"logo512.png",revision:"917515db74ea8d1aee6a246cfbcc0b45"},{url:"manifest.json",revision:"7a1e1db8ad4b35ad54eefe3d9fb1df34"},{url:"robots.txt",revision:"fa1ded1ed7c11438a9b0385b1e112850"},{url:"static/css/main.37d0ca8f.css",revision:"8cae1ce1f33638591012f6607dc0d827"},{url:"static/js/787.72ed8b2e.chunk.js",revision:"716d2e402cf5e45eb04ca2b719bf842b"},{url:"static/js/main.466d5f61.js",revision:"df72635b3bab56f711be9a995cc0f653"},{url:"static/js/main.466d5f61.js.LICENSE.txt",revision:"331e94a36034a011a6b0538d076fe258"},{url:"static/media/logo-github-black.62fd7c26b8b494feb602995b56909dc9.svg",revision:"8052116a327ec3e6da56a13ca0bf4bd6"},{url:"static/media/logo.6ce24c58023cc2f8fd88fe9d219db6c6.svg",revision:"06e733283fa43d1dd57738cfc409adbd"}],{ignoreURLParametersMatching:[/^utm_/,/^fbclid$/]})}));
//# sourceMappingURL=sw.js.map