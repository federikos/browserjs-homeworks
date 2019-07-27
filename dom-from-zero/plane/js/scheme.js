'use strict'

const acSelect = document.getElementById('acSelect');
const btnSeatMap = document.getElementById('btnSeatMap');
const btnSetFull = document.getElementById('btnSetFull');
const btnSetEmpty = document.getElementById('btnSetEmpty');
const seatMapDiv = document.getElementById('seatMapDiv');
const seatMapTitle = document.getElementById('seatMapTitle');
const totalPax = document.getElementById('totalPax');
const totalAdult = document.getElementById('totalAdult');
const totalHalf = document.getElementById('totalHalf');
btnSetFull.setAttribute('disabled', '');
btnSetEmpty.setAttribute('disabled', '');

function createEl(name, classNames, children) {
  const el = document.createElement(name);
  if (classNames instanceof Array) {
    classNames.forEach(className => el.classList.add(className));
  }
  if (typeof classNames === 'string' && classNames !== '') {
    el.classList.add(classNames);
  }
  if (children instanceof Array) {
    children.forEach(child => el.appendChild(child));
  }
  if (typeof children === 'string' || typeof children === 'number') {
    el.textContent = children;
  }
  return el;
}

function createRow(n, rowLetters) {
  const firstLetterGroup = [];
  const secondLetterGroup = [];
  
  for (let i = 0; i < 3; i++) {
    const seatClass = rowLetters[i] ? 'seat' : 'no-seat';
    const seatLabelText = rowLetters[i] || '';
    firstLetterGroup.push(
      createEl('div', ['col-xs-4', seatClass], [
        createEl('span', 'seat-label', seatLabelText)
      ])
    );
  }

  for (let i = 3; i <= rowLetters.length - 1; i++) {
    const seatClass = rowLetters[i] ? 'seat' : 'no-seat';
    const seatLabelText = rowLetters[i] || '';
    secondLetterGroup.push(
      createEl('div', ['col-xs-4', seatClass], [
      createEl('span', 'seat-label', seatLabelText)
      ])
    );
  }

  let row = createEl('div', ['row', 'seating-row', 'text-center'], [
    createEl('div', ['col-xs-1', 'row-number'], [
      createEl('h2', '', n)
    ]),
    createEl('div', 'col-xs-5', firstLetterGroup),
    createEl('div', 'col-xs-5', secondLetterGroup),
  ]);

  return row;
}

function applyScheme(planeId) {
  fetch(`https://neto-api.herokuapp.com/plane/${planeId}`)
    .then(res => res.json())
    .then(data => {
      console.log(data);
      btnSetFull.removeAttribute('disabled');
      btnSetEmpty.removeAttribute('disabled');
      seatMapDiv.textContent = '';
      seatMapTitle.textContent = `${data.title} (${data.passengers} пассажиров)`;
      [...data.scheme].forEach((num, i) => {
        let rowLetters;
        switch(num) {
          case 6:
            rowLetters = data.letters6;
            break;
          case 4:
            rowLetters = data.letters4;
            break;
          default:
            rowLetters = [0, 0, 0, 0, 0, 0]
        }
        
        seatMapDiv.appendChild(
          createRow(i + 1, rowLetters)
        );
      });
      [...seatMapDiv.querySelectorAll('div.seat')].forEach(seat => {
        seat.addEventListener('click', handleBookingChange);
      });
    });
}

function updateCounter(counter, operation) {
  if(counter.textContent === 'XXX') {
    counter.textContent = 0;
  }
  if(operation === '+') {
    counter.textContent = parseInt(counter.textContent) + 1;
    return;
  }
  if(operation === '-') {
    counter.textContent = parseInt(counter.textContent) - 1;
  }
}

function handleBookingChange(e) {
  if (e.currentTarget.classList.contains('half')) {
      e.currentTarget.classList.remove('half');
      updateCounter(totalPax, '-');
      updateCounter(totalHalf, '-');
      return;
  }
  if (e.currentTarget.classList.contains('adult')) {
    e.currentTarget.classList.remove('adult');
    updateCounter(totalPax, '-');
    updateCounter(totalAdult, '-');
    return;
  }
  if(e.altKey) {
    e.currentTarget.classList.add('half');
    updateCounter(totalPax, '+');
    updateCounter(totalHalf, '+');
    return;
  }
  e.currentTarget.classList.add('adult');
  updateCounter(totalPax, '+');
  updateCounter(totalAdult, '+');
}

btnSeatMap.addEventListener('click', e => {
  e.preventDefault();
  applyScheme(acSelect.value);
  [totalPax, totalAdult, totalHalf].forEach(counter => counter.textContent = 0);
});

btnSetFull.addEventListener('click', e => {
  e.preventDefault();
  [...seatMapDiv.querySelectorAll('div.seat')].forEach(div => {
    if(!div.classList.contains('adult') && !div.classList.contains('half')) {
      div.classList.add('adult');
      updateCounter(totalPax, '+');
      updateCounter(totalAdult, '+');
    }
  });
});

btnSetEmpty.addEventListener('click', e => {
  e.preventDefault();
  [...seatMapDiv.querySelectorAll('div.seat')].forEach(div => {
    div.classList.remove('adult', 'half');
    [totalPax, totalAdult, totalHalf].forEach(counter => counter.textContent = 0);
  });
});