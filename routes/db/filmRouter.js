const  {Router} = require('express')
const router = Router()
const Films = require('../../models/films')
const Kino = require('parsekino')

router.get('/db/film/getid', async (req,res) =>{

//  let test = typeof (req.body.film)
    //613932

    const url = req.query.url;
    await Films.getById(id)

    res.status(200).json({
        'status': 'test2',
        'idFilm': idFilm
    })
})

router.post('/db/film/updateinfo', async (req,res) => {

    const result = await Films.getById(req.body.id)
    const id = result[0].id
    Kino.url = 'https://www.kinopoisk.ru'+ result[0].url_kp
    console.log(Kino.url)
    film = await Kino.getInfo()

    Films.updateInfo(id,film)

    console.log(film)


})

module.exports = router