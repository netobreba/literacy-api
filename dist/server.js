'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _context = require('./routes/context');

var _context2 = _interopRequireDefault(_context);

var _user = require('./routes/user');

var _user2 = _interopRequireDefault(_user);

var _challenge = require('./routes/challenge');

var _challenge2 = _interopRequireDefault(_challenge);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();

app.use(_bodyParser2.default.urlencoded({ extended: true }));
app.use(_bodyParser2.default.json());

app.use('/static', _express2.default.static('public'));

app.use('/api/contexts', _context2.default);
app.use('/api/users', _user2.default);
app.use('/api/challenges', _challenge2.default);

app.listen(9000, function () {
    console.log('server listening in port 9000');
});