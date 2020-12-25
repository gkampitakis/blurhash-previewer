// eslint-disable-next-line no-restricted-globals
const ctx = self;
const { encode } = require('blurhash');

ctx.addEventListener("message", (event) => {
  const { payload } = event.data;
  const hash = encode(payload.data, payload.width, payload.height, payload.componentX, payload.componentY);
  ctx.postMessage({ hash });
});
