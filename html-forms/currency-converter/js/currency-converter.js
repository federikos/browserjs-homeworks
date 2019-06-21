const xhr = new XMLHttpRequest();
const loader = document.getElementById('loader');
const content = document.getElementById('content');
const selects = document.querySelectorAll('select');

function showLoader() {
    loader.classList.remove('hidden');
};

showLoader();

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
            option.innerText = cur.code;
            select.appendChild(option);
        }
    });
};

function removeLoader() {
    loader.classList.add('hidden');
    content.classList.remove('hidden');
};

xhr.addEventListener('load', loadCurrencies);
xhr.addEventListener('load', removeLoader);