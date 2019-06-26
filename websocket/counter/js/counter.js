'use strict';

document.addEventListener('DOMContentLoaded', () => {
    const counter = document.querySelector('.counter');
    const errors = document.querySelector('output.errors');

    const connection = new WebSocket('wss://neto-api.herokuapp.com/counter');
    window.addEventListener('beforeunload', event => {
        event.currentTarget.close(1000, 'Пользователь закрыл страницу');
    });
    connection.addEventListener('message', event => {
        const data = JSON.parse(event.data);
        counter.innerText = data.connections;
        errors.value = data.errors;
    });
});
