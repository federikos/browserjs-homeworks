'use strict';

const quickCart = document.getElementById('quick-cart');
let total = parseInt(localStorage.getItem('total')) || 0;

function getColorData() {
    fetch('https://neto-api.herokuapp.com/cart/colors', {
        headers:{'Content-Type':'application/json'}
    })
        .then(res => {
            return res.json();
        })
        .then(data => {
            createColorSnippets(data);
        })
        .catch( e => console.error(e.name, e.message));
}

function createColorSnippets(data) {
    const defaultColor = localStorage.getItem('defaultColor') || 'red';
    const colorSwatch = document.getElementById('colorSwatch');
    
    data.forEach((item, i) => {
        const isAvailable = item.isAvailable ? 'available' : 'soldout';
        const isDisabled = item.isAvailable ? '' : 'disabled';
        const isChecked = item.type === defaultColor ? 'checked' : '';
        
        const snippet = 
            `<div data-value="${item.type}" class="swatch-element color ${item.type} ${isAvailable}">
                <div class="tooltip">${item.title}</div>
                    <input quickbeam="color" id="swatch-1-${item.code}" type="radio" name="color" value="${item.code}" ${isChecked} ${isDisabled}>
                    <label for="swatch-1-${item.code}" style="border-color: ${item.code};">
                        <span style="background-color: ${item.code};"></span>
                        <img class="crossed-out" src="https://neto-api.herokuapp.com/hj/3.3/cart/soldout.png?10994296540668815886">
                    </label>
            </div>`

        colorSwatch.innerHTML = colorSwatch.innerHTML + snippet;
    });

    Array.from(colorSwatch.children).forEach( colorItem => {
        colorItem.addEventListener('click', event => {
            localStorage.setItem('defaultColor', event.currentTarget.dataset.value);
        });
    });
}

function getSizeData() {
    fetch('https://neto-api.herokuapp.com/cart/sizes', {
        headers:{'Content-Type':'application/json'}
    })
        .then(res => {
            return res.json();
        })
        .then(data => {
            createSizeSnippets(data);
        })
        .catch( e => console.error(e.name, e.message));
}

function createSizeSnippets(data) {
    const defaultSize = localStorage.getItem('defaultSize') || 'xl';
    const sizeSwatch = document.getElementById('sizeSwatch');
    data.forEach((item, i) => {
        const wrapper = document.createElement('div');
        const input = document.createElement('input');
        const label = document.createElement('label');
        const img = document.createElement('img');

        wrapper.dataset.value = item.type;
        wrapper.classList.add('swatch-element', 'plain', item.type);

        if (item.isAvailable) {
            wrapper.classList.add('available');
        } else {
            wrapper.classList.add('soldout');
            input.setAttribute('disabled', '');
        }

        if (item.type === defaultSize) {  
            input.setAttribute('checked', '');
        }

        input.setAttribute('id', `swatch-0-${item.type}`);
        input.setAttribute('type', 'radio');
        input.setAttribute('name', 'size');
        input.setAttribute('value', item.type);

        label.setAttribute('for', `swatch-0-${item.type}`);

        img.classList.add('crossed-out');
        img.src = 'https://neto-api.herokuapp.com/hj/3.3/cart/soldout.png?10994296540668815886';

        label.innerText = item.title;
        label.appendChild(img);

        wrapper.appendChild(input);
        wrapper.appendChild(label);
        wrapper.addEventListener('click', event => {
            localStorage.setItem('defaultSize', item.type);
        });

        sizeSwatch.appendChild(wrapper);
    });
}

function addToCart(event) {
    event.preventDefault();
    const AddToCartForm = document.getElementById('AddToCartForm');
    const formData = new FormData(AddToCartForm);
    formData.append('productId', AddToCartForm.dataset.productId);
    fetch('https://neto-api.herokuapp.com/cart', {
        body: formData,
        //body: JSON.stringify(formData);
        method: "POST",
        // headers:{'Content-Type':'application/json'}
        //почему не работает, если передавать сериализованный объект?
    })
        .then(res => {
            return res.json();
        })
        .then(data => {
            if (data.error) {
                console.error(data.message);
            } else {
                Array.from(data).forEach(item => {
                    createProductSnippet(item, 'add');
                    createCartSnippet(item);
                });
            }
        })
        .catch(e => {
            console.error(e.name, e.message);
        });
}

