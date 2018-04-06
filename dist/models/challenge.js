'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Challenge = undefined;

var _sequelize = require('sequelize');

var _sequelize2 = _interopRequireDefault(_sequelize);

var _database = require('../database');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Challenge = exports.Challenge = _database.sequelize.define('challenge', {
    id: { type: _sequelize2.default.INTEGER, primaryKey: true, autoIncrement: true },
    word: { type: _sequelize2.default.STRING(256), allowNull: false },
    image: { type: _sequelize2.default.STRING(128), allowNull: false },
    sound: { type: _sequelize2.default.STRING(128) },
    video: { type: _sequelize2.default.STRING(128) }
});

//Challenge.sync()