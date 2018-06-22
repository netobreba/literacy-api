'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getUsers = exports.addUser = exports.login = exports.profile = undefined;

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _httpStatusCodes = require('http-status-codes');

var _httpStatusCodes2 = _interopRequireDefault(_httpStatusCodes);

var _user = require('../models/user');

var _bcrypt = require('bcrypt');

var _bcrypt2 = _interopRequireDefault(_bcrypt);

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _auth = require('../middlewares/auth');

var middleware = _interopRequireWildcard(_auth);

var _userExceptions = require('../exceptions/userExceptions');

var exceptions = _interopRequireWildcard(_userExceptions);

var _server = require('../server.js');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var fs = require('fs');
var fileType = require('file-type');


var router = _express2.default.Router();

var profile = exports.profile = function profile(req, res) {
    var token = req.headers['x-access-token'];
    if (token) {
        _jsonwebtoken2.default.verify(token, _auth.SECRET_ENCODING_MESSAGE, function (error, decoded) {
            if (error != null) {
                res.status(_httpStatusCodes2.default.UNAUTHORIZED).json({ error: _httpStatusCodes2.default.getStatusText(_httpStatusCodes2.default.UNAUTHORIZED) }).send();
            } else {
                delete decoded.password;
                res.status(_httpStatusCodes2.default.OK).json(decoded).send();
            }
        });
    } else {
        res.status(_httpStatusCodes2.default.UNAUTHORIZED).json({ error: _httpStatusCodes2.default.getStatusText(_httpStatusCodes2.default.UNAUTHORIZED) }).send();
    }
};

var login = exports.login = function login(req, res) {
    _user.User.findOne({ where: { username: req.body.username } }).then(function (user) {
        if (user) {
            console.log(user.get({ plain: true }));
            _bcrypt2.default.compare(req.body.password, user.get({ plain: true }).password).then(function (result) {
                if (result) {
                    var token = _jsonwebtoken2.default.sign(user.get({ plain: true }), middleware.SECRET_ENCODING_MESSAGE);
                    res.status(_httpStatusCodes2.default.OK).json({ token: token }).send();
                } else {
                    res.status(_httpStatusCodes2.default.UNAUTHORIZED).json(exceptions.responseUsernameOrPasswordIncorret()).send();
                }
            });
        } else {
            res.status(_httpStatusCodes2.default.UNAUTHORIZED).json(exceptions.responseUsernameOrPasswordIncorret()).send();
        }
    });
};

var addUser = exports.addUser = function addUser(req, res) {
    _bcrypt2.default.hash(req.body.password, 12).then(function (result) {
        var username = req.body.username;
        var email = req.body.email;
        var firstName = req.body.firstName;
        var lastName = req.body.lastName;
        var data = { username: username,
            password: result,
            email: email,
            firstName: firstName,
            lastName: lastName };
        _user.User.create(data).then(function (user) {
            if (req.body.photo) {
                var photo = savePhotoUser(req.body.photo, user.username, req);
                user.update({ photo: photo }).then(function () {
                    res.status(_httpStatusCodes2.default.CREATED).json(user).send();
                });
            } else {
                res.status(_httpStatusCodes2.default.CREATED).json(user).send();
            }
        }).catch(function (error) {
            res.status(_httpStatusCodes2.default.BAD_REQUEST).json(exceptions.responseErroCatch(_httpStatusCodes2.default.BAD_REQUEST)).send();
        });
    });
};

var getUsers = exports.getUsers = function getUsers(req, res) {
    _user.User.findAll({ attributes: { exclude: ["password"] } }).then(function (users) {
        res.status(_httpStatusCodes2.default.OK).json(users).send();
    });
};

/*
    função responsável por salvar a foto de perfil de um usuário
    em um diretório no sistema operacional
*/
function savePhotoUser(codeBase64, pictureName, req) {
    var buffer = new Buffer(codeBase64, 'base64');
    var pictureExtension = fileType(buffer).ext;
    pictureName = pictureName + '.' + pictureExtension;
    fs.writeFileSync(BASE_URL_SAVE + pictureName, buffer);
    return (0, _server.getAbsoluteUri)(req) + BASE_URL_USER_PICTURE + pictureName;
}

var BASE_URL_USER_PICTURE = '/static/images/';
var BASE_URL_SAVE = 'public/images/';