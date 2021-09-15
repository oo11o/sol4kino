const Films = require('./models/films')
const { Sequelize } = require('sequelize');
const Kino = require('parsekino')
//const cron = require('node-cron')

var fs = require('fs');

require('dotenv').config({})

async function start() {

    const filmStatus1 =  await Films.findOne({
        raw: true,
        where:{
            status: 1
        },
        order: Sequelize.literal('rand()')
    })

    console.log(filmStatus1)
    return  false
    ////
    var now = new Date();



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

// kinoGetSimilar.schedule('*/8 * * * *', async () => {
//     const result =  await start()
//     console.log(result)
//     console.log('running a task every 2 minute');
// });
