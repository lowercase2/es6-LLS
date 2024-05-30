const axios = require('axios');


const toDoAPIURL = 'https://jsonplaceholder.typicode.com/todos'

async function fetchTodo() {
    try {
        const response = await axios.get(toDoAPIURL);
        const todos = response.data.slice(0,10);
        console.log(todos);
    } catch (error) {
        console.log(error);
    }
};

fetchTodo();