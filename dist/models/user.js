'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.User = undefined;

var _sequelize = require('sequelize');

var _sequelize2 = _interopRequireDefault(_sequelize);

var _database = require('../database');

var _context = require('./context');

var _challenge = require('./challenge');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var User = exports.User = _database.sequelize.define('user', {
    id: { type: _sequelize2.default.INTEGER, primaryKey: true, autoIncrement: true },
    username: { type: _sequelize2.default.STRING(128), allowNull: false, unique: true },
    password: { type: _sequelize2.default.STRING(128), allowNull: false },
    email: { type: _sequelize2.default.STRING(128), allowNull: false, unique: true },
    firstName: { type: _sequelize2.default.STRING(128), allowNull: false },
    lastName: { type: _sequelize2.default.STRING(128) },
    photo: _sequelize2.default.STRING(128)
});

_context.Context.belongsTo(User, { foreignKey: { allowNull: false, name: 'authorId' } });
_challenge.Challenge.belongsTo(User, { foreignKey: { allowNull: false, name: 'authorId' } });
_challenge.Challenge.belongsTo(_context.Context, { foreignKey: { allowNull: false, name: 'contextId' } });

User.sync();
_context.Context.sync();
_challenge.Challenge.sync();