'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _context = require('./routes/context');

var _context2 = _interopRequireDefault(_context);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//const bodyParser = require('body-parser')
var app = (0, _express2.default)();

app.use(_bodyParser2.default.urlencoded({ extended: true }));
app.use(_bodyParser2.default.json());

app.use('/api/context', _context2.default);

app.listen(9000, function () {
    console.log('server listening in port 9000');
});