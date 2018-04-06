import express from 'express'
import * as controller from '../controllers/userController'

const router = express.Router()

router.route('/')
    .post(controller.addUser)
    .get(controller.getUsers)

export default router