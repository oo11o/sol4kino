const axios = require('axios')
const Films = require('./models/films')
require('dotenv').config()

const url = process.env.APILOCAl + '/db/similar/add'

async function start() {
    const result = await Films.getStatusOne()
    axios.post(url, {
    'id': result[0].id,
        })
            .then(function (response) {
                console.log(response.data);
            })
            .catch(function (error) {
                console.log(error);
            });
}

start()

