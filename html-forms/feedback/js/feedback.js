const contentform = document.querySelector('.contentform');
const output = document.querySelector('#output');
const btnSend = contentform.querySelector('.button-contact');
const btnChange = output.querySelector('.button-contact');
const fields = contentform.querySelectorAll('input, textarea');
const indexField = contentform.querySelector('input[name="zip"]');

function toggleBtnAvailability() {
    const isEachFilled = Array.from(fields).every(field => field.value);
    if(isEachFilled) {
        btnSend.removeAttribute('disabled');
        return;
    }
    btnSend.setAttribute('disabled', '');
}

function handleBtnClick(event) {
    event.preventDefault();
    output.classList.toggle('hidden');
    contentform.classList.toggle('hidden');
}

function fillOutput() {
    
    for (field of fields) {
        const outputField = document.getElementById(field.name);
        
        if(outputField) {
            outputField.value = field.value;
        }
    }
}

for (field of fields) {
    field.addEventListener('input', toggleBtnAvailability);
};

indexField.setAttribute('type', 'number');

btnSend.addEventListener('click', handleBtnClick);
btnSend.addEventListener('click', fillOutput);
btnChange.addEventListener('click', handleBtnClick);