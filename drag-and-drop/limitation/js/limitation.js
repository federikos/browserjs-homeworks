const delay = 2000;

function debounce(callback, delay) {
  let timeout;
  return () => {
    clearTimeout(timeout);
    timeout = setTimeout(function() {
      timeout = null;
      callback();
    }, delay); //delay shouldn't be more than delay for debounce
  };
}

function throttle(callback) {
  let isWaiting = false;
  return function() {
    if(!isWaiting) {
      callback.apply(this, arguments);
      isWaiting = true;
      setTimeout(() => {
        isWaiting = false
      }, 1999);
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const textarea = document.querySelector('.textarea');
  const block = document.querySelector('.block');
  const message = document.querySelector('.message');

  function tease() {
    message.classList.add('view');
    block.classList.remove('active');
  }

  function leaveAlone() {
    block.classList.add('active');
    message.classList.remove('view');
  }
  
  textarea.addEventListener('input', throttle(leaveAlone));
  textarea.addEventListener('input', debounce(tease, delay));
});