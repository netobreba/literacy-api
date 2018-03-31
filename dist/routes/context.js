'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _httpStatusCodes = require('http-status-codes');

var _httpStatusCodes2 = _interopRequireDefault(_httpStatusCodes);

var _context = require('../models/context');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

router.route('/').get(function (req, res) {
    _context.Context.findAll().then(function (contexts) {
        res.json(contexts).status(_httpStatusCodes2.default.OK).send();
    }).catch(function (error) {
        res.status(_httpStatusCodes2.default.INTERNAL_SERVER_ERROR).send();
    });
}).post(function (req, res) {
    var name = req.body.name;
    var author = req.body.author;
    var data = { name: name, author: author };

    _context.Context.create(data).then(function (context) {
        res.status(_httpStatusCodes2.default.CREATED).json(context).send();
    }).catch(function (error) {
        res.status(_httpStatusCodes2.default.BAD_REQUEST).json({ error: _httpStatusCodes2.default.getStatusText(_httpStatusCodes2.default.BAD_REQUEST) }).send();
    });
});

exports.default = router;