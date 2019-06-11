const listBlock = document.querySelector('.list-block');
const inputs = listBlock.querySelectorAll('[type="checkbox"]');
const quantity = inputs.length;
const output = listBlock.querySelector('output');

function countCompleted(checkboxes) {
    let i = 0;
    for (checkbox of checkboxes) {
        if (checkbox.checked === true) {
            i++;
        }
    }
    return i;
};

function toggleCompleteStatus() {
    listBlock.classList.remove('complete');
    if (countCompleted(inputs) === quantity) {
        listBlock.classList.add('complete');
    }
};

const getOutputString = completed => `${completed} из ${quantity}`;

function init() {
    output.value = getOutputString(countCompleted(inputs));
    toggleCompleteStatus();
};

for (input of inputs) {
    input.addEventListener('change', () => {
        output.value = getOutputString(countCompleted(inputs));
    });
    input.addEventListener('change', toggleCompleteStatus);
};

init();