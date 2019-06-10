const xhr = new XMLHttpRequest();
const content = document.getElementById('content');
xhr.addEventListener('load', onLoad);
xhr.open(
    "GET",
    "https://neto-api.herokuapp.com/book/"
);
xhr.send();

function onLoad() {
    const books = JSON.parse(xhr.responseText);
    content.innerHTML = '';
    
    for(book of books) {
        const li = document.createElement('li');
        const img = document.createElement('img');
        
        img.setAttribute('src', book.cover.small);
        li.appendChild(img);
        li.dataset.title = book.title;
        li.dataset.author = book.author.name;
        li.dataset.info = book.info;
        li.dataset.price = book.price;
        content.appendChild(li);
    }
}