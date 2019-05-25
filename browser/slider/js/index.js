'use strict';

const imgs = [
    'i/airmax-jump.png',
    'i/airmax-on-foot.png',
    'i/airmax-playground.png',
    'i/airmax-top-view.png',
    'i/airmax.png'
];

const img = document.querySelector('#slider');

const changeImg = arr => {
    img.setAttribute('src', arr[0]);
    
    //additional feature - set right alt attributes
    let essentialChars = arr[0].length - 6;
    img.setAttribute('alt', arr[0].split('').splice(2, essentialChars).map(char => { 
        return (char === '-') ? ' ' : char; 
    }).join(''));
    //end of additional feature

    console.log(img.alt);
    arr.push(arr[0]);
    arr.shift();
};

setInterval(changeImg, 5000, imgs.slice());