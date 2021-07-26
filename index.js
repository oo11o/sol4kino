const express = require('express')
const bodyParser = require('body-parser');

const sequelize = require('./database')
const app = express()


const SQL = require('./models/similars')


const PORT = process.env.PORT || 3011

app.use(bodyParser.json());

const similarRouter = require('./routes/db/similarRouter')
const filmRouter = require('./routes/db/filmRouter')

app.use(similarRouter)
app.use(filmRouter)


async function start(){
    try{
        await sequelize.sync()
        app.listen(PORT, () => {
            console.log('Server is running')
        })

        //let log = await SQL.getSimilarFilms(1)
        //let log = await SQL.addSimilarFilm(1,1, 'tes')
        //log.insertId
        //log.affectedRows
            // console.log(log)


    }catch (e) {
        console.log('sd')
        console.log(e)
    }
}



start()