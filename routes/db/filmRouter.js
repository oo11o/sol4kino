const  {Router} = require('express')
const router = Router()
const Films = require('../../models/films')

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

module.exports = router