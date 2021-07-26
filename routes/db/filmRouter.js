const  {Router} = require('express')
const router = Router()
const Films = require('../../models/films')

router.get('/db/film/getid', async (req,res) =>{

//  let test = typeof (req.body.film)

    const url = req.query.url;

    const idFilm = await Films.getIdByUrl(url)

    res.status(200).json({
        'status': 'test2',
        'idFilm': idFilm
    })

})

module.exports = router