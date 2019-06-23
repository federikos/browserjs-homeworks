'use strict';
list.addEventListener('click', event => {
    if(event.target.classList.contains('add-to-cart')) {
        event.preventDefault();
        const title = event.target.dataset.title;
        const price = event.target.dataset.price;
        addToCart({title, price});
    }
});
