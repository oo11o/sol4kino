const Sequelize = require('sequelize')
const dbConnect = require('../database')


const TestTable = dbConnect.define('test', {
        id: {
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
            type: Sequelize.BIGINT
        },
        test: {
            type: Sequelize.STRING(255),
            allowNull: true
        },
        test1: {
            type: Sequelize.STRING(255),
            allowNull: true
        },
        test2: {
            type: Sequelize.TEXT,
            allowNull: true
        },
        updated_at: {
            type: Sequelize.DATE,
            allowNull: true
        },

    },
    {
        createdAt: false,
        updatedAt: false,
        timestamps: true,
        freezeTableName: true
    })

module.exports = TestTable
