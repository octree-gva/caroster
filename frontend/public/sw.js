if(!self.define){const e=e=>{"require"!==e&&(e+=".js");let s=Promise.resolve();return n[e]||(s=new Promise((async s=>{if("document"in self){const n=document.createElement("script");n.src=e,document.head.appendChild(n),n.onload=s}else importScripts(e),s()}))),s.then((()=>{if(!n[e])throw new Error(`Module ${e} didn’t register its module`);return n[e]}))},s=(s,n)=>{Promise.all(s.map(e)).then((e=>n(1===e.length?e[0]:e)))},n={require:Promise.resolve(s)};self.define=(s,a,t)=>{n[s]||(n[s]=Promise.resolve().then((()=>{let n={};const c={uri:location.origin+s.slice(1)};return Promise.all(a.map((s=>{switch(s){case"exports":return n;case"module":return c;default:return e(s)}}))).then((e=>{const s=t(...e);return n.default||(n.default=s),n}))})))}}define("./sw.js",["./workbox-ea903bce"],(function(e){"use strict";importScripts(),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/_next/static/85nz_qufRpLHHj-H4oCY5/_buildManifest.js",revision:"85nz_qufRpLHHj-H4oCY5"},{url:"/_next/static/85nz_qufRpLHHj-H4oCY5/_ssgManifest.js",revision:"85nz_qufRpLHHj-H4oCY5"},{url:"/_next/static/chunks/413-9fc97176575377d8c5cb.js",revision:"85nz_qufRpLHHj-H4oCY5"},{url:"/_next/static/chunks/413-9fc97176575377d8c5cb.js.map",revision:"85nz_qufRpLHHj-H4oCY5"},{url:"/_next/static/chunks/418-6cc84eb981a323cb6c06.js",revision:"85nz_qufRpLHHj-H4oCY5"},{url:"/_next/static/chunks/418-6cc84eb981a323cb6c06.js.map",revision:"85nz_qufRpLHHj-H4oCY5"},{url:"/_next/static/chunks/501-2ca3e0e056d2c58ebc0e.js",revision:"85nz_qufRpLHHj-H4oCY5"},{url:"/_next/static/chunks/501-2ca3e0e056d2c58ebc0e.js.map",revision:"85nz_qufRpLHHj-H4oCY5"},{url:"/_next/static/chunks/506-ebd4f195ec3d9ddffd42.js",revision:"85nz_qufRpLHHj-H4oCY5"},{url:"/_next/static/chunks/506-ebd4f195ec3d9ddffd42.js.map",revision:"85nz_qufRpLHHj-H4oCY5"},{url:"/_next/static/chunks/51-7a9ade5b4c990801cc14.js",revision:"85nz_qufRpLHHj-H4oCY5"},{url:"/_next/static/chunks/51-7a9ade5b4c990801cc14.js.map",revision:"85nz_qufRpLHHj-H4oCY5"},{url:"/_next/static/chunks/654-f653a6a06eb1cd76d5db.js",revision:"85nz_qufRpLHHj-H4oCY5"},{url:"/_next/static/chunks/654-f653a6a06eb1cd76d5db.js.map",revision:"85nz_qufRpLHHj-H4oCY5"},{url:"/_next/static/chunks/925-b58e0ca3a44b38a8777c.js",revision:"85nz_qufRpLHHj-H4oCY5"},{url:"/_next/static/chunks/925-b58e0ca3a44b38a8777c.js.map",revision:"85nz_qufRpLHHj-H4oCY5"},{url:"/_next/static/chunks/framework-09a88f8e6a8ced89af74.js",revision:"85nz_qufRpLHHj-H4oCY5"},{url:"/_next/static/chunks/framework-09a88f8e6a8ced89af74.js.map",revision:"85nz_qufRpLHHj-H4oCY5"},{url:"/_next/static/chunks/main-29a64400a3155e7a312c.js",revision:"85nz_qufRpLHHj-H4oCY5"},{url:"/_next/static/chunks/main-29a64400a3155e7a312c.js.map",revision:"85nz_qufRpLHHj-H4oCY5"},{url:"/_next/static/chunks/pages/_app-901ef8cfad559dab4112.js",revision:"85nz_qufRpLHHj-H4oCY5"},{url:"/_next/static/chunks/pages/_app-901ef8cfad559dab4112.js.map",revision:"85nz_qufRpLHHj-H4oCY5"},{url:"/_next/static/chunks/pages/_error-3348a922a0331ed04840.js",revision:"85nz_qufRpLHHj-H4oCY5"},{url:"/_next/static/chunks/pages/_error-3348a922a0331ed04840.js.map",revision:"85nz_qufRpLHHj-H4oCY5"},{url:"/_next/static/chunks/pages/auth/confirm-f4f5aa7cc4c1b6c4cd78.js",revision:"85nz_qufRpLHHj-H4oCY5"},{url:"/_next/static/chunks/pages/auth/confirm-f4f5aa7cc4c1b6c4cd78.js.map",revision:"85nz_qufRpLHHj-H4oCY5"},{url:"/_next/static/chunks/pages/auth/login-d3b5ba38709ccf6ecd7e.js",revision:"85nz_qufRpLHHj-H4oCY5"},{url:"/_next/static/chunks/pages/auth/login-d3b5ba38709ccf6ecd7e.js.map",revision:"85nz_qufRpLHHj-H4oCY5"},{url:"/_next/static/chunks/pages/auth/lost-password-4e059d60aca80bbf161e.js",revision:"85nz_qufRpLHHj-H4oCY5"},{url:"/_next/static/chunks/pages/auth/lost-password-4e059d60aca80bbf161e.js.map",revision:"85nz_qufRpLHHj-H4oCY5"},{url:"/_next/static/chunks/pages/auth/register-809eff91943d824ad339.js",revision:"85nz_qufRpLHHj-H4oCY5"},{url:"/_next/static/chunks/pages/auth/register-809eff91943d824ad339.js.map",revision:"85nz_qufRpLHHj-H4oCY5"},{url:"/_next/static/chunks/pages/auth/reset-90a10a2b4644f9ef15cb.js",revision:"85nz_qufRpLHHj-H4oCY5"},{url:"/_next/static/chunks/pages/auth/reset-90a10a2b4644f9ef15cb.js.map",revision:"85nz_qufRpLHHj-H4oCY5"},{url:"/_next/static/chunks/pages/dashboard-c9947896d75079dcb89a.js",revision:"85nz_qufRpLHHj-H4oCY5"},{url:"/_next/static/chunks/pages/dashboard-c9947896d75079dcb89a.js.map",revision:"85nz_qufRpLHHj-H4oCY5"},{url:"/_next/static/chunks/pages/e/%5Buuid%5D-497857d7ab528f3309ac.js",revision:"85nz_qufRpLHHj-H4oCY5"},{url:"/_next/static/chunks/pages/e/%5Buuid%5D-497857d7ab528f3309ac.js.map",revision:"85nz_qufRpLHHj-H4oCY5"},{url:"/_next/static/chunks/pages/index-2761996c414f5f16e2ba.js",revision:"85nz_qufRpLHHj-H4oCY5"},{url:"/_next/static/chunks/pages/index-2761996c414f5f16e2ba.js.map",revision:"85nz_qufRpLHHj-H4oCY5"},{url:"/_next/static/chunks/pages/profile-e438bcc473d593419ef6.js",revision:"85nz_qufRpLHHj-H4oCY5"},{url:"/_next/static/chunks/pages/profile-e438bcc473d593419ef6.js.map",revision:"85nz_qufRpLHHj-H4oCY5"},{url:"/_next/static/chunks/polyfills-89b2a8f84ce411a0b95b.js",revision:"85nz_qufRpLHHj-H4oCY5"},{url:"/_next/static/chunks/polyfills-89b2a8f84ce411a0b95b.js.map",revision:"85nz_qufRpLHHj-H4oCY5"},{url:"/_next/static/chunks/webpack-1fe9559839a2b80690de.js",revision:"85nz_qufRpLHHj-H4oCY5"},{url:"/_next/static/chunks/webpack-1fe9559839a2b80690de.js.map",revision:"85nz_qufRpLHHj-H4oCY5"},{url:"/assets/Caroster_Octree_Social.jpg",revision:"563fc10a4ec83e735943c5f67d417a6e"},{url:"/assets/android-chrome-192x192.png",revision:"b288769d936ad5f9a87944e027d0096c"},{url:"/assets/android-chrome-512x512.png",revision:"c789c009674fc4a2087a8b71c24a12b7"},{url:"/assets/apple-touch-icon.png",revision:"573a4bc22886d3ef3f6c3aa0eab64d44"},{url:"/assets/favicon-16x16.png",revision:"9f98c22a36ec0001995797d29a7583b1"},{url:"/assets/favicon-32x32.png",revision:"562ff70a6694a29302644d4f85b2e920"},{url:"/assets/favicon.ico",revision:"45004f0a61722a526ca688bddc4955c4"},{url:"/assets/google-icon.svg",revision:"81ad048ed858673aaca6cc2227076b8a"},{url:"/assets/icon.png",revision:"ac122f40fd4c9fd7f1831b0dd406c950"},{url:"/assets/logo.png",revision:"d685d6b49c3aedcf4819d5cbbc873d60"},{url:"/assets/logo.svg",revision:"ac6bdc2dc62feb11a5bc8b0ad3aca84e"},{url:"/assets/site.webmanifest",revision:"053100cb84a50d2ae7f5492f7dd7f25e"},{url:"/favicon.ico",revision:"8eb6dd187ac1c4e26f8df8062bb42e09"},{url:"/manifest.json",revision:"e76480838d8eb8908456941dcb59275e"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({request:e,response:s,event:n,state:a})=>s&&"opaqueredirect"===s.type?new Response(s.body,{status:200,statusText:"OK",headers:s.headers}):s}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis|gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\.(?:mp3|mp4)$/i,new e.StaleWhileRevalidate({cacheName:"static-media-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new e.StaleWhileRevalidate({cacheName:"next-data",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;const s=e.pathname;return!s.startsWith("/api/auth/")&&!!s.startsWith("/api/")}),new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;return!e.pathname.startsWith("/api/")}),new e.NetworkFirst({cacheName:"others",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET")}));
//# sourceMappingURL=sw.js.map
