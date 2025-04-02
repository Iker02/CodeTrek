
export default {
  bootstrap: () => import('./main.server.mjs').then(m => m.default),
  inlineCriticalCss: true,
  baseHref: '/code-trek-final/',
  locale: undefined,
  routes: [
  {
    "renderMode": 2,
    "route": "/code-trek-final"
  },
  {
    "renderMode": 2,
    "route": "/code-trek-final/login"
  },
  {
    "renderMode": 2,
    "route": "/code-trek-final/register"
  },
  {
    "renderMode": 2,
    "route": "/code-trek-final/catalogo"
  },
  {
    "renderMode": 2,
    "route": "/code-trek-final/course/python/level/1"
  },
  {
    "renderMode": 2,
    "route": "/code-trek-final/course/python/level/2"
  },
  {
    "renderMode": 2,
    "route": "/code-trek-final/course/python/level/3"
  },
  {
    "renderMode": 2,
    "route": "/code-trek-final/course/python/level/4"
  },
  {
    "renderMode": 2,
    "route": "/code-trek-final/course/python/level/5"
  },
  {
    "renderMode": 2,
    "route": "/code-trek-final/course/csharp/level/1"
  },
  {
    "renderMode": 2,
    "route": "/code-trek-final/course/csharp/level/2"
  },
  {
    "renderMode": 2,
    "route": "/code-trek-final/course/csharp/level/3"
  },
  {
    "renderMode": 2,
    "route": "/code-trek-final/course/csharp/level/4"
  },
  {
    "renderMode": 2,
    "route": "/code-trek-final/course/csharp/level/5"
  }
],
  entryPointToBrowserMapping: undefined,
  assets: {
    'index.csr.html': {size: 19193, hash: 'b9cd2dc33f187d58fa50b3269a07be22f19c18207c5a55e06f01146d2432cbde', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 19708, hash: '71a54192c09586a9aa842b0b61123033d7dc27e68568e9154cd9dba37c529ffc', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'login/index.html': {size: 27010, hash: '7a25c13556a117330368a3cbce120e88888a731d7e23f8fb4af57e34a1ce3444', text: () => import('./assets-chunks/login_index_html.mjs').then(m => m.default)},
    'index.html': {size: 37273, hash: '70a127ae686d107a26783b68f47044b885c848acd2005c5fc26a704b5d5afcbd', text: () => import('./assets-chunks/index_html.mjs').then(m => m.default)},
    'register/index.html': {size: 27297, hash: '1f66c7cac0d1ec884a177efeae3ec4a176065b029d903229fee076613de7b190', text: () => import('./assets-chunks/register_index_html.mjs').then(m => m.default)},
    'catalogo/index.html': {size: 28172, hash: '051251a2c11a70a5833a29e9a20b449ab4e4919b7f0678afb4b9a6ba1d38e995', text: () => import('./assets-chunks/catalogo_index_html.mjs').then(m => m.default)},
    'course/python/level/2/index.html': {size: 26063, hash: 'ea33763117e3cd32f7f2a78418b331c7d5f73b1bba9ebf1bb7a0b0db7b1972a0', text: () => import('./assets-chunks/course_python_level_2_index_html.mjs').then(m => m.default)},
    'course/python/level/1/index.html': {size: 27422, hash: '3c85b9b1b52a70016128c1161db91e916f9c40a842382adeefbfd7e3825cf847', text: () => import('./assets-chunks/course_python_level_1_index_html.mjs').then(m => m.default)},
    'course/python/level/3/index.html': {size: 26867, hash: '4b12d3b2a929af59cc4547353bcec0d74b67ce79edba8e32bf1cc2904667eec4', text: () => import('./assets-chunks/course_python_level_3_index_html.mjs').then(m => m.default)},
    'course/python/level/4/index.html': {size: 27575, hash: 'bb345b9bcaa8af0c386874c4348feb5f01f1e5add69e74751e029b949f04d5d9', text: () => import('./assets-chunks/course_python_level_4_index_html.mjs').then(m => m.default)},
    'course/csharp/level/2/index.html': {size: 26486, hash: 'f050d6927199dc5c9e165c3be722dc6262e7cd605a956e398ff31251c74068cc', text: () => import('./assets-chunks/course_csharp_level_2_index_html.mjs').then(m => m.default)},
    'course/csharp/level/1/index.html': {size: 26475, hash: '083fed7f60a10a3eb237471af1ac282cf74f56bb8e8cd10acd0617d3c99caf72', text: () => import('./assets-chunks/course_csharp_level_1_index_html.mjs').then(m => m.default)},
    'course/python/level/5/index.html': {size: 26189, hash: 'c61f4e6ed457df8b89fe3fc4dc3a065fc10ad5e4142cff4434dcef9d93a3d9d2', text: () => import('./assets-chunks/course_python_level_5_index_html.mjs').then(m => m.default)},
    'course/csharp/level/5/index.html': {size: 26216, hash: 'a3ab23f3a3b20f74e9d5fa6e8ee9ef373a628f8b22877f24d731f28012d84aac', text: () => import('./assets-chunks/course_csharp_level_5_index_html.mjs').then(m => m.default)},
    'course/csharp/level/4/index.html': {size: 26708, hash: 'e9dac4a3d3914720934a7f16247e1a75cbf6da29e88ef5f16d71d3e6daaf1a11', text: () => import('./assets-chunks/course_csharp_level_4_index_html.mjs').then(m => m.default)},
    'course/csharp/level/3/index.html': {size: 26653, hash: '71f8353115033ad440f31b2d51924e927f8d5449f2c254151bceb2d0e67508ec', text: () => import('./assets-chunks/course_csharp_level_3_index_html.mjs').then(m => m.default)},
    'styles-5INURTSO.css': {size: 0, hash: 'menYUTfbRu8', text: () => import('./assets-chunks/styles-5INURTSO_css.mjs').then(m => m.default)}
  },
};
