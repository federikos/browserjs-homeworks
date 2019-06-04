'use strict';

const currentPhoto = document.querySelector('#currentPhoto');
const prevBtn = document.querySelector('#prevPhoto');
const nextBtn = document.querySelector('#nextPhoto');
const imgs = [
  'i/breuer-building.jpg',
  'i/guggenheim-museum.jpg',
  'i/headquarters.jpg',
  'i/IAC.jpg',
  'i/new-museum.jpg',
];
let i = 0;
const lastI = imgs.length - 1;

const changeImgAttributes = (index) => {
  currentPhoto.setAttribute('src', imgs[index]);
  currentPhoto.setAttribute(
    'alt', imgs[index]
      .split('')
      .splice(2, (imgs[index].length - 6))
      .join(''),
  );
};

const prevBtnClickHandler = () => {
  if (i === 0) {
    i = lastI;
  } else {
    i--;
  }
  changeImgAttributes(i);
};

const nextBtnClickHandler = () => {
  if (i === lastI) {
    i = 0;
  } else {
    i++;
  }
  changeImgAttributes(i);
};

prevBtn.addEventListener('click', prevBtnClickHandler);
nextBtn.addEventListener('click', nextBtnClickHandler);

document.addEventListener("DOMContentLoaded", changeImgAttributes(0));
