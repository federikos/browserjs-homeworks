'use strict';

const wrapperDropdown = document.querySelector('.wrapper-dropdown');
const toggleClassActive = () => wrapperDropdown.classList.toggle('active');
wrapperDropdown.addEventListener('click', toggleClassActive);
