// comments to help you understand better

const axios = require('axios');

const todosApiURL = 'https://jsonlaceholder.typicode.com/todos';
const usersApiURL = 'https://jsonplaceholder.typicode.com/users';

function fetchTodos() {
    return new Promise((resolve, reject) => {
        axios.get(todosApiURL)
            .then(response => {
                resolve(response.data.slice(0, 10)); // Limit to 10 to-dos for simplicity
            })
            .catch(error => {
                reject(error);
            });
    });
}

function fetchUsers() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            axios.get(usersApiURL)
                .then(response => {
                    resolve(response.data);
                })
                .catch(error => {
                    reject(error);
                });
        }, 3000); // Simulate a delay of 3 seconds
    });
}

function displayTodos(todos) {
    console.log('\nTo-Do List:');
    todos.forEach(todo => {
        console.log(`${todo.id}. ${todo.title} [${todo.completed ? 'x' : ' '}]`);
    });
}

function displayUsers(users) {
    console.log('\nUsers List:');
    users.forEach(user => {
        console.log(`${user.id}. ${user.name}`);
    });
}

async function fetchData() {
    console.log('Fetching data, please standby...');
    const start = Date.now();

    const todosPromise = fetchTodos();
    const usersPromise = fetchUsers();

    // Handle todosPromise separately
    todosPromise
        .then(todos => {
            const todosFetchEnd = Date.now();
            const todosFetchTime = (todosFetchEnd - start) / 1000;
            displayTodos(todos);
            console.log(`\nTodos fetched in ${todosFetchTime.toFixed(2)} seconds.`);
        })
        .catch(error => {
            console.error('Error fetching todos:', error.message);
        });

    // Handle usersPromise separately
    usersPromise
        .then(users => {
            const usersFetchEnd = Date.now();
            const usersFetchTime = (usersFetchEnd - start) / 1000;
            displayUsers(users);
            console.log(`\nUsers fetched in ${usersFetchTime.toFixed(2)} seconds.`);
        })
        .catch(error => {
            console.error('Error fetching users:', error.message);
        });

    // Wait for both promises to settle
    await Promise.allSettled([todosPromise, usersPromise]);

    const end = Date.now();
    const totalTimeTaken = (end - start) / 1000; // Total time taken
    console.log(`\nTotal time taken: ${totalTimeTaken.toFixed(2)} seconds.`);
}

fetchData();
