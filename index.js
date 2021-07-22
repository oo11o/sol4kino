const express = require('express')
const app = express()

const PORT = process.env.PORT || 3011

const addSimilarRouter = require('./routes/db/addSimilarRouter')

app.use(addSimilarRouter)

app.listen(PORT, () => {
    console.log('Server is running')
})