const  {Router} = require('express')
const router = Router()

router.post('/db/similar/add', (req,res) =>{

//  let test = typeof (req.body.film)


  res.status(200).json({
      'status': req.body.film
  })

})

module.exports = router