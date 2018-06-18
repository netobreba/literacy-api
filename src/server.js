import express from 'express'
import bodyParser from 'body-parser'
import routeContext from './routes/context'
import routeUser from './routes/user'
import routeChallenge from './routes/challenge'

const app = express()

app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }))
app.use(bodyParser.json({limit: "50mb"}))

app.use('/static',express.static('public'))

app.use('/api/contexts', routeContext)
app.use('/api/users', routeUser)
app.use('/api/challenges', routeChallenge)

app.listen(9000, () => {
    console.log('server listening in port 9000')
})