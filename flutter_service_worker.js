'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';

const RESOURCES = {"assets/AssetManifest.bin": "e1cfd95d998dae878d3a9a3c545f8f0f",
"assets/AssetManifest.json": "5b4e2cba27e17127c76f94e5cac17bb6",
"assets/assets/icons/add%2520poster.svg": "a30e4e876b30b2fc73a37d2688958323",
"assets/assets/icons/Documents.svg": "0d66436fde3818811c82319665ef91fd",
"assets/assets/icons/doc_file.svg": "c6c3abe38f2b4e22ab33399b26966b1f",
"assets/assets/icons/drop_box.svg": "d427e188a7aee4612446d0e9d26e76f1",
"assets/assets/icons/editdate.svg": "c0442c4f727875748c727c4809bfc102",
"assets/assets/icons/excel_file.svg": "9986607c30659e3d222f9908141884f9",
"assets/assets/icons/Figma_file.svg": "90224db6835092a278153e0f60e8c203",
"assets/assets/icons/folder.svg": "8c11f522cd36f0cbd9c02eb2b689cbb9",
"assets/assets/icons/google_drive.svg": "a4cd4325c28cee54264a4942fcf6ef48",
"assets/assets/icons/logo.svg": "6194acb4fae31a2a2ee26ff61d8c644e",
"assets/assets/icons/media.svg": "e790cb1d2138f7a9d1b404abf8346eb1",
"assets/assets/icons/media_file.svg": "5b8f2b094278f5d9378bca249cf80fc1",
"assets/assets/icons/menu_dashboard.svg": "5e8d164243b3e28c22a8a5e35719c96e",
"assets/assets/icons/menu_doc.svg": "c5a576281e34f54d9e041410d002443c",
"assets/assets/icons/menu_notification.svg": "f49436dd0acd00dc43ab287c7ac3ff4f",
"assets/assets/icons/menu_profile.svg": "134c2274ffaca9441fe7523b2f476608",
"assets/assets/icons/menu_setting.svg": "32ab0402dc07a66d078c758ddb0aa798",
"assets/assets/icons/menu_store.svg": "45f31f1388616a22053ea6a99ed5904a",
"assets/assets/icons/menu_task.svg": "fa731cbcb073759bd82c699331ef7e93",
"assets/assets/icons/menu_tran.svg": "acdaeac5ea677c4a479a1d656ea3d5c1",
"assets/assets/icons/one_drive.svg": "0b0ca635ef35ec9beebb18aaf20cd5d9",
"assets/assets/icons/pdf_file.svg": "4ea6d2b9e631ee54164987b57fa240c7",
"assets/assets/icons/result.svg": "046110c254847ff5a3109f9cba4a799c",
"assets/assets/icons/Search.svg": "82ad5e39b306dc6a42809cbeef651e64",
"assets/assets/icons/sound_file.svg": "d346e8558ced623138787011e0ca7e88",
"assets/assets/icons/unknown.svg": "2fc91e195e7a0d6279c01552403c3b89",
"assets/assets/icons/xd_file.svg": "fd95a4cd96e6c7251ebeac76b7b7c8b9",
"assets/assets/images/headLogo.png": "5119dbd12e786b27bac99ff3dfe37b10",
"assets/assets/images/logo.png": "5315be9d0a7602fb12a0ad4c2e3006e9",
"assets/assets/images/profile_pic.png": "5f56c3070f1c066ae15ecad12fb44f54",
"assets/FontManifest.json": "dc3d03800ccca4601324923c0b1d6d57",
"assets/fonts/MaterialIcons-Regular.otf": "6e3a45b300b0c0f6ba5d30507cc147bb",
"assets/loading.gif": "7a63480a257cdcc94fea9fa407908cbf",
"assets/NOTICES": "f1ec755d50bbd12d263799c9f5100d18",
"assets/packages/cupertino_icons/assets/CupertinoIcons.ttf": "57d849d738900cfd590e9adc7e208250",
"assets/shaders/ink_sparkle.frag": "f8b80e740d33eb157090be4e995febdf",
"canvaskit/canvaskit.js": "76f7d822f42397160c5dfc69cbc9b2de",
"canvaskit/canvaskit.wasm": "f48eaf57cada79163ec6dec7929486ea",
"canvaskit/chromium/canvaskit.js": "8c8392ce4a4364cbb240aa09b5652e05",
"canvaskit/chromium/canvaskit.wasm": "fc18c3010856029414b70cae1afc5cd9",
"canvaskit/skwasm.js": "1df4d741f441fa1a4d10530ced463ef8",
"canvaskit/skwasm.wasm": "6711032e17bf49924b2b001cef0d3ea3",
"canvaskit/skwasm.worker.js": "19659053a277272607529ef87acf9d8a",
"favicon.png": "5dcef449791fa27946b3d35ad8803796",
"flutter.js": "6b515e434cea20006b3ef1726d2c8894",
"icons/Icon-192.png": "ac9a721a12bbc803b44f645561ecb1e1",
"icons/Icon-512.png": "96e752610906ba2a93c65f8abe1645f1",
"index.html": "a6c74afabf758acea1a2faceac6e6c7e",
"/": "a6c74afabf758acea1a2faceac6e6c7e",
"main.dart.js": "f95b52c9c9a828efe300a41886e2f4a3",
"manifest.json": "eb0967c213ff3e1cc1170c85fc8b5515",
"version.json": "e9eb58db72d407be27e9fa052224c304"};
// The application shell files that are downloaded before a service worker can
// start.
const CORE = ["main.dart.js",
"index.html",
"assets/AssetManifest.json",
"assets/FontManifest.json"];

