const input = document.getElementById('source');
const from = document.getElementById('from');
const to = document.getElementById('to');
const output = document.getElementById('result');

function convert() {
    output.value = (input.value * from.value / to.value).toFixed(2);
};

input.addEventListener('input', convert);
from.addEventListener('change', convert);
to.addEventListener('change', convert);