const localStorageItems = JSON.parse(localStorage.getItem('todoList'));
const todoArray = localStorageItems ? localStorageItems : [];

const newTodo = document.querySelector('#new-todo');
const addNewBtn = document.querySelector('.add-new-btn');
const todoList = document.querySelector('.todo-list');

const pendingTodos = document.querySelector('.todo-pending');

const clearBtn = document.querySelector('.todo-clear-btn');

clearBtn.addEventListener('click', () => {
    todoArray.splice(0, todoArray.length);
    todoList.innerHTML = '';
    localStorage.setItem('todoList', JSON.stringify(todoArray));
    showPendingTodos();
});

const showPendingTodos = () => {
    pendingTodos.innerText = `You have ${todoArray.length} pending tasks`;
};

let deleteBtns = document.querySelectorAll('.item-delete-btn');

const updateDeleteBtns = () => {
    deleteBtns = document.querySelectorAll('.item-delete-btn');
    deleteBtns.forEach(delBtn => {
        delBtn.addEventListener('click', (event) => deleteTodoItem(event));
    });
};

const deleteBtnsObserver = new MutationObserver((mutationsList) => {
    for (mutation of mutationsList) {
        if (mutation.type === 'childList') {
            updateDeleteBtns();
        };
    };
});

deleteBtnsObserver.observe(todoList, { childList: true, subtree: true });

const generateTodoListFromLocalStorage = () => {
    todoList.innerHTML = '';
    if (todoArray.length > 0) {
        todoArray.forEach(item => {
            createTodoItem(item);
        });
    };
    showPendingTodos();
};

const createTodoItem = (data) => {
    const todoItem = document.createElement('div');
    todoItem.classList.add('todo-item');

    const todoItemText = document.createElement('p');
    todoItemText.classList.add('todo-item-text', 'm-0', 'px-2');
    todoItemText.innerText = data;

    const itemDeleteBtn = document.createElement('button');
    itemDeleteBtn.classList.add('btn', 'item-delete-btn');
    itemDeleteBtn.innerHTML = '<i class="bi bi-trash"></i>';
    itemDeleteBtn.addEventListener('click', (event) => deleteTodoItem(event));

    todoItem.append(todoItemText, itemDeleteBtn);
    todoList.appendChild(todoItem);

    newTodo.value = '';

    showPendingTodos();
};

const deleteTodoItem = (event) => {
    const button = event.target.closest('button');
    if (button) {
        const itemToDelete = button.parentElement;
        const textToDelete = itemToDelete.querySelector('.todo-item-text').innerText;

        const index = todoArray.indexOf(textToDelete);

        if (index > -1) {
            todoArray.splice(index, 1);
        };

        localStorage.setItem('todoList', JSON.stringify(todoArray));

        itemToDelete.remove();

        showPendingTodos();
    };
};

generateTodoListFromLocalStorage();

addNewBtn.addEventListener('click', () => {
    const todoText = newTodo.value;
    todoText.trim();
    todoArray.push(todoText);
    localStorage.setItem('todoList', JSON.stringify(todoArray));
    createTodoItem(todoText);
});
