document.addEventListener('DOMContentLoaded', loadItems());

let btn = document.getElementById('add-task-button');
btn.addEventListener('click', addItem);

function addItem() {
    let text = document.getElementById('input-box').value;
    if (text == '') return;

    createItem(text);
    saveItems();
}

function createItem(text, state) {

    const item = document.getElementById('todo-list');

    const taskItem = document.createElement('div');
    taskItem.className = 'todo-list-item';

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.style.height = '32px';
    checkbox.style.width = '32px';
    checkbox.checked = state;
    checkbox.addEventListener('change', (event) => {
        toggleCompletion(event.target);
        saveItems();
    });

    const label = document.createElement('label');
    label.style.width = '100%';
    label.style.wordBreak = 'break-all';
    label.style.margin = '0px 10px';
    label.textContent = text;

    const delButton = document.createElement('button');
    delButton.style.padding = '0px 8px';
    delButton.style.fontSize = '25px';
    delButton.style.cursor = 'pointer';
    delButton.innerHTML = '🗑';
    delButton.addEventListener('click', delItem);

    taskItem.appendChild(checkbox);
    taskItem.appendChild(label);
    taskItem.appendChild(delButton);

    if (state) {
        taskItem.classList.add('completed');
    }

    item.appendChild(taskItem);
}

function toggleCompletion(checkbox) {
    const taskItem = checkbox.closest('.todo-list-item');
    if (checkbox.checked) {
        taskItem.classList.add('completed');
    } else {
        taskItem.classList.remove('completed');
    }
}

function delItem(event) {
    const taskItem = event.target.closest('.todo-list-item');
    taskItem.remove();
    saveItems();
}

function saveItems() {
    const items = [];
    document.querySelectorAll('.todo-list-item').forEach(item => {
        const text = item.querySelector('label').textContent.trim();
        const state = item.querySelector('input[type="checkbox"]').checked;
        items.push({ text, state });
    });
    localStorage.setItem('ToDOList', JSON.stringify(items));
}

function loadItems() {
    const savedItems = JSON.parse(localStorage.getItem('ToDOList') || '[]');
    savedItems.forEach(item => createItem(item.text, item.state));
}




