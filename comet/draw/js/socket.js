'use strict';

const wss = new WebSocket('wss://neto-api.herokuapp.com/draw');
wss.addEventListener('error', e => {
  console.error(e.data);
});
wss.addEventListener('close', e => {
  console.log(`${e.code} Websocket-соединение закрыто, причина - ${e.reason}`);
});
wss.addEventListener('message', e => {
  console.log(e.data);
});

//почему отправка blob работает, а ArrayBuffer - нет?
window.editor.addEventListener('update', e => {
  // const ctx = e.canvas.getContext('2d');
  // const image = ctx.getImageData(0, 0, e.canvas.width, e.canvas.height);
  // const binary = Uint8Array.from(image.data);
  // wss.send(binary.buffer);

  e.canvas.toBlob(blob => wss.send(blob));
});
