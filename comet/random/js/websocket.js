'use strict';

const websocketNumbers = document.querySelectorAll('.websocket div');

function setWebsocket(url) {
  const wss = new WebSocket(url);
  wss.addEventListener('message', e => updateClassNames(e.data, websocketNumbers));
  wss.addEventListener('error', e => {
    updateClassNames('0', websocketNumbers)
    console.error(e.message);
  });
  wss.addEventListener('close', e => {
    if (e.code === '1003') {
      console.error(`Соединение закрыто, код ${e.code}. Попытка возобновления произойдет через 1 секунду`);
      setTimeout(setWebsocket, 1000, url);
    }
  });
}

setWebsocket('wss://neto-api.herokuapp.com/comet/websocket');