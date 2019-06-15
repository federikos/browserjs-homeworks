const todoList = document.querySelector('.todo-list');
const done = todoList.querySelector('.done');
const undone = todoList.querySelector('.undone');
const labels = todoList.getElementsByTagName('label');

function handleClick(event) {
    const section = event.target.parentElement;
    const input = event.target.firstElementChild;
    
    if(section.classList.contains('done')) {
        undone.appendChild(event.target);
        input.removeAttribute('checked');
        return;
    }
    
    if(section.classList.contains('undone')) {
        done.appendChild(event.target);
        input.setAttribute('checked', '');
    }
};

for (label of labels) {
    label.addEventListener('click', handleClick);
}