"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.responseUsernameOrPasswordIncorret = exports.responseNotFoundUser = exports.responseErroCatch = exports.USERNAME_OR_PASSWORD_INCORRET = exports.USER_NOT_FOUND = undefined;

var _httpStatusCodes = require("http-status-codes");

var _httpStatusCodes2 = _interopRequireDefault(_httpStatusCodes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var USER_NOT_FOUND = exports.USER_NOT_FOUND = "usuário não existe";
var USERNAME_OR_PASSWORD_INCORRET = exports.USERNAME_OR_PASSWORD_INCORRET = "username or password incorret";

var responseErroCatch = exports.responseErroCatch = function responseErroCatch(code) {
    var erro = { error: _httpStatusCodes2.default.getStatusText(code) };
    return erro;
};

var responseNotFoundUser = exports.responseNotFoundUser = function responseNotFoundUser() {
    return { error: USER_NOT_FOUND };
};

var responseUsernameOrPasswordIncorret = exports.responseUsernameOrPasswordIncorret = function responseUsernameOrPasswordIncorret() {
    return { error: USERNAME_OR_PASSWORD_INCORRET };
};