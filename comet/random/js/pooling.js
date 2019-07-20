'use strict';
const pollingNumbers = document.querySelectorAll('.pooling div');

function updateClassNames(n, numbers) {
  [...numbers].map(number => {
    number.classList.remove('flip-it');
    return number;
  })
  .filter(number => number.textContent === n)
  .forEach(number => number.classList.add('flip-it'))
}

function getFetchResponse() {
  const socket = 
    fetch('https://neto-api.herokuapp.com/comet/pooling')
    .then(res => res.text())
    .then(num => updateClassNames(num, pollingNumbers))
};

setInterval(getFetchResponse, 5000);