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
         order: Sequelize.literal('rand()')
    })
    if(!filmStatus1){
        console.log('Clear')
        clearInterval(idTimer)
        return false
    }
    console.log(filmStatus1.id)


    Kino.url = 'https://www.kinopoisk.ru'+ filmStatus1.url_kp
    const  similarFilms =  await Kino.getSimilar()
    console.log(similarFilms)
    console.log(Kino.url)
    // if(!similarFilms){
    //     console.log('Similars Empty')
    //     clearInterval(idTimer)
    //     return false
    // }
    console.log(filmStatus1.id)

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
                           status: null,
                           id: similar.id
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

}

async function  addSimilarFilm(film_id, similar_film_id, position, from = 'kp'){
    await Similars.create({
        film_id: film_id,
        similar_film_id: similar_film_id,
        position: position,
        from: from
    })

}

async function go(){
    try {
       await start()
    }catch{
        console.log('STOP PROCESS')
        clearInterval(idTimer)
        return false
    }
}

const idTimer = setInterval(go,180000)


// kinoGetSimilar.schedule('*/8 * * * *', async () => {
//     const result =  await start()
//     console.log(result)
//     console.log('running a task every 2 minute');
// });
