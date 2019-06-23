'use strict';
const counter = document.getElementById('counter');
const btnsWrapper = document.querySelector('.wrap-btns');

function setValue(n) {
    counter.innerText = n.toString();
    localStorage.setItem('value', n);
}

function init() {
    try {
        const value = localStorage.getItem('value');
        if (value) {
            setValue(value);
            return
        }
        setValue(0);
    } catch(e) {
        setValue(0);
    }
}

function handleBtnClick(event) {
    event.preventDefault();
    
    let value = parseInt(counter.innerText);

    switch(event.target.id) {
        case 'increment':
            setValue(++value);
            break;
        case 'decrement':
            if (value > 0) {
                setValue(--value);
            };
            break;
        case 'reset':
            setValue(0);
            break;
    }
}

btnsWrapper.addEventListener('click', handleBtnClick);

init();
