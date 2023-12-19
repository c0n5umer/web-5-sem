"use strict";
const makeUid = () => (Math.random() + 1).toString(36).substring(2);
let todos = [];
const updateTodos = (updated) => {
    todos = updated;
    saveTodos();
    renderTodoList(todos, "list");
};
const loadTodos = () => {
    const storageItem = localStorage.getItem("todos");
    const updated = storageItem ? JSON.parse(storageItem) : [];
    updateTodos(updated);
};
const saveTodos = () => {
    localStorage.setItem("todos", JSON.stringify(todos));
};
const createTodoElement = (todo) => {
    const container = document.createElement("li");
    container.className = "todo";
    const input = document.createElement("input");
    input.className = "todo-checkbox";
    input.type = "checkbox";
    input.checked = todo.completed;
    input.id = todo.id;
    input.onchange = () => {
        const updated = todos.map((td) => td.id === todo.id ? { ...td, completed: input.checked } : td);
        updateTodos(updated);
    };
    const title = document.createElement("label");
    title.htmlFor = todo.id;
    title.className = "todo-title";
    title.innerHTML = todo.title;
    container.appendChild(input);
    container.appendChild(title);
    return container;
};
const renderTodoList = (todos, renderTo) => {
    const container = document.getElementById(renderTo);
    if (!container)
        return;
    container.innerHTML = "";
    todos.map(createTodoElement).forEach((child) => container.appendChild(child));
};
const addTodo = (todo) => {
    const updated = [...todos, todo];
    updateTodos(updated);
};
const subscribeToForm = () => {
    const form = document.getElementById("add");
    const titleInput = document.getElementById("add-title");
    if (!form)
        return;
    form.onsubmit = (e) => {
        e.preventDefault();
        const title = titleInput?.value;
        const id = makeUid();
        addTodo({ title, completed: false, id });
    };
};
const renderAsync = async () => {
    const target = document.getElementById("async-list");
    const spinner = document.getElementById("async-spinner");
    if (!target || !spinner) {
        return;
    }
    spinner.classList.remove("hidden");
    console.log(spinner);
    try {
        const response = await fetch("https://jsonplaceholder.typicode.com/users/1/todos");
        const rawAsyncTodos = await response.json();
        const asycnTodos = rawAsyncTodos.map((rawTodo) => ({
            id: makeUid(),
            title: rawTodo.title,
            completed: rawTodo.completed,
        }));
        renderTodoList(asycnTodos, "async-list");
    }
    catch {
        target.innerHTML = "An error occured";
    }
    spinner.classList.add("hidden");
};
const init = async () => {
    loadTodos();
    subscribeToForm();
    renderTodoList(todos, "list");
    await renderAsync();
};
init();
