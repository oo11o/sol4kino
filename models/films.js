
const sequelize = require('../database')

class Films{

    // static async addSimilarFilm(film_id, similar_film_id, from = 'kp'){
    //     const [results] =  await sequelize.query("INSERT IGNORE INTO similars (`film_id`, `similar_film_id`, `from`)"
    //         +`VALUES(${film_id}, ${similar_film_id}, '${from}')`)
    //
    //     return results
    // }

    static async getIdByUrl(url){
        const [results] =  await sequelize.query(`SELECT id FROM films WHERE url_kp='${url}'`);
        return  results
    }


}

module.exports = Films