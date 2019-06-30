'use strict';

const dataName = document.querySelector('[data-name]');
const dataDescription = document.querySelector('[data-description]');
const dataPic = document.querySelector('[data-pic]');
const dataPosition = document.querySelector('[data-position]');
const dataTechnologies = document.querySelector('[data-technologies]');
const dataFollowing = document.querySelector('[data-following]');
const content = document.querySelector('.content');

function appendScript(src) {
  const script = document.createElement('script');
  script.src = src;
  body.appendChild(script);
}

function createBage(technology) {
  const bage = document.createElement('span');
  bage.classList.add('devicons');
  bage.classList.add(`devicons-${technology}`);
  return bage;
}

function getTechnologies(techs) {
  for (const name of techs) {
    const tech = createBage(name); 
    dataTechnologies.appendChild(tech);
  };
}

const body = document.querySelector('body');
appendScript('https://neto-api.herokuapp.com/profile/me?callback=createProfile');

function createProfile(data) {
  appendScript(`https://neto-api.herokuapp.com/profile/${data.id}/technologies?callback=getTechnologies`);
  dataName.innerText = data.name;
  dataDescription.innerText = data.description;
  dataPic.src = data.pic;
  dataPosition.innerText = data.position;
};

window.addEventListener('load', () => {
  console.log(content);
  content.setAttribute('style', 'display: initial');
})