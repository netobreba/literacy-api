'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _challengeController = require('../controllers/challengeController');

var controller = _interopRequireWildcard(_challengeController);

var _auth = require('../middlewares/auth');

var middleware = _interopRequireWildcard(_auth);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();
router.use(middleware.auth);

router.route('/').post(controller.addChallenge).get(controller.getChallenges);

router.route('/:id/').put(controller.updateChallege).get(controller.getChallenge).delete(controller.deleteChallenge);

exports.default = router;