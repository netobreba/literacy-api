import express from 'express'
import routeContext from './routes/context'
import bodyParser from 'body-parser'

//const bodyParser = require('body-parser')
const app = express()

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use('/api/context', routeContext)

app.listen(9000, () => {
    console.log('server listening in port 9000')
})