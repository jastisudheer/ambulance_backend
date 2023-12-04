const axios = require('axios');

axios.get('https://jsonplaceholder.typicode.com/posts/1')
    .then(response => {
        console.log('Data:', response.data);
    })
    .catch(error => {
        console.error('Error:', error);
    });
