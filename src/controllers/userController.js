import express from 'express'
import HttpStatus from 'http-status-codes'
import {User} from '../models/user'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import * as middleware from '../middlewares/auth'
import * as exceptions from '../exceptions/userExceptions'
const fs = require('fs')
const fileType = require('file-type')
import {SECRET_ENCODING_MESSAGE} from '../middlewares/auth'
import {getAbsoluteUri} from '../server.js'

const router = express.Router()

export const profile = (req, res) => {
    const token = req.headers['x-access-token']
    if(token){
        jwt.verify(token, SECRET_ENCODING_MESSAGE, (error, decoded) => {
            if(error != null){
                res.status(HttpStatus.UNAUTHORIZED).json({error:HttpStatus.getStatusText(HttpStatus.UNAUTHORIZED)}).send()                
            }
            else{
                delete decoded.password
                res.status(HttpStatus.OK).json(decoded).send()
            }
        })
    }else{
        res.status(HttpStatus.UNAUTHORIZED).json({error:HttpStatus.getStatusText(HttpStatus.UNAUTHORIZED)}).send()
    }
}

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
            if(req.body.photo){
                const photo = savePhotoUser(req.body.photo, user.username, req)
                user.update({photo: photo}).then(() => {
                    res.status(HttpStatus.CREATED).json(user).send()
                })
            }else{
                res.status(HttpStatus.CREATED).json(user).send()
            }
        }).catch((error) => {
            res.status(HttpStatus.BAD_REQUEST)
                .json(exceptions.responseErroCatch(HttpStatus.BAD_REQUEST))
                .send()
        })
    })
}

export const getUsers = (req, res) => {
    User.findAll({attributes: {exclude: ["password"]}}).then((users) => {
        res.status(HttpStatus.OK).json(users).send()
    })
}

/*
    função responsável por salvar a foto de perfil de um usuário
    em um diretório no sistema operacional
*/
function savePhotoUser(codeBase64, pictureName, req){
    let buffer = new Buffer(codeBase64, 'base64')
    let pictureExtension = fileType(buffer).ext
    pictureName = pictureName + '.' + pictureExtension
    fs.writeFileSync(BASE_URL_SAVE + pictureName, buffer)
    return getAbsoluteUri(req) + BASE_URL_USER_PICTURE + pictureName
}

const BASE_URL_USER_PICTURE = '/static/images/'
const BASE_URL_SAVE = 'public/images/'