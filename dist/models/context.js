'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Context = undefined;

var _sequelize = require('sequelize');

var _sequelize2 = _interopRequireDefault(_sequelize);

var _database = require('../database');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Context = exports.Context = _database.sequelize.define('context', {
    name: {
        type: _sequelize2.default.STRING(128),
        allowNull: false
    },
    author: {
        type: _sequelize2.default.STRING(128)
    }
});

Context.sync();