import express from 'express'
import * as controller from '../controllers/contextController'
import * as middleware from '../middlewares/auth'

let router = express.Router()
router.use(middleware.auth)

router.route('/')
    .post(controller.addContext)
    .get(controller.getContexts)

router.route('/:id/')
    .put(controller.updateContext)
    .get(controller.getContext)
    .delete(controller.deleteContext)
    
export default router