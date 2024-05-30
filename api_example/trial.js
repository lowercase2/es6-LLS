const axios = require('axios');

const todosApiURL = 'https://jsonplaceholder.typicode.com/todos'; // Corrected URL

async function fetchAndDisplayTodos() {
    try {
        const response = await axios.get(todosApiURL);
        const todos = response.data.slice(0, 10); // Limit to 10 to-dos for simplicity
        console.log(todos);
    } catch (error) {
        console.error(error);
    }
}

// Execute the function
fetchAndDisplayTodos();
