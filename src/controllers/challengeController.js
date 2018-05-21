import express from 'express'
import HttpStatus from 'http-status-codes'
import {Challenge} from '../models/challenge'
import {Context} from '../models/context'
import {User} from '../models/user'
const fs = require('fs')
const fileType = require('file-type')
const crypto = require('crypto');

export const addChallenge = (req, res) => {
    const image = saveImageChallenge(req.body.image)
    const word = req.body.word
    const sound = req.body.sound
    const video = req.body.video
    const context = req.body.context
    const author = req.body.author
    const data = {word: word, 
                image: image, sound: sound, 
                video: video, contextId: context, authorId: author}
    Challenge.create(data).then((challenge) => {
        res.status(HttpStatus.CREATED).json(challenge).send()
    }).catch((error) => {
        res.status(HttpStatus.BAD_REQUEST)
            .json(responseErroCatch(HttpStatus.BAD_REQUEST))
            .send()
    })
}

export const updateChallege = (req, res) => {
    const image = saveImageChallenge(req.body.image)
    const word = req.body.word
    const sound = req.body.sound
    const video = req.body.video
    const context = req.body.context
    const data = {word: word, 
        image: image, sound: sound, 
        video: video, contextId: context}

    const id = req.params.id
    Challenge.findById(id).then((challenge) => {
        if(challenge){
            challenge.update(data).then(() => {
                res.status(HttpStatus.OK).json(challenge).send()
            }).catch((error) => {
                res.status(HttpStatus.BAD_REQUEST)
                    .json(responseErroCatch(HttpStatus.BAD_REQUEST))
                    .send()
            })
        }else{
            res.status(HttpStatus.NOT_FOUND).json(responseNotFoundChallenge()).send()
        }
    })
}

export const getChallenges = (req, res) => {
    Challenge.findAll(RULE_PRESENT_CHALLENGE).then((challenges) => {
        res.status(HttpStatus.OK).json(challenges).send()
    })
}

export const getChallenge = (req, res) => {
    const id = req.params.id
    Challenge.findById(id, RULE_PRESENT_CHALLENGE).then((challenge) => {
        if(challenge){
            res.status(HttpStatus.OK).json(challenge).send()
        }else{
            res.status(HttpStatus.NOT_FOUND).json(responseNotFoundChallenge()).send()
        }
    })
}

export const deleteChallenge = (req, res) => {
    const id = req.params.id
    Challenge.findById(id).then((challenge) => {
        if(challenge){
            challenge.destroy().then(() => {
                res.status(HttpStatus.OK).json(challenge).send()
            })
        }else{
            res.status(HttpStatus.NOT_FOUND).json(responseNotFoundChallenge()).send()
        }
    })
}

function responseErroCatch(code){
    let erro = {error: HttpStatus.getStatusText(code)}
    return erro
}

function responseNotFoundChallenge(){
    return {error: CHALLENGE_NOT_FOUND}
}

const RULE_PRESENT_CHALLENGE = {
    include: [{model: User, attributes: {exclude: ATTRIBUTES_EXCLUDE_USER}},
                {model: Context, attributes: {exclude: ['authorId']} ,
                    include: {model: User, attributes: {exclude: ATTRIBUTES_EXCLUDE_USER}}}],
    attributes: {exclude: ['authorId', 'contextId']}}
const CHALLENGE_NOT_FOUND = "challenge não existe"
const ATTRIBUTES_EXCLUDE_USER = ['password', 'createdAt', 'updatedAt']

function saveImageChallenge(codeBase64){
    if(!codeBase64) return null;
    let buffer = new Buffer(codeBase64, 'base64')
    let imageExtension = fileType(buffer).ext
    let imageName = generateChallengeName()
    imageName = imageName + '.' + imageExtension
    fs.writeFileSync(BASE_URL_CONTEXT + imageName, buffer)
    return BASE_URL_CONTEXT_IMAGE + imageName
}

function generateChallengeName(){
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
