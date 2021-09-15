const { Sequelize } = require('sequelize');

const Films = require('./models/films')
const Test = require('./models/testTable')

const Kino = require('parsekino')
//const cron = require('node-cron')

// var fs = require('fs');

// require('dotenv').config({})

async function start() {

    const filmStatus1 =  await Films.findOne({
        raw: true,
        where:{
            status: 1
        },
      //  order: Sequelize.literal('rand()')
    })

    console.log(filmStatus1)

    Kino.url = 'https://www.kinopoisk.ru'+ filmStatus1.url_kp
    const  similarFilms = await Kino.getSimilar()
    console.log(similarFilms)

    let position = 1

    for(let item of similarFilms  ){
        console.log('********')

        let filmId = await Films.findOne({
                 attributes: ['id'],
                 where:{url_kp : item.url}})

        // film is isset in Films table  0 = no
        const jane = await Test.create({ test1: "Jane" });

        // Jane exists in the database now!
        console.log(jane); // true
        console.log(jane.id); // "Jane"

        return  false


        if(filmId.length == 0){
            const insertResult = await Films.insertFilm(item.url, item.name, 1)
            let filmIdNew = await Films.getIdByUrl(item.url)
            await Similars.addSimilarFilm(result[0].id, filmIdNew[0].id, position)
        }else{
            const similarItem = await Similars.getSimilarItem(result[0].id, filmId[0].id)

            if(similarItem.length == 0){
                await Similars.addSimilarFilm(result[0].id, filmId[0].id, position)
                Films.updateStatusByIdSimilar(filmId[0].id, 1)
            }
        }
        position++
    }
    console.log(filmId)
    return  false;



            Films.updateStatusById(result[0].id, 3)

            mes = 'Status 1'


        // res.status(200).json({
        //     'mes': mes,
        //     'idFilm': result[0].id,
        //     'similars': similarFilms,
        //     'status': 'OK'


    // return await axios.post(url, {
    //     'id': result[0].id,
    // })
    //     .then(function (response) {
    //         return response.data
    //     })
    //     .catch(function (error) {
    //         console.log(error);
    //     });

}

start()

// kinoGetSimilar.schedule('*/8 * * * *', async () => {
//     const result =  await start()
//     console.log(result)
//     console.log('running a task every 2 minute');
// });
