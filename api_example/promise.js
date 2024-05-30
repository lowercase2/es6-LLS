const axios = require('axios');


const toDoAPIURL = 'https://jsonplaceholder.typicode.com/todos';
const usersAPIURL = 'https://jsonplaceholder.typicode.com/users';

function fetchToDos() {
    return new Promise((resolve, reject) => {
        axios.get(toDoAPIURL).then(
            response => {
                resolve(response.data.slice(0, 10));
            }).catch(error => {
                reject(error);
            });
    });
};

function fetchUsers() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            axios.get(usersAPIURL).then(
                response => {
                    resolve(response.data);
                }).catch(error => {
                    reject(error);
                });
        }, 3000);
    });
};

function displayTodos(todos) {
    todos.forEach(todo => {
        console.log(`${todo.id}`)
    });
}

function displayUsers(users) {
    users.forEach(user => {
        console.log(`${user.id}`)
    });
};

async function fetchData() {
    const todosPromise = fetchToDos();
    const usersPromise = fetchUsers();

    todosPromise.then(todos => {
        displayTodos(todos);
    })
    .catch(error => {
        console.error(error.message);
    });

    usersPromise.then(users => {
        displayUsers(users);
    })
    .catch(error => {
        console.error(error.message);
    });

    await Promise.allSettled([todosPromise, usersPromise]);

}

fetchData();


