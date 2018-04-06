'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getUsers = exports.addUser = undefined;

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _httpStatusCodes = require('http-status-codes');

var _httpStatusCodes2 = _interopRequireDefault(_httpStatusCodes);

var _user = require('../models/user');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var fs = require('fs');
var fileType = require('file-type');

var router = _express2.default.Router();

var addUser = exports.addUser = function addUser(req, res) {
    var username = req.body.username;
    var password = req.body.password;
    var email = req.body.email;
    var firstName = req.body.firstName;
    var lastName = req.body.lastName;
    var data = { username: username,
        password: password,
        email: email,
        firstName: firstName,
        lastName: lastName };
    _user.User.create(data).then(function (user) {
        // falta colocar o try catch na chamada da função 'savePictureUser'
        var image = savePictureUser(req.body.image, user.username);
        user.update({ image: image }).then(function () {
            res.status(_httpStatusCodes2.default.CREATED).json(user).send();
        });
    }).catch(function (error) {
        res.status(_httpStatusCodes2.default.BAD_REQUEST).json(responseErroCatch(_httpStatusCodes2.default.BAD_REQUEST)).send();
    });
};

var getUsers = exports.getUsers = function getUsers(req, res) {
    _user.User.findAll().then(function (users) {
        res.status(_httpStatusCodes2.default.OK).json(users).send();
    });
};

/* 
    função reponsável por retornar um objeto que contem
    o erro da operação
*/
function responseErroCatch(code) {
    var erro = { error: _httpStatusCodes2.default.getStatusText(code) };
    return erro;
}

/* 
    funcão responsável por retornar um objeto com a menssagem
    de usuário não encontrado
*/
function responseNotFoundUser() {
    return { error: MSG_USER_NOT_FOUND };
}

/*
    função responsável por salvar a foto de perfil de um usuário
    em um diretório no sistema operacional
*/
function savePictureUser(codeBase64, pictureName) {
    var buffer = new Buffer(codeBase64, 'base64');
    var pictureExtension = fileType(buffer).ext;
    pictureName = pictureName + '.' + pictureExtension;
    fs.writeFileSync(BASE_URL_SAVE + pictureName, buffer);
    return BASE_URL_USER_PICTURE + pictureName;
}

var BASE_URL_USER_PICTURE = '/static/images/';
var BASE_URL_SAVE = 'public/images/';
var USER_NOT_FOUND = "usuário não existe";