const Sequelize = require ('sequelize')
require('dotenv').config({})

const  DB_NAME   = process.env.DB_NANE
const  USER_NAME = process.env.USER_NAME
const  PASSWORD  = process.env.PASSWORD
const  HOST      = process.env.HOST


const dbConnect = new Sequelize(
    DB_NAME,
    USER_NAME,
    PASSWORD,
    {
        host: HOST,
        dialect: 'mysql'
    }
)

module.exports = dbConnect