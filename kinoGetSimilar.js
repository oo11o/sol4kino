const { Sequelize } = require('sequelize');

const Films = require('./models/films')
const Similars = require('./models/similars')
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

        let similar = await Films.findOne({
                 attributes: ['id'],
                 where:{url_kp : item.url}})


        if(similar === null){
            // film no found in Films table
            let filmNew = await Films.create({
                url_kp: item.url,
                name: item.name,
                status: 1
            });

            await addSimilarFilm(filmStatus1.id, filmNew.id, position)

        }else{
            // film found in Films table
            //
             let issetSimilar = await Similars.findOne({
                                                attributes: ['id'],
                                                where:{
                                                        film_id: filmStatus1.id,
                                                        similar_film_id: similar.id
                                                }
             })

            if(issetSimilar === null){
                await addSimilarFilm(filmStatus1.id, similar.id, position)
                await Films.update(
                    {
                        status: 1,
                        updated_at: Sequelize.literal('CURRENT_TIMESTAMP'),
                    },{
                        where:{
                           status: null
                        }
                    })
            }
        }
        position++
        //end cycle
    }

    await Films.update({
        status: 3,
        updated_at: Sequelize.literal('CURRENT_TIMESTAMP'),
    },{
        where: {
            id: filmStatus1.id
        }
    })

    return  false;



          //  Films.updateStatusById(result[0].id, 3)

           // mes = 'Status 1'


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

async function  addSimilarFilm(film_id, similar_film_id, position, from = 'kp'){
    await Similars.create({
        film_id: film_id,
        similar_film_id: similar_film_id,
        position: position,
        from: from
    })

}

start()

// kinoGetSimilar.schedule('*/8 * * * *', async () => {
//     const result =  await start()
//     console.log(result)
//     console.log('running a task every 2 minute');
// });