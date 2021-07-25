
const sequelize = require('../database')

class Similars {

    static async addSimilarFilm(film_id, similar_film_id, from = 'kp'){
        const [results] =  await sequelize.query("INSERT IGNORE INTO similars (`film_id`, `similar_film_id`, `from`)"
            +`VALUES(${film_id}, ${similar_film_id}, '${from}')`)

        return results
    }

    static async getSimilarFilms(id){
        const [results] =  await sequelize.query(`SELECT * FROM similars WHERE id=${id}`);
        return  results
    }


}

module.exports = Similars