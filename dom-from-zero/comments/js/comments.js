'use strict';

function showComments(list) {
  const commentsContainer = document.querySelector('.comments');
  list.forEach(comment => commentsContainer.appendChild(createComment(comment)));
}

function removeChildren(el) {
  while (el.lastChild) {
    el.removeChild(el.lastChild);
  }
}

function createNode(elName, elClass, children) {
  const el = document.createElement(elName);
  el.classList.add(elClass);

  if (typeof children === 'string') {
    el.textContent = children;
  }

  if (children instanceof Array) {
    children.forEach(child => el.appendChild(child));
  }

  return el;
}

function createComment(comment) {
  const wrapper = document.querySelector('.comment-wrap').cloneNode(true);
  wrapper.querySelector('.photo').setAttribute('title', comment.author.name);
  wrapper.querySelector('.avatar').setAttribute('style', `background-image: url('${comment.author.pic}')`);
  removeChildren(wrapper.lastElementChild);
  const commentBlock = wrapper.querySelector('.comment-block');
  commentBlock.appendChild(createNode('p', 'comment-text', comment.text));
  commentBlock.appendChild(createNode('div', 'bottom-comment', [
    createNode('div', 'comment-date', new Date(comment.date).toLocaleString('ru-Ru')),
    createNode('ul', 'comment-actions', [
      createNode('li', 'complain', 'Пожаловаться'),
      createNode('li', 'reply', 'Ответить'),
    ]),
  ]));

  return wrapper;
}

fetch('https://neto-api.herokuapp.com/comments')
  .then(res => res.json())
  .then(showComments);
