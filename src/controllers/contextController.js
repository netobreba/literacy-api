import express from 'express'
import HttpStatus from 'http-status-codes'
import {Context} from '../models/context'
import {User} from '../models/user'
const fs = require('fs')
const fileType = require('file-type')
const crypto = require('crypto');

export const addContext = (req, res) => {
    const image = saveImageContext(req.body.image)
    const name = req.body.name
    const sound = req.body.sound
    const video = req.body.video
    const author = req.body.author
    let data = {name: name, 
                    sound: sound, 
                    video: video,
                    image: image,
                    authorId: author}
    Context.create(data).then((context) => {
        res.status(HttpStatus.CREATED).json(context).send()
    }).catch((error) => {
        console.log(error)
        res.status(HttpStatus.BAD_REQUEST)
            .json(responseErroCatch(HttpStatus.BAD_REQUEST))
            .send()
    })
}

export const updateContext = (req, res) => {
    const id = req.params.id
    Context.findById(id).then((context) => {
        if(context){
            const image = saveImageContext(req.body.image)
            const name = req.body.name
            const sound = req.body.sound
            const video = req.body.video
            const data = {name: name, 
                sound: sound, 
                video: video, 
                image:image}
            context.update(data).then(() => {
                res.status(HttpStatus.OK).json(context).send()
            }).catch((error) => {
                res.status(HttpStatus.BAD_REQUEST)
                    .json(responseErroCatch(HttpStatus.BAD_REQUEST))
                    .send()
            })
        }else{
            res.status(HttpStatus.NOT_FOUND).json(responseNotFoundContext()).send()
        }
    })
}

export const getContexts = (req, res) => {
    Context.findAll(
        {include: {model: User, attributes: {exclude: ATTRIBUTES_EXCLUDE_USER}},
        attributes: {exclude: ['authorId']}}
    ).then((contexts) => {
        res.status(HttpStatus.OK).json(contexts).send()
    })
}

export const getContext = (req, res) => {
    const id = req.params.id
    Context.findById(id, 
        {include: {model: User, attributes: {exclude: ATTRIBUTES_EXCLUDE_USER}},
        attributes: {exclude: ['authorId']}}
            ).then((context) => {
        if(context){
            res.status(HttpStatus.OK).json(context).send()
        }else{
            res.status(HttpStatus.NOT_FOUND).json(responseNotFoundContext()).send()
        }
    })
}

export const deleteContext = (req, res) => {
    const id = req.params.id
    Context.findById(id).then((context) => {
        if(context){
            context.destroy().then(() => {
                res.status(HttpStatus.OK).json(context).send()
            })
        }else{
            res.status(HttpStatus.NOT_FOUND).json(responseNotFoundContext()).send()
        }
    })
}

function responseErroCatch(code){
    let erro = {error: HttpStatus.getStatusText(code)}
    return erro
}

function responseNotFoundContext(){
    return {error: CONTEXT_NOT_FOUND}
}

const CONTEXT_NOT_FOUND = "contexto not found"
const ATTRIBUTES_EXCLUDE_USER = ['password', 'createdAt', 'updatedAt']

function saveImageContext(codeBase64){
    if(!codeBase64) return null;
    let buffer = new Buffer(codeBase64, 'base64')
    let imageExtension = fileType(buffer).ext
    let imageName = generateContextName()
    imageName = imageName + '.' + imageExtension
    fs.writeFileSync(BASE_URL_CONTEXT + imageName, buffer)
    return BASE_URL_CONTEXT_IMAGE + imageName
}

function generateContextName(){
    while(true){
        let currentDate = (new Date()).valueOf().toString()
        let random = Math.random().toString()
        let contextName = crypto.createHash('md5')
                        .update(currentDate + random)
                        .digest('hex');
        if(!fs.existsSync(BASE_URL_CONTEXT + contextName)){
            return contextName
        }
    }
}

const BASE_URL_CONTEXT_IMAGE = '/static/images/'
const BASE_URL_CONTEXT = 'public/images/'