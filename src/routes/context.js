import express from 'express'
import HttpStatus from 'http-status-codes'
import {Context} from '../models/context'

let router = express.Router()

router.route('/')
    .get((req, res) => {
        Context.findAll().then((contexts) => {
            res.json(contexts).status(HttpStatus.OK).send()
        }).catch((error) => {
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).send()
        })
    })

    .post((req, res) => {
        const name = req.body.name
        const author = req.body.author
        const data = {name: name, author: author}
        
        Context.create(data).then((context) => {
            res.status(HttpStatus.CREATED).json(context).send()
        }).catch((error) => {
            res.status(HttpStatus.BAD_REQUEST)
                .json({error: HttpStatus.getStatusText(HttpStatus.BAD_REQUEST)})
                .send()
        })
        
    })

export default router