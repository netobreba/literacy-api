import Sequelize from 'sequelize'

// export let sequelize = new Sequelize('literacy_db', null, null, {
//     host: 'localhost',
//     dialect: 'sqlite',
//     storage: './data.sqlite'
// })

export let sequelize = new Sequelize('literacy', process.env.DB_USER || 'postgres', process.env.DB_PASSWORD || 'neto1234', {
    host: 'localhost',
    port: '5432',
    dialect: 'postgres',
    operatorsAliases: false
});