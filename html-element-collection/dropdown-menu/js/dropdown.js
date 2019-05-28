'use strict';

const wrapperDropdown = document.querySelector('.wrapper-dropdown');
const listItemCollection = wrapperDropdown.querySelectorAll('li');
const toggleClassActive = () => wrapperDropdown.classList.toggle('active');

wrapperDropdown.addEventListener('click', toggleClassActive);

for(li of listItemCollection) {
    li.addEventListener('click', toggleClassActive);
}