
const sequelize = require('../database')

class Similars {

    static async addSimilarFilm(film_id, similar_film_id, position = NULL, from = 'kp'){
        const [results] =  await sequelize.query("INSERT IGNORE INTO similars (`film_id`, `similar_film_id`, `position`, `from`)"
            +`VALUES(${film_id}, ${similar_film_id}, ${position}, '${from}')`)
        return results
    }

    static async getSimilarFilms(id){
        const [results] =  await sequelize.query(`SELECT * FROM similars WHERE id=${id}`);
        return  results
    }

    static  async getSimilarItem(idFilm,idSimilarFilm){
        const [results] =  await sequelize.query(`SELECT * FROM similars WHERE film_id = ${idFilm} AND similar_film_id = ${idSimilarFilm}`);
       return  results
    }


}

module.exports = Similars