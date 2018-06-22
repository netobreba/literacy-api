'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.deleteChallenge = exports.getChallenge = exports.getChallenges = exports.updateChallege = exports.addChallenge = undefined;

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _httpStatusCodes = require('http-status-codes');

var _httpStatusCodes2 = _interopRequireDefault(_httpStatusCodes);

var _challenge = require('../models/challenge');

var _context = require('../models/context');

var _user = require('../models/user');

var _server = require('../server.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var fs = require('fs');
var fileType = require('file-type');
var crypto = require('crypto');
var addChallenge = exports.addChallenge = function addChallenge(req, res) {
    var image = saveImageChallenge(req.body.image, req);
    var word = req.body.word;
    var sound = req.body.sound;
    var video = req.body.video;
    var context = req.body.context;
    // const author = req.body.author
    var data = { word: word,
        image: image, sound: sound,
        video: video, contextId: context, authorId: req.user.id };
    _challenge.Challenge.create(data).then(function (challenge) {
        res.status(_httpStatusCodes2.default.CREATED).json(challenge).send();
    }).catch(function (error) {
        res.status(_httpStatusCodes2.default.BAD_REQUEST).json(responseErroCatch(_httpStatusCodes2.default.BAD_REQUEST)).send();
    });
};

var updateChallege = exports.updateChallege = function updateChallege(req, res) {
    var image = saveImageChallenge(req.body.image, req);
    var word = req.body.word;
    var sound = req.body.sound;
    var video = req.body.video;
    var context = req.body.context;
    var data = { word: word,
        image: image, sound: sound,
        video: video, contextId: context };

    var id = req.params.id;
    _challenge.Challenge.findById(id).then(function (challenge) {
        if (challenge) {
            challenge.update(data).then(function () {
                res.status(_httpStatusCodes2.default.OK).json(challenge).send();
            }).catch(function (error) {
                res.status(_httpStatusCodes2.default.BAD_REQUEST).json(responseErroCatch(_httpStatusCodes2.default.BAD_REQUEST)).send();
            });
        } else {
            res.status(_httpStatusCodes2.default.NOT_FOUND).json(responseNotFoundChallenge()).send();
        }
    });
};

var getChallenges = exports.getChallenges = function getChallenges(req, res) {
    // {include: {model: User, attributes: {exclude: ATTRIBUTES_EXCLUDE_USER}},
    //     attributes: {exclude: ['authorId']}}
    _challenge.Challenge.findAll({
        include: [{ model: _user.User, attributes: { exclude: ATTRIBUTES_EXCLUDE_USER } }, { model: _context.Context, attributes: { exclude: ['authorId'] }, include: { model: _user.User, attributes: { exclude: ["password"] } } }],
        attributes: { exclude: ["authorId", "contextId"] }
    }).then(function (challenges) {
        res.status(_httpStatusCodes2.default.OK).json(challenges).send();
    });
};

var getChallenge = exports.getChallenge = function getChallenge(req, res) {
    var id = req.params.id;
    _challenge.Challenge.findById(id, RULE_PRESENT_CHALLENGE).then(function (challenge) {
        if (challenge) {
            res.status(_httpStatusCodes2.default.OK).json(challenge).send();
        } else {
            res.status(_httpStatusCodes2.default.NOT_FOUND).json(responseNotFoundChallenge()).send();
        }
    });
};

var deleteChallenge = exports.deleteChallenge = function deleteChallenge(req, res) {
    var id = req.params.id;
    _challenge.Challenge.findById(id).then(function (challenge) {
        if (challenge) {
            challenge.destroy().then(function () {
                res.status(_httpStatusCodes2.default.OK).json(challenge).send();
            });
        } else {
            res.status(_httpStatusCodes2.default.NOT_FOUND).json(responseNotFoundChallenge()).send();
        }
    });
};

function responseErroCatch(code) {
    var erro = { error: _httpStatusCodes2.default.getStatusText(code) };
    return erro;
}

function responseNotFoundChallenge() {
    return { error: CHALLENGE_NOT_FOUND };
}

var ATTRIBUTES_EXCLUDE_USER = ['password', 'createdAt', 'updatedAt'];
var RULE_PRESENT_CHALLENGE = {
    include: [{ model: _user.User, attributes: { exclude: ATTRIBUTES_EXCLUDE_USER } }, { model: _context.Context, attributes: { exclude: ['authorId'] }, include: { model: _user.User, attributes: { exclude: ["password"] } } }],
    attributes: { exclude: ["authorId", "contextId"] }
};
var CHALLENGE_NOT_FOUND = "challenge não existe";

function saveImageChallenge(codeBase64, req) {
    if (!codeBase64) return null;
    var buffer = new Buffer(codeBase64, 'base64');
    var imageExtension = fileType(buffer).ext;
    var imageName = generateChallengeName();
    imageName = imageName + '.' + imageExtension;
    fs.writeFileSync(BASE_URL_CONTEXT + imageName, buffer);
    return (0, _server.getAbsoluteUri)(req) + BASE_URL_CONTEXT_IMAGE + imageName;
}

function generateChallengeName() {
    while (true) {
        var currentDate = new Date().valueOf().toString();
        var random = Math.random().toString();
        var contextName = crypto.createHash('md5').update(currentDate + random).digest('hex');
        if (!fs.existsSync(BASE_URL_CONTEXT + contextName)) {
            return contextName;
        }
    }
}

var BASE_URL_CONTEXT_IMAGE = '/static/images/';
var BASE_URL_CONTEXT = 'public/images/';