import Sequelize from 'sequelize'

export let sequelize = new Sequelize('literacy_db', null, null, {
    host: 'localhost',
    dialect: 'sqlite',
    storage: './data.sqlite'
})