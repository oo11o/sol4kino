const Sequelize = require('sequelize')
const dbConnect = require('../database')

const Similars = dbConnect.define ('similars',
    {
        id: {
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
            type: Sequelize.BIGINT
        },
        film_id: {
            type: Sequelize.INTEGER(11),
            allowNull: false
        },
        similar_film_id: {
            type: Sequelize.INTEGER(11),
            allowNull: true
        },
        post_id: {
            type: Sequelize.INTEGER(11),
            allowNull: true
        },
        from: {
            type: Sequelize.STRING(10),
            allowNull: true
        },
        position: {
            type: Sequelize.INTEGER(),
            allowNull: true
        },
        status: {
            type: Sequelize.STRING(7),
            allowNull: true
        },
        created_at: {
            type: Sequelize.DATE,
            defaultValue: Sequelize.NOW
        },

        updated_at: {
            type: Sequelize.DATE,
            allowNull: true
        }
    },
    {
        createdAt: false,
        updatedAt: false,
        timestamps: true
    })

module.exports = Similars
