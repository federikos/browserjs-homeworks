function initCart() {
    const cartCount = document.getElementById('cart-count');
    const cartTotal = document.getElementById('cart-total-price');
    const addBtns = document.getElementsByClassName('add');
    let count = parseInt(cartCount.innerHTML, 10);
    let total = parseInt(cartTotal.innerHTML, 10);
    
    const handleAddBtnClick = (event) => {
        currentProductPrice = parseInt(event.target.dataset.price, 10);
        total += currentProductPrice;
        cartCount.innerHTML = ++count;
        cartTotal.innerHTML = getPriceFormatted(total);
    };

    for (btn of addBtns) {
        btn.addEventListener('click', handleAddBtnClick);
    }
};

document.addEventListener('DOMContentLoaded', initCart);