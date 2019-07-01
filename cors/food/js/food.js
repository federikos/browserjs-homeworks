'use strict';
const body = document.querySelector('body');
const dataPic = document.querySelector('[data-pic]');
const dataTitle = document.querySelector('[data-title]');
const dataIngredi = document.querySelector('[data-ingredients]');
const dataRating = document.querySelector('[data-rating]');
const dataStar = document.querySelector('[data-star]');
const dataVotes = document.querySelector('[data-votes]');
const dataConsumers = document.querySelector('[data-consumers]');

function appendScript(src) {
  const script = document.createElement('script');
  script.src = src;
  body.appendChild(script);
}

function createUser(src, title) {
  const img = document.createElement('img');
  img.src = src;
  img.title = title;
  return img;
}

function applyRecipeData(data) {
  dataPic.setAttribute('style', `background-image: url(${data.pic})`);
  dataTitle.innerText = data.title;
  dataIngredi.innerText = data.ingredients.join(', ');
}

function applyRatingData(data) {
  dataRating.innerText = data.rating.toFixed(2);
  dataStar.setAttribute('style', `width: ${data.rating * 10}%`);
  dataVotes.innerText = `(${data.votes} оценок)`;
}

function applyConsumersData(data) {

  for (const consumer of data.consumers) {
    dataConsumers.appendChild(createUser(consumer.pic, consumer.name));
  }

  const span = document.createElement('span');
  span.innerText = `(+${data.total})`;
  dataConsumers.appendChild(span);
}

const urls = [
  'https://neto-api.herokuapp.com/food/42?callback=applyRecipeData',
  'https://neto-api.herokuapp.com/food/42/rating?callback=applyRatingData',
  'https://neto-api.herokuapp.com/food/42/consumers?callback=applyConsumersData'
];

for (const url of urls) {
  appendScript(url);
}
