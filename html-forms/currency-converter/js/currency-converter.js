const xhr = new XMLHttpRequest();
const loader = document.getElementById('loader');
const content = document.getElementById('content');
const selects = document.querySelectorAll('select');

xhr.open(
    "GET",
    "https://neto-api.herokuapp.com/currency"
);

xhr.send();

function loadCurrencies() {
    const currencies = JSON.parse(xhr.responseText);
    currencies.map((cur, i) => {
        for (select of selects) {
            const option = document.createElement('option');
            option.label = cur.code;
            option.value = cur.value;
            select.appendChild(option);
        }
    });
};

function showLoader() {
    loader.classList.remove('hidden');
};

function toggleLoader() {
    loader.classList.toggle('hidden');
    content.classList.toggle('hidden');
};

document.addEventListener('DOMContentLoaded', showLoader);
xhr.addEventListener('load', loadCurrencies);
xhr.addEventListener('load', toggleLoader);