// During install, the TEMP cache is populated with the application shell files.
self.addEventListener("install", (event) => {
  self.skipWaiting();
  return event.waitUntil(
    caches.open(TEMP).then((cache) => {
      return cache.addAll(
        CORE.map((value) => new Request(value, {'cache': 'reload'})));
    })
  );
});
// During activate, the cache is populated with the temp files downloaded in
// install. If this service worker is upgrading from one with a saved
// MANIFEST, then use this to retain unchanged resource files.
self.addEventListener("activate", function(event) {
  return event.waitUntil(async function() {
    try {
      var contentCache = await caches.open(CACHE_NAME);
      var tempCache = await caches.open(TEMP);
      var manifestCache = await caches.open(MANIFEST);
      var manifest = await manifestCache.match('manifest');
      // When there is no prior manifest, clear the entire cache.
      if (!manifest) {
        await caches.delete(CACHE_NAME);
        contentCache = await caches.open(CACHE_NAME);
        for (var request of await tempCache.keys()) {
          var response = await tempCache.match(request);
          await contentCache.put(request, response);
        }
        await caches.delete(TEMP);
        // Save the manifest to make future upgrades efficient.
        await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
        // Claim client to enable caching on first launch
        self.clients.claim();
        return;
      }
      var oldManifest = await manifest.json();
      var origin = self.location.origin;
      for (var request of await contentCache.keys()) {
        var key = request.url.substring(origin.length + 1);
        if (key == "") {
          key = "/";
        }
        // If a resource from the old manifest is not in the new cache, or if
        // the MD5 sum has changed, delete it. Otherwise the resource is left
        // in the cache and can be reused by the new service worker.
        if (!RESOURCES[key] || RESOURCES[key] != oldManifest[key]) {
          await contentCache.delete(request);
        }
      }
      // Populate the cache with the app shell TEMP files, potentially overwriting
      // cache files preserved above.
      for (var request of await tempCache.keys()) {
        var response = await tempCache.match(request);
        await contentCache.put(request, response);
      }
      await caches.delete(TEMP);
      // Save the manifest to make future upgrades efficient.
      await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
      // Claim client to enable caching on first launch
      self.clients.claim();
      return;
    } catch (err) {
      // On an unhandled exception the state of the cache cannot be guaranteed.
      console.error('Failed to upgrade service worker: ' + err);
      await caches.delete(CACHE_NAME);
      await caches.delete(TEMP);
      await caches.delete(MANIFEST);
    }
  }());
});
// The fetch handler redirects requests for RESOURCE files to the service
// worker cache.
self.addEventListener("fetch", (event) => {
  if (event.request.method !== 'GET') {
    return;
  }
  var origin = self.location.origin;
  var key = event.request.url.substring(origin.length + 1);
  // Redirect URLs to the index.html
  if (key.indexOf('?v=') != -1) {
    key = key.split('?v=')[0];
  }
  if (event.request.url == origin || event.request.url.startsWith(origin + '/#') || key == '') {
    key = '/';
  }
  // If the URL is not the RESOURCE list then return to signal that the
  // browser should take over.
  if (!RESOURCES[key]) {
    return;
  }
  // If the URL is the index.html, perform an online-first request.
  if (key == '/') {
    return onlineFirst(event);
  }
  event.respondWith(caches.open(CACHE_NAME)
    .then((cache) =>  {
      return cache.match(event.request).then((response) => {
        // Either respond with the cached resource, or perform a fetch and
        // lazily populate the cache only if the resource was successfully fetched.
        return response || fetch(event.request).then((response) => {
          if (response && Boolean(response.ok)) {
            cache.put(event.request, response.clone());
          }
          return response;
        });
      })
    })
  );
});
self.addEventListener('message', (event) => {
  // SkipWaiting can be used to immediately activate a waiting service worker.
  // This will also require a page refresh triggered by the main worker.
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
    return;
  }
  if (event.data === 'downloadOffline') {
    downloadOffline();
    return;
  }
});
// Download offline will check the RESOURCES for all files not in the cache
// and populate them.
async function downloadOffline() {
  var resources = [];
  var contentCache = await caches.open(CACHE_NAME);
  var currentContent = {};
  for (var request of await contentCache.keys()) {
    var key = request.url.substring(origin.length + 1);
    if (key == "") {
      key = "/";
    }
    currentContent[key] = true;
  }
  for (var resourceKey of Object.keys(RESOURCES)) {
    if (!currentContent[resourceKey]) {
      resources.push(resourceKey);
    }
  }
  return contentCache.addAll(resources);
}
// Attempt to download the resource online before falling back to
// the offline cache.
function onlineFirst(event) {
  return event.respondWith(
    fetch(event.request).then((response) => {
      return caches.open(CACHE_NAME).then((cache) => {
        cache.put(event.request, response.clone());
        return response;
      });
    }).catch((error) => {
      return caches.open(CACHE_NAME).then((cache) => {
        return cache.match(event.request).then((response) => {
          if (response != null) {
            return response;
          }
          throw error;
        });
      });
    })
  );
}
