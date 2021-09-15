
const sequelize = require('../database')
const { Sequelize, DataTypes } = require('sequelize');

class Films{

    const sequelize = new Sequelize('sqlite::memory:');

    const User = sequelize.define('User', {
        // Model attributes are defined here
        firstName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        lastName: {
            type: DataTypes.STRING
            // allowNull defaults to true
        }
    }, {
        // Other model options go here
    });

    // `sequelize.define` also returns the model
    //console.log(User === sequelize.models.User); // true

    // static async addSimilarFilm(film_id, similar_film_id, from = 'kp'){
    //     const [results] =  await sequelize.query("INSERT IGNORE INTO similars (`film_id`, `similar_film_id`, `from`)"
    //         +`VALUES(${film_id}, ${similar_film_id}, '${from}')`)
    //
    //     return results
    // }

    /*

    static async getIdByUrl(url){
        const [results] =  await sequelize.query(`SELECT id, status FROM films WHERE url_kp='${url}'`);
        return  results
    }

    static async getById(id){
        const [results] =  await sequelize.query(`SELECT * FROM films WHERE id='${id}'`);
        return  results
    }

    static async updateStatusById(id,status){

        const [results] =  await sequelize.query(`UPDATE films SET status = ${status}, updated_at = CURRENT_TIMESTAMP  WHERE id = ${id}`);
        return  results
    }

    static async updateStatusByIdSimilar(id,status){

        const [results] =  await sequelize.query(`UPDATE films SET status = ${status}, updated_at = CURRENT_TIMESTAMP  WHERE id = ${id} AND status IS NULL`);
        return  results
    }

    static async updateInfo(id, data){

        getById
    }


    static async insertFilm(url,name,status = null){
        const [results] =  await sequelize.query(`INSERT INTO films(url_kp, name, status) VALUES ('${url}','${name}', '${status}')`);
        return  results
    }

    static async getStatusOne(status = 1){

        const [results] =  await sequelize.query(`SELECT * FROM films WHERE status = ${status}  ORDER BY RAND() LIMIT 0,1`);
        return  results
    }
  */
}

module.exports = Films