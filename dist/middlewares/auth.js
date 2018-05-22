'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.auth = exports.SECRET_ENCODING_MESSAGE = undefined;

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _httpStatusCodes = require('http-status-codes');

var _httpStatusCodes2 = _interopRequireDefault(_httpStatusCodes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SECRET_ENCODING_MESSAGE = exports.SECRET_ENCODING_MESSAGE = 'literacy';
var METHOD_AUTHORIZED = "GET";

var auth = exports.auth = function auth(req, res, next) {
    if (req.method === METHOD_AUTHORIZED) {
        next();
    } else {
        var token = req.headers['x-access-token'];
        if (token) {
            _jsonwebtoken2.default.verify(token, SECRET_ENCODING_MESSAGE, function (error, decoded) {
                if (error != null) {
                    res.status(_httpStatusCodes2.default.UNAUTHORIZED).json({ error: _httpStatusCodes2.default.getStatusText(_httpStatusCodes2.default.UNAUTHORIZED) }).send();
                } else {
                    req.user = decoded;
                    next();
                }
            });
        } else {
            res.status(_httpStatusCodes2.default.UNAUTHORIZED).json({ error: _httpStatusCodes2.default.getStatusText(_httpStatusCodes2.default.UNAUTHORIZED) }).send();
        }
    }
};