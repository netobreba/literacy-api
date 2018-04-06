import Sequelize from 'sequelize'
import {sequelize} from '../database'
import {Context} from './context'
import {Challenge} from './challenge'

export const User = sequelize.define('user', {
    id: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true},
    username: {type: Sequelize.STRING(128), allowNull: false},
    password: {type: Sequelize.STRING(128), allowNull: false},
    email: {type: Sequelize.STRING(128), allowNull: false},
    firstName: {type: Sequelize.STRING(128), allowNull: false},
    lastName: {type: Sequelize.STRING(128)},
    image: Sequelize.STRING(128)
})

Context.belongsTo(User, {foreignKey: {allowNull: false, name: 'authorId'}})
Challenge.belongsTo(User, {foreignKey: {allowNull: false, name: 'authorId'}})
Challenge.belongsTo(Context, {foreignKey: {allowNull: false, name: 'contextId'}})

User.sync()
Context.sync()
Challenge.sync()