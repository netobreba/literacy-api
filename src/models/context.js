import Sequelize from 'sequelize'
import {sequelize} from '../database'

export let Context = sequelize.define('context', {
    name: {
        type: Sequelize.STRING(128),
        allowNull: false
    },
    author: {
        type: Sequelize.STRING(128)
    }
})

Context.sync()