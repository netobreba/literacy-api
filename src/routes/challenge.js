import express from 'express'
import * as controller from '../controllers/challengeController'

let router = express.Router()

router.route('/')
    .post(controller.addChallenge)
    .get(controller.getChallenges)

router.route('/:id/')
    .put(controller.updateChallege)
    .get(controller.getChallenge)
    .delete(controller.deleteChallenge)
    
export default router