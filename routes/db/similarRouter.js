const  {Router} = require('express')
const router = Router()
const Kino = require('parsekino')

const Films = require('../../models/films')
const Similars = require('../../models/similars')

router.post('/db/similar/add', async (req,res) => {
    let mes = 'Start'
    let similarFilms = ''
    const result = await Films.getById(req.body.id)

    //console.log(result[0].status)

    if(result[0].status == null || result[0].status == 1) {
        await Films.updateStatusById(req.body.id, 1)

        Kino.url = 'https://www.kinopoisk.ru'+ result[0].url_kp
        similarFilms = await Kino.getSimilar()
      //  console.log(similarFilms)
        let position = 1
        for(let item of similarFilms  ){
            let filmId = await Films.getIdByUrl(item.url)


            // film is isset in Films table  0 = no
            if(filmId.length == 0){
                const insertResult = await Films.insertFilm(item.url, item.name, 1)
                let filmIdNew = await Films.getIdByUrl(item.url)

                await Similars.addSimilarFilm(result[0].id, filmIdNew[0].id, position)
            }else{
                const similarItem = await Similars.getSimilarItem(result[0].id, filmId[0].id)
                if(similarItem.length == 0){
                    await Similars.addSimilarFilm(result[0].id, filmId[0].id, position)
                    Films.updateStatusById(filmId[0].id, 1)
                }
            }
        position++
        }

        Films.updateStatusById(result[0].id, 3)

        mes = 'Status 1'
    }else{
        mes = 'Status not Null'
    }

    res.status(200).json({
        'mes': mes,
        'idFilm': result[0].id,
        'similars': similarFilms,
        'status': 'OK'
    })
})


 // Films.getById(613932)

module.exports = router