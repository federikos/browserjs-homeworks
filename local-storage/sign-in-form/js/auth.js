'use strict';
const btns = document.getElementsByClassName('button');

function getFormData(form) {
    const inputs = form.querySelectorAll('input');
    const sendData = {};

    Array.from(inputs).map(input => {
        if(input.name) {
            sendData[input.name] = input.value;
        }
    });

    return sendData;
}

function sendForm(event) {
    event.preventDefault();
    
    const form = event.target.parentElement.parentElement;
    const output = form.querySelector('.error-message');
    const formData = getFormData(form);
    let url, successMsgEnd;

    switch(form.className) {
        case 'sign-in-htm':
            url = 'https://neto-api.herokuapp.com/signin';
            successMsgEnd = 'авторизован';
            break;
        case 'sign-up-htm':
            url = 'https://neto-api.herokuapp.com/signup';
            successMsgEnd = 'зарегистрирован';
            break;
    }

    fetch(url, {
        body: JSON.stringify(formData),
        method: "POST",
        headers:{'Content-Type':'application/json'}
    })
        .then(res => {
            return res.json();
        })
        .then(data => {
            if (data.error) {
                output.innerText = data.message;
            } else {
                output.innerText = `Пользователь ${data.name} успешно ${successMsgEnd}`;
            }
        })
        .catch(err => {
            console.error(err.name, err.message);
        })
}

Array.from(btns).forEach(btn => btn.addEventListener('click', sendForm));
