'use strict';

function getMsgTime() {
  const date = new Date();
  let hours = date.getHours().toString();
  hours = hours.length > 1 ? hours : `0${hours}`;
  let minutes = date.getMinutes().toString();
  minutes = minutes.length > 1 ? minutes : `0${minutes}`;
  return `${hours}:${minutes}`;
}

document.addEventListener('DOMContentLoaded', () => {
  const chat = document.querySelector('.chat');
  const msgBox = chat.querySelector('.message-box');
  const msgInput = chat.querySelector('.message-input');
  const msgSubmit = chat.querySelector('.message-submit');
  const msgsContent = chat.querySelector('.messages-content');
  const chatStatus = chat.querySelector('.chat-status');
  const msgsTemplates = chat.querySelector('.messages-templates');
  const loading = chat.querySelector('.loading');
  const msgPersonal = chat.querySelector('.message-personal');
  const msgStatus = chat.querySelector('.message-status');
  const msg = msgsTemplates.firstElementChild.nextElementSibling;

  function displayConnectStatus(state) {
    chatStatus.innerText = chatStatus.dataset[state];
    const status = msgStatus.cloneNode(true);
  
    switch(state) {
      case 'online':
        msgSubmit.removeAttribute('disabled');
        status.innerText = 'Пользователь появился в сети';
        break;
      case 'offline':
        msgSubmit.setAttribute('disabled', '');
        status.innerText = 'Пользователь не в сети';
        break;
    }
    
    msgsContent.appendChild(status);
  }

  const connect = new WebSocket('wss://neto-api.herokuapp.com/chat');
  
  connect.addEventListener('open', event => {
    displayConnectStatus('online');
  });

  connect.addEventListener('close', event => {
    displayConnectStatus('offline');
  });

  connect.addEventListener('message', event => {
    if (msgsContent.lastElementChild.classList.contains('loading')) {
      msgsContent.removeChild(msgsContent.lastElementChild);
    }

    if (event.data == '...') {
      //Никогда не срабатывает :(
      const currentLoading = loading.cloneNode(true);
      msgsContent.appendChild(currentLoading);
    } else {
      const currentMsg = msg.cloneNode(true);
      const timestamp = currentMsg.querySelector('.timestamp');
      currentMsg.querySelector('span').innerText = event.data;
      timestamp.innerText = getMsgTime();
      msgsContent.appendChild(currentMsg);
    };
  });

  msgBox.addEventListener('submit', event => {
    event.preventDefault();
    connect.send(msgInput.value);
    const currentMsgPersonal = msgPersonal.cloneNode(true);
    currentMsgPersonal.firstElementChild.innerText = msgInput.value;
    msgInput.value = '';
    const timestamp = currentMsgPersonal.querySelector('.timestamp');
    timestamp.innerText = getMsgTime();
    msgsContent.appendChild(currentMsgPersonal);
  });

  connect.addEventListener('error', error => {
    console.error(error.data);
});

  window.addEventListener('beforeunload', () => {
    connect.close(1000, 'Window has been closed');
  });
} );