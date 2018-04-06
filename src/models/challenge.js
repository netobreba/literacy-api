import Sequelize from 'sequelize'
import {sequelize} from '../database'

export const Challenge = sequelize.define('challenge', {
    id: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true},
    word: {type: Sequelize.STRING(256), allowNull: false},
    image: { type: Sequelize.STRING(128), allowNull: false},
    sound: { type: Sequelize.STRING(128)},
    video: { type: Sequelize.STRING(128)}
})

//Challenge.sync()