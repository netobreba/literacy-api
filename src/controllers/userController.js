import express from 'express'
import HttpStatus from 'http-status-codes'
import {User} from '../models/user'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import * as middleware from '../middlewares/auth'
import * as exceptions from '../exceptions/userExceptions'
const fs = require('fs')
const fileType = require('file-type')

const router = express.Router()

export const login = (req, res) => {
    User.findOne({where: {username: req.body.username}}).then((user) => {
        if(user){
            console.log(user.get({plain:true}))
            bcrypt.compare(req.body.password, user.get({plain:true}).password).then((result) => {
                if(result){
                    const token = jwt.sign(user.get({plain:true}), middleware.SECRET_ENCODING_MESSAGE)
                    res.status(HttpStatus.OK).json({token: token}).send()                    
                }else{
                    res.status(HttpStatus.UNAUTHORIZED).json(exceptions.responseUsernameOrPasswordIncorret()).send()                    
                }
            })
        }else{
            res.status(HttpStatus.UNAUTHORIZED).json(exceptions.responseUsernameOrPasswordIncorret()).send()
        }
    })
}

export const addUser = (req, res) => {
    bcrypt.hash(req.body.password, 12).then((result) => {
        const username = req.body.username
        const email = req.body.email
        const firstName = req.body.firstName
        const lastName = req.body.lastName
        const data = {username: username, 
                    password: result,
                    email: email,
                    firstName: firstName,
                    lastName: lastName}
        User.create(data).then((user) => {
            // falta colocar o try catch na chamada da função 'savePictureUser'
            const photo = savePictureUser(req.body.photo, user.username)
            user.update({photo: photo}).then(() => {
                res.status(HttpStatus.CREATED).json(user).send()
            })
        }).catch((error) => {
            res.status(HttpStatus.BAD_REQUEST)
                .json(exceptions.responseErroCatch(HttpStatus.BAD_REQUEST))
                .send()
        })
    })
}

export const getUsers = (req, res) => {
    User.findAll().then((users) => {
        res.status(HttpStatus.OK).json(users).send()
    })
}

/*
    função responsável por salvar a foto de perfil de um usuário
    em um diretório no sistema operacional
*/
function savePictureUser(codeBase64, pictureName){
    let buffer = new Buffer(codeBase64, 'base64')
    let pictureExtension = fileType(buffer).ext
    pictureName = pictureName + '.' + pictureExtension
    fs.writeFileSync(BASE_URL_SAVE + pictureName, buffer)
    return BASE_URL_USER_PICTURE + pictureName
}

const BASE_URL_USER_PICTURE = '/static/images/'
const BASE_URL_SAVE = 'public/images/'