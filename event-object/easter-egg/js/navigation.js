'use strict';

const nav = document.querySelector('nav');
const secret = document.querySelector('.secret');

document.addEventListener('keydown', (event) => {
    if (!(event.altKey && event.ctrlKey)) {
        return;
    }

    if (event.code === 'KeyT') {
        nav.classList.toggle('visible');
    }
});

let userWord = 0;

document.addEventListener('keydown', (event) => {
    
    switch (event.code) {
        case 'KeyY':
            if (userWord !== 0) {
                return;
            }
            userWord++;
            break;

        case 'KeyT':
            if (userWord !== 1) {
                userWord = 0;
                return;
            }
            userWord++;
            break;

        case 'KeyN':
            if (userWord !== 2) {
                userWord = 0;
                return;
            }
            userWord++;
            break;

        case 'KeyJ':
            if ((userWord !== 3) && (userWord !== 5)) {
                userWord = 0;
                return;
            }
            userWord++;
            break;

        case 'KeyK':
            if (userWord !== 4) {
                userWord = 0;
                return;
            }
            userWord++;
            break;

        case 'KeyU':
            if (userWord !== 6) {
                userWord = 0;
                return;
            }
            userWord++;
            break;

        case 'KeyB':
            if (userWord !== 7) {
                userWord = 0;
                return;
            }
            userWord++;
            break;

        case 'KeyZ':
            if (userWord !== 8) {
                userWord = 0;
                return;
            }
            secret.classList.add('visible');
            break;
            
        default:
            return;
    }
});