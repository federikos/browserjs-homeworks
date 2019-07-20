'use strict';

const longPollingNumbers = document.querySelectorAll('.long-pooling div');

function setLongPolling(url) {
  const xhr = new XMLHttpRequest();
  xhr.addEventListener('readystatechange', e => {
    if (e.currentTarget.readyState !== 4) {
      return;
    }
    if (e.currentTarget.status >= 200 && e.currentTarget.status < 300) {
      updateClassNames(parseInt(e.currentTarget.responseText).toString(), longPollingNumbers);
    }
    setLongPolling(url);
  });

  xhr.open('GET', url);
  xhr.send();
}

setLongPolling('https://neto-api.herokuapp.com/comet/long-pooling');