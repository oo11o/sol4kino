const axios = require('axios')
const Films = require('./models/films')

const cron = require('node-cron')
var fs = require('fs');

require('dotenv').config({})
const url = process.env.APIHOST + '/db/similar/add'


async function start() {
    var now = new Date();

    fs.appendFile('/home/code/Web/apikino/text.txt ', '\n This is my text.' +  now , function (err) {
        if (err) throw err;
        console.log('Updated!');
    });

    const result = await Films.getStatusOne()


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

cron.schedule('*/2 * * * *', async () => {
    const result =  await start()
    console.log(result)
    console.log('running a task every 2 minute');
});
