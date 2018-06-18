'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.sequelize = undefined;

var _sequelize = require('sequelize');

var _sequelize2 = _interopRequireDefault(_sequelize);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// export let sequelize = new Sequelize('literacy_db', null, null, {
//     host: 'localhost',
//     dialect: 'sqlite',
//     storage: './data.sqlite'
// })

var sequelize = exports.sequelize = new _sequelize2.default('literacy', process.env.DB_USER || 'postgres', process.env.DB_PASSWORD || 'oigre$199210', {
    host: 'localhost',
    port: '5432',
    dialect: 'postgres',
    operatorsAliases: false
});