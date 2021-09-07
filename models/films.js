const Sequelize = require('sequelize')
const dbConnect = require('../database')


const Films = dbConnect.define ('films', {
    id: {
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        type: Sequelize.BIGINT
    },
    name: {
        type: Sequelize.STRING(255),
        allowNull: true
    },
    name_original: {
        type: Sequelize.STRING(255),
        allowNull: true
    },
    description: {
        type: Sequelize.TEXT,
        allowNull: true
    },
    poster: {
        type: Sequelize.STRING(255),
        allowNull: true
    },
    image: {
        type: Sequelize.STRING(255),
        allowNull: true
    },
    url_kp: {
        type: Sequelize.STRING(255),
        allowNull: true
    },
    url_imdb: {
        type: Sequelize.STRING(255),
        allowNull: true
    },
    url_kt: {
        type: Sequelize.STRING(255),
        allowNull: true
    },
    rate_kp: {
        type: Sequelize.STRING(10),
        allowNull: true
    },
    rate_kp_count: {
        type: Sequelize.STRING(10),
        allowNull: true
    },
    rate_imdb: {
        type: Sequelize.STRING(10),
        allowNull: true
    },
    rate_imdb_count: {
        type: Sequelize.STRING(10),
        allowNull: true
    },
    actor: {
        type: Sequelize.JSON,
        allowNull: true
    },
    encyclopedia: {
        type: Sequelize.JSON,
        allowNull: true
    },
    created_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
    },
    updated_at: {
        type: Sequelize.DATE,
        allowNull: true
    },
    year: {
        type: Sequelize.INTEGER(11),
        allowNull: true
    },
    year_kp: {
        type: Sequelize.STRING(20),
        allowNull: true
    },

    status: {
        type: Sequelize.INTEGER(11),
        allowNull: true
    },
    post_id: {
        type: Sequelize.INTEGER(11),
        allowNull: true
    },
    similar: {
        type: Sequelize.INTEGER(11),
        allowNull: true
    }   },

    {
        createdAt: false,
        updatedAt: false,
        timestamps: true
    })

module.exports = Films
