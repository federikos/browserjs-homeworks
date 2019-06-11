'use strict';

const nav = document.querySelector('nav');
const secret = document.querySelector('.secret');

document.addEventListener('keydown', (event) => {
    if (event.altKey && 
        event.ctrlKey &&
        (event.code === 'KeyT')) {
        nav.classList.toggle('visible');
    }
});

let secretWord = ['KeyY', 'KeyT', 'KeyN', 'KeyJ', 'KeyK', 'KeyJ', 'KeyU', 'KeyB', 'KeyZ'];
let i = 0;

document.addEventListener('keydown', (event) => {
    
    if(event.code !== secretWord[i]) {
        i = (event.code === secretWord[0]) ? 1 : 0;
        return;
    }

    i++;

    if (i === 9) {
        secret.classList.add('visible');
    }
});