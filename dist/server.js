'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getAbsoluteUri = undefined;

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

var _cors = require('cors');

var _cors2 = _interopRequireDefault(_cors);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();

app.use((0, _cors2.default)());
app.use(_bodyParser2.default.urlencoded({ limit: "50mb", extended: true }));
app.use(_bodyParser2.default.json({ limit: "50mb" }));

app.use('/static', _express2.default.static('public'));

app.use('/api/contexts', _context2.default);
app.use('/api/users', _user2.default);
app.use('/api/challenges', _challenge2.default);

app.listen(9000, function () {
    console.log('server listening in port 9000');
});

var DOMAIN_PRODUCTION = "https://app.sisalfa.dcx.ufpb.br/v1";
var getAbsoluteUri = exports.getAbsoluteUri = function getAbsoluteUri(req) {
    // req.protocol + "://" + req.get("host") + "/v1/..."
    if (process.env.PRODUCTION === "true") {
        console.log("entrou no if");
        return DOMAIN_PRODUCTION;
    }
    console.log("não entrou no if");
    return req.protocol + "://" + req.get("host");
};