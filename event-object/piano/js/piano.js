'use strict';

const middleSet = [
    './sounds/middle/first.mp3',
    './sounds/middle/second.mp3',
    './sounds/middle/third.mp3',
    './sounds/middle/fourth.mp3',
    './sounds/middle/fifth.mp3'
];
const lowerSet = [
    './sounds/lower/first.mp3',
    './sounds/lower/second.mp3',
    './sounds/lower/third.mp3',
    './sounds/lower/fourth.mp3',
    './sounds/lower/fifth.mp3'
];
const higherSet = [
    './sounds/higher/first.mp3',
    './sounds/higher/second.mp3',
    './sounds/higher/third.mp3',
    './sounds/higher/fourth.mp3',
    './sounds/higher/fifth.mp3'
];

const keyboard = document.querySelector('.set');
const keys = keyboard.querySelectorAll('li');
const sounds = keyboard.querySelectorAll('audio');

function switchKeyboard(set) {
    for (let i = 0; i < sounds.length; i++) {
        sounds[i].setAttribute('src', set[i]);
    }
}

function handleKeyboardChange() {
    if (keyboard.classList.contains('middle')) {
        switchKeyboard(middleSet);
    };
    if (keyboard.classList.contains('lower')) {
        switchKeyboard(lowerSet);
    };
    if (keyboard.classList.contains('higher')) {
        switchKeyboard(higherSet);
    };
}

for (let i = 0; i < sounds.length; i++) {
    keys[i].addEventListener(
        'click',
        () => {
            sounds[i].pause();
            sounds[i].currentTime = 0;
            sounds[i].play();
        }
    );
}

function handleKeysDown(event) {
    if (event.repeat) {
        return
    };
    switch (event.code) {
        case 'ShiftLeft':
            keyboard.classList.remove('middle', 'higher');
            keyboard.classList.add('lower');
            break;
        case 'AltLeft':
            keyboard.classList.remove('middle', 'lower');
            keyboard.classList.add('higher');
            break;
    }
    handleKeyboardChange();
}

function handleKeysUp(event) {
    switch (event.code) {
        case 'ShiftLeft':
        case 'AltLeft':
            keyboard.classList.remove('lower', 'higher');
            keyboard.classList.add('middle');
            break;
    }
    handleKeyboardChange();
}

handleKeyboardChange();

document.addEventListener('keydown', handleKeysDown);
document.addEventListener('keyup', handleKeysUp);