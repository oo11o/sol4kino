const axios = require('axios')
const Films = require('./models/films')

//const cron = require('node-cron')
var fs = require('fs');

require('dotenv').config({})
const url = process.env.APIHOST + '/db/film/updateinfo'


async function start() {
    
    const result = await Films.getStatusOne(3)

    //console.log(result)
    return await axios.post(url, {
        'id': result[0].id,
    })
        .then(function (response) {
            return response.data
        })
        .catch(function (error) {
            console.log(error);
        });

}


start()


// cron.schedule('*/8 * * * *', async () => {
//     const result =  await start()
//     console.log(result)
//     console.log('running a task every 2 minute');
// });
