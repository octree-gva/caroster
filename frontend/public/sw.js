if(!self.define){let e,s={};const a=(a,c)=>(a=new URL(a+".js",c).href,s[a]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=a,e.onload=s,document.head.appendChild(e)}else e=a,importScripts(a),s()})).then((()=>{let e=s[a];if(!e)throw new Error(`Module ${a} didn’t register its module`);return e})));self.define=(c,n)=>{const i=e||("document"in self?document.currentScript.src:"")||location.href;if(s[i])return;let t={};const r=e=>a(e,i),d={module:{uri:i},exports:t,require:r};s[i]=Promise.all(c.map((e=>d[e]||r(e)))).then((e=>(n(...e),t)))}}define(["./workbox-6a1bf588"],(function(e){"use strict";importScripts(),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/_next/static/chunks/160-ba08d75cc877a29e.js",revision:"ba08d75cc877a29e"},{url:"/_next/static/chunks/294-ca5db13106943654.js",revision:"ca5db13106943654"},{url:"/_next/static/chunks/361-6f38db1c2ffa6716.js",revision:"6f38db1c2ffa6716"},{url:"/_next/static/chunks/430-8a849648c67724a8.js",revision:"8a849648c67724a8"},{url:"/_next/static/chunks/507-4f42460fa9ecf50c.js",revision:"4f42460fa9ecf50c"},{url:"/_next/static/chunks/544-05cb2e9b161ff96c.js",revision:"05cb2e9b161ff96c"},{url:"/_next/static/chunks/548-3ce023dc656ca09c.js",revision:"3ce023dc656ca09c"},{url:"/_next/static/chunks/572-ed3b8c747717ac3c.js",revision:"ed3b8c747717ac3c"},{url:"/_next/static/chunks/617-678068d09a08a281.js",revision:"678068d09a08a281"},{url:"/_next/static/chunks/664-59d9c495d826287b.js",revision:"59d9c495d826287b"},{url:"/_next/static/chunks/694-7f41878f2b190dda.js",revision:"7f41878f2b190dda"},{url:"/_next/static/chunks/793-21672d2688b0029a.js",revision:"21672d2688b0029a"},{url:"/_next/static/chunks/802-756d8ffb450a7009.js",revision:"756d8ffb450a7009"},{url:"/_next/static/chunks/808-8b851e822b415b62.js",revision:"8b851e822b415b62"},{url:"/_next/static/chunks/964-54710b3760f30e4f.js",revision:"54710b3760f30e4f"},{url:"/_next/static/chunks/framework-fe99aa755573eedd.js",revision:"fe99aa755573eedd"},{url:"/_next/static/chunks/main-df85dd53ff6c9ad3.js",revision:"df85dd53ff6c9ad3"},{url:"/_next/static/chunks/pages/_app-8771cc7bddf2b940.js",revision:"8771cc7bddf2b940"},{url:"/_next/static/chunks/pages/_error-d0193010cb73d047.js",revision:"d0193010cb73d047"},{url:"/_next/static/chunks/pages/auth/confirm-eab32baa790b40c8.js",revision:"eab32baa790b40c8"},{url:"/_next/static/chunks/pages/auth/login-729ff2015ded7dc5.js",revision:"729ff2015ded7dc5"},{url:"/_next/static/chunks/pages/auth/lost-password-ba5d5a5998647935.js",revision:"ba5d5a5998647935"},{url:"/_next/static/chunks/pages/auth/register-9ee879ac787891fa.js",revision:"9ee879ac787891fa"},{url:"/_next/static/chunks/pages/auth/reset-05ea27d1c7233bbd.js",revision:"05ea27d1c7233bbd"},{url:"/_next/static/chunks/pages/dashboard-0fec3a2cd4dccd43.js",revision:"0fec3a2cd4dccd43"},{url:"/_next/static/chunks/pages/e/%5Buuid%5D-67ffd915cb879042.js",revision:"67ffd915cb879042"},{url:"/_next/static/chunks/pages/e/%5Buuid%5D/details-71b37b7a58e374ea.js",revision:"71b37b7a58e374ea"},{url:"/_next/static/chunks/pages/e/%5Buuid%5D/waitingList-3ad8dcd980e16d65.js",revision:"3ad8dcd980e16d65"},{url:"/_next/static/chunks/pages/index-7f6f3dbfe373e2ce.js",revision:"7f6f3dbfe373e2ce"},{url:"/_next/static/chunks/pages/profile-56ba3222e959dbd1.js",revision:"56ba3222e959dbd1"},{url:"/_next/static/chunks/polyfills-c67a75d1b6f99dc8.js",revision:"837c0df77fd5009c9e46d446188ecfd0"},{url:"/_next/static/chunks/webpack-64cd2164275196d2.js",revision:"64cd2164275196d2"},{url:"/_next/static/qTI4hCk78-5qzKN44idng/_buildManifest.js",revision:"4d519ac0fa606a04d2db17d135dd1925"},{url:"/_next/static/qTI4hCk78-5qzKN44idng/_ssgManifest.js",revision:"b6652df95db52feb4daf4eca35380933"},{url:"/assets/Caroster_Octree_Social.jpg",revision:"563fc10a4ec83e735943c5f67d417a6e"},{url:"/assets/Caroster_beta.png",revision:"28cbae33997e5762beb35b8764db228b"},{url:"/assets/Logo_in_beta.svg",revision:"cdde8d69adbfdbaf7c903e155419b12c"},{url:"/assets/android-chrome-192x192.png",revision:"b288769d936ad5f9a87944e027d0096c"},{url:"/assets/android-chrome-512x512.png",revision:"c789c009674fc4a2087a8b71c24a12b7"},{url:"/assets/apple-touch-icon.png",revision:"573a4bc22886d3ef3f6c3aa0eab64d44"},{url:"/assets/car.png",revision:"0c95a91895d437b7ea06db071aa8f68f"},{url:"/assets/favicon-16x16.png",revision:"9f98c22a36ec0001995797d29a7583b1"},{url:"/assets/favicon-32x32.png",revision:"562ff70a6694a29302644d4f85b2e920"},{url:"/assets/favicon.ico",revision:"45004f0a61722a526ca688bddc4955c4"},{url:"/assets/google-icon.svg",revision:"81ad048ed858673aaca6cc2227076b8a"},{url:"/assets/icon.png",revision:"ac122f40fd4c9fd7f1831b0dd406c950"},{url:"/assets/logo.png",revision:"d685d6b49c3aedcf4819d5cbbc873d60"},{url:"/assets/logo.svg",revision:"ac6bdc2dc62feb11a5bc8b0ad3aca84e"},{url:"/assets/site.webmanifest",revision:"053100cb84a50d2ae7f5492f7dd7f25e"},{url:"/favicon.ico",revision:"8eb6dd187ac1c4e26f8df8062bb42e09"},{url:"/manifest.json",revision:"e76480838d8eb8908456941dcb59275e"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({request:e,response:s,event:a,state:c})=>s&&"opaqueredirect"===s.type?new Response(s.body,{status:200,statusText:"OK",headers:s.headers}):s}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new e.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp3|wav|ogg)$/i,new e.CacheFirst({cacheName:"static-audio-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp4)$/i,new e.CacheFirst({cacheName:"static-video-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new e.StaleWhileRevalidate({cacheName:"next-data",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;const s=e.pathname;return!s.startsWith("/api/auth/")&&!!s.startsWith("/api/")}),new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;return!e.pathname.startsWith("/api/")}),new e.NetworkFirst({cacheName:"others",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>!(self.origin===e.origin)),new e.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600})]}),"GET")}));
