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

var _user = require('../models/user');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var fs = require('fs');
var fileType = require('file-type');

var addChallenge = exports.addChallenge = function addChallenge(req, res) {
    var word = req.body.word;
    var image = req.body.image;
    var sound = req.body.sound;
    var video = req.body.video;
    var context = req.body.context;
    var author = req.body.author;
    var data = { word: word,
        image: image, sound: sound,
        video: video, context: context, author: author };
    _challenge.Challenge.create(data).then(function (challenge) {
        res.status(_httpStatusCodes2.default.CREATED).json(context).send();
    }).catch(function (error) {
        res.status(_httpStatusCodes2.default.BAD_REQUEST).json(responseErroCatch(_httpStatusCodes2.default.BAD_REQUEST)).send();
    });
};

var updateChallege = exports.updateChallege = function updateChallege(req, res) {
    var word = req.body.word;
    var image = req.body.image;
    var sound = req.body.sound;
    var video = req.body.video;
    var context = req.body.context;
    var data = { word: word,
        image: image, sound: sound,
        video: video, context: context };

    var id = req.params.id;
    _challenge.Challenge.findById(id).then(function (challenge) {
        if (challge) {
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
    _challenge.Challenge.findAll().then(function (challenges) {
        res.status(_httpStatusCodes2.default.OK).json(challenges).send();
    });
};

var getChallenge = exports.getChallenge = function getChallenge(req, res) {
    var id = req.params.id;
    _challenge.Challenge.findById(id).then(function (challenge) {
        if (challege) {
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

var CHALLENGE_NOT_FOUND = "contexto não existe";