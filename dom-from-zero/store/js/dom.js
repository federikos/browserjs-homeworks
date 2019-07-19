'use strict';

function createElement(node) {
  if(typeof node === 'string') {
    return createTextNode(node);
  }
  const elem = document.createElement(node.name);

  for (const key in node.props) {
    elem.setAttribute(key, node.props[key]);
  }

  node.childs.forEach(child => {

    if (typeof child === 'string') {
      elem.textContent = child;
    } 

    if (typeof child === 'object') {
      elem.appendChild(createElement(child));
    }
  });
  return elem;
};