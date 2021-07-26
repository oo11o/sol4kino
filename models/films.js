
const sequelize = require('../database')

class Films{

    // static async addSimilarFilm(film_id, similar_film_id, from = 'kp'){
    //     const [results] =  await sequelize.query("INSERT IGNORE INTO similars (`film_id`, `similar_film_id`, `from`)"
    //         +`VALUES(${film_id}, ${similar_film_id}, '${from}')`)
    //
    //     return results
    // }

    static async getIdByUrl(url){
        const [results] =  await sequelize.query(`SELECT id, status FROM films WHERE url_kp='${url}'`);
        return  results
    }

    static async getById(id){
        const [results] =  await sequelize.query(`SELECT * FROM films WHERE id='${id}'`);
        return  results
    }

    static async updateStatusById(id,status){
        const [results] =  await sequelize.query(`UPDATE films SET status = ${id} WHERE id = ${status}`);
        return  results
    }

    static async insertFilm(url,name,status = null){
        const [results] =  await sequelize.query(`INSERT INTO films(url_kp, name, status) VALUES ('${url}','${name}', '${status}')`);
        return  results
    }

}

module.exports = Films