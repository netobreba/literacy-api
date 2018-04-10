import jwt from 'jsonwebtoken'
import HttpStatus from 'http-status-codes'

export const SECRET_ENCODING_MESSAGE = 'literacy'

export let auth = (req, res, next) => {
    const token = req.headers['x-access-token']
    if(token){
        jwt.verify(token, SECRET_ENCODING_MESSAGE, (error, decoded) => {
            if(error != null){
                res.status(HttpStatus.UNAUTHORIZED).json({error:HttpStatus.getStatusText(HttpStatus.UNAUTHORIZED)}).send()                
            }
            else{
                req.user = decoded
                next()
            }
        })
    }else{
        res.status(HttpStatus.UNAUTHORIZED).json({error:HttpStatus.getStatusText(HttpStatus.UNAUTHORIZED)}).send()
    }
}