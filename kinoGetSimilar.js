const { Sequelize } = require('sequelize');

const Films = require('./models/films')
const Films = require('./models/similars')
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


    Kino.url = 'https://www.kinopoisk.ru'+ filmStatus1.url_kp
    const  similarFilms =  await Kino.getSimilar()
    console.log(similarFilms)

    let position = 1

    for(let item of similarFilms  ){
        console.log('********')

        let filmId = await Films.findOne({
                 attributes: ['id'],
                 where:{url_kp : item.url}})


        if(filmId === null){
            // film no found in Films table
            let filmNew = await Films.create({
                url_kp: item.url,
                name: item.name,
                status: 1
            });

            await addSimilarFilms(film.id, position)
            await Similars.addSimilarFilm(filmStatus1.id, filmNew.id, position)

        }else{
            // film found in Films table
            //
             let similarItem = await Similars.findOne({
                                                attributes: ['id'],
                                                where:{
                                                        film_id: item.url,
                                                        similar_film_id:
                                                }
             })
            // const similarItem = await Similars.getSimilarItem(result[0].id, filmId[0].id)
            //
            // if(similarItem.length == 0){
            //     await Similars.addSimilarFilm(result[0].id, filmId[0].id, position)
            //     Films.updateStatusByIdSimilar(filmId[0].id, 1)
            // }
        }
        position++
    }

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

async function  addSimilarFilm(){

}

start()

// kinoGetSimilar.schedule('*/8 * * * *', async () => {
//     const result =  await start()
//     console.log(result)
//     console.log('running a task every 2 minute');
// });
