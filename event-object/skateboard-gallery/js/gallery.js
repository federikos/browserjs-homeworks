'use strict';

const currentImg = document.querySelector('.gallery-view');
const links = document.querySelectorAll('.gallery-nav a');

for(const link of links) {
    link.addEventListener('click', function(event) {
        event.preventDefault();
        links.forEach((a) => a.classList.remove('gallery-current'));
        link.classList.add('gallery-current');
        currentImg.setAttribute('src', this.href);
    });
}