function createProductSnippet(data, btnType) {

    const wrapper = document.createElement('div');
    const div = document.createElement('div');
    const outerSpan1 = document.createElement('span');
    const outerSpan2 = document.createElement('span');
    const img = document.createElement('img');
    const s1 = document.createElement('span');
    const s2 = document.createElement('span');

    wrapper.setAttribute('id', `quick-cart-product-${data.id}`);
    wrapper.setAttribute('style', 'opacity: 1;');
    wrapper.classList.add('quick-cart-product', 'quick-cart-product-static');
    div.classList.add('quick-cart-product-wrap');
    img.src = data.pic;
    img.title = data.title;
    s1.classList.add('s1');
    s1.setAttribute('style', 'background-color: #000; opacity: .5');
    
    s1.innerText = `$${data.price.toFixed(2)}`;
    
    if (btnType === 'remove') {
        total -= data.price;
        localStorage.setItem('total', total);
    }
    if (btnType === 'add') {
        total += data.price;
        localStorage.setItem('total', total);
    }
    
    s2.classList.add('s2');
    outerSpan1.classList.add('count', 'hide', 'fadeUp');
    outerSpan1.setAttribute('id', `quick-cart-product-count-${data.id}`);
    outerSpan1.innerText = data.quantity;
    outerSpan2.classList.add('quick-cart-product-remove', 'remove');
    outerSpan2.dataset.id = data.id;
    outerSpan2.addEventListener('click', removeItem);

    wrapper.appendChild(div);
    div.appendChild(img);
    div.appendChild(s1);
    div.appendChild(s2);
    wrapper.appendChild(outerSpan1);
    wrapper.appendChild(outerSpan2);

    quickCart.innerHTML = '';
    quickCart.appendChild(wrapper);
}

function createCartSnippet(data) {
    const a = document.createElement('a');
    const strong = document.createElement('strong');
    const br = document.createElement('br');
    const span = document.createElement('span');
    const priceSpan = document.createElement('span');
    a.setAttribute('id', 'quick-cart-pay');
    a.setAttribute('quickbeam', 'cart-pay');
    a.classList.add('cart-ico');
    a.classList.add('open');
    strong.classList.add('quick-cart-text');
    strong.innerText = 'Оформить заказ';
    priceSpan.setAttribute('id', 'quick-cart-price');
    priceSpan.innerText = `$${total.toFixed(2)}`;

    a.appendChild(span);
    strong.appendChild(br);
    span.appendChild(strong);
    span.appendChild(priceSpan);

    if (quickCart.lastElementChild.tagName === 'a') {
        quickCart.lastElementChild.remove();
    }

    quickCart.appendChild(a);
}

function removeItem(event) {
    const id = event.target.dataset.id;
    const formData = new FormData();
    formData.append('productId', id);
    fetch('https://neto-api.herokuapp.com/cart/remove', {
        body: formData,
        method: "POST",
    })
        .then(res => {
            return res.json();
        })
        .then(data => {
            if (data.error) {
                console.error(data.message);
            } else {
                if (data.length === 0) {
                    document.getElementById('quick-cart-pay').classList.remove('open');
                    total = 0;
                    localStorage.setItem('total', total);
                    document.getElementById('quick-cart').firstElementChild.remove();
                } else {
                    Array.from(data).forEach(item => {
                        createProductSnippet(item, 'remove');
                        createCartSnippet(item);
                    });
                }
            }
        })
        .catch(e => {
            console.error(e.name, e.message);
        });
}

function init() {
    getColorData();
    getSizeData();
    const AddToCartBtn = document.getElementById('AddToCart');
    AddToCartBtn.addEventListener('click', addToCart);
}

document.addEventListener('DOMContentLoaded', init);