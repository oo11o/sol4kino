const  {Router} = require('express')
const router = Router()
const Kino = require('parsekino')

const Films = require('../../models/films')

router.post('/db/similar/add', async (req,res) => {
    let mes = 'Start'
    const result = await Films.getById(req.body.id)

    console.log(result[0].status)

    if(result[0].status == null || result[0].status == 1) {
        await Films.updateStatusById(req.body.id, 1)

        Kino.url = 'https://www.kinopoisk.ru'+ result[0].url_kp
        const similarFilms = await Kino.getSimilar()
        console.log(similarFilms)

        for(let item of similarFilms  ){
            let filmId = await Films.getIdByUrl(item.url)
            if(filmId.length == 0){
               const insertResult = await Films.insertFilm(item.url, item.name, 1)
               console.log(insertResult)
            }

        }

        mes = 'Status 1'
    }else{
        mes = 'Status not Null'
    }

    res.status(200).json({
        'status1': mes,
        'status': 'OK'
    })
})

 // Films.getById(613932)

module.exports = router