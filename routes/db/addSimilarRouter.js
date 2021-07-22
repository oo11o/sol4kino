const  {Router} = require('express')
const router = Router()

router.get('/db/addsimilar', (req,res) =>{
  res.status(200).json({
    'res':'ОК'
  })
  console.log('res')
})

module.exports = router