import express from 'express'
import * as controller from '../controllers/userController'
import * as middleware from '../middlewares/auth'

const router = express.Router()

router.route('/')
    .post(controller.addUser)
    .get(controller.getUsers)

router.route('/login/')
    .post(controller.login)

export default router