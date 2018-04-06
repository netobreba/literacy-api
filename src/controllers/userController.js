import express from 'express'
import HttpStatus from 'http-status-codes'
import {User} from '../models/user'
const fs = require('fs')
const fileType = require('file-type')

const router = express.Router()

export const addUser = (req, res) => {
    const username = req.body.username
    const password = req.body.password
    const email = req.body.email
    const firstName = req.body.firstName
    const lastName = req.body.lastName
    const data = {username: username, 
                    password: password,
                    email: email,
                    firstName: firstName,
                    lastName: lastName}
    User.create(data).then((user) => {
        // falta colocar o try catch na chamada da função 'savePictureUser'
        const image = savePictureUser(req.body.image, user.username)
        user.update({image: image}).then(() => {
            res.status(HttpStatus.CREATED).json(user).send()
        })
    }).catch((error) => {
        res.status(HttpStatus.BAD_REQUEST)
            .json(responseErroCatch(HttpStatus.BAD_REQUEST))
            .send()
    })
}

export const getUsers = (req, res) => {
    User.findAll().then((users) => {
        res.status(HttpStatus.OK).json(users).send()
    })
}

/* 
    função reponsável por retornar um objeto que contem
    o erro da operação
*/
function responseErroCatch(code){
    let erro = {error: HttpStatus.getStatusText(code)}
    return erro
}

/* 
    funcão responsável por retornar um objeto com a menssagem
    de usuário não encontrado
*/
function responseNotFoundUser(){
    return {error: MSG_USER_NOT_FOUND}
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
const USER_NOT_FOUND = "usuário não existe"