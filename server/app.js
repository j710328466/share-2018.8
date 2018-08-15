import express from 'express'
import './mongo/mongo'
import router from './routes/index'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import session from 'express-session'
import chalk from 'chalk'
import http from 'http'

const config = require('config-lite')(__dirname)
const app = express()
var server = http.Server(app)

app.all('*', function (req, res, next) {
  res.header('Access-Control-Allow-Origin', req.headers.origin || '*')
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With')
  res.header('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS')
  //  可以带cookies
  res.header('Access-Control-Allow-Credentials', true)
  res.header('X-Powered-By', ' 3.2.1')
  //  方便返回json而已
  res.header('Content-Type', 'application/json;charset=utf-8')
  if (req.method === 'OPTIONS') {
    //  让options请求快速返回
    res.sendStatus(200)
  } else {
    next()
  }
})

app.use(bodyParser.json())
app.use(cookieParser())
app.use(bodyParser.urlencoded({ limit: '20mb', extended: true }))
app.use(session({
  name: config.session.name,
  secret: config.session.secret,
  resave: true,
  saveUninitialized: false,
  cookie: config.session.cookie
  // store: new MongoStore({
  //     url: config.url
  // })
}))

router(app)

server.listen(config.port, () => {
  console.log(
    chalk.green('this app is running at port:' + config.port)
  )
})
