//const axios = require('axios')
const Films = require('./models/films')
const { Sequelize } = require('sequelize');
const Kino = require('parsekino')
//const cron = require('node-cron')

var fs = require('fs');

require('dotenv').config({})

async function start() {

    const filmStatus3 =  await Films.findOne({
        raw: true,
        where:{
            status: 3
        },
        order: Sequelize.literal('rand()')
    })

    if(!filmStatus3){
        clearInterval(idTimer)
        return false
    }

    // GET FILM INFO
    Kino.url = 'https://www.kinopoisk.ru'+ filmStatus3.url_kp
    console.log('https://www.kinopoisk.ru'+ filmStatus3.url_kp)
    const data = await Kino.getInfo()
    console.log(data)

    /// UPDATE DATA
    const actors = JSON.stringify(data.actors)

    const kinopoiskCount = (data.rate.kinopoiskCount).replace(/\s/g, '')
    const imdbCount = (data.rate.imdbCount).replace(/\s/g, '')

    const encyclopedia = JSON.stringify(data.encyclopedia)

    const results =
        await Films.update(
        {
            status: 4,
            name_original: (data.originalName).replace(/'/g, "\\'"),
            description: (data.description).replace(/'/g, "\\'"),
            poster: data.poster,
            rate_imdb: data.rate.imdb,
            rate_imdb_count: imdbCount,
            rate_kp: data.rate.kinopoisk,
            rate_kp_count: kinopoiskCount,
            actor: actors,
            encyclopedia: encyclopedia.replace(/'/g, "\\'"),
            year_kp: data.year,
            updated_at: Sequelize.literal('CURRENT_TIMESTAMP'),

        }, {
        where: {
            id: filmStatus3.id
        }
    });

    console.log(filmStatus3.id)
    return  results


    //Films.updateInfo(id,film)
    //console.log(result)
    return false

    //console.log(result)
}




//start()
const idTimer = setInterval(start, 120000)


// cron.schedule('*/8 * * * *', async () => {
//     const result =  await start()
//     console.log(result)
//     console.log('running a task every 2 minute');
// });
