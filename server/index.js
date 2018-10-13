const express = require('express')
const http = require('http')
const bodyParser = require('body-parser')
const Router = require('./lib/routes/index')

const settings = require('./db_settings.js') // 数据库设置参数

const mongoose = require('mongoose') //引用mongoose模块
mongoose.Promise = global.Promise
mongoose.connect('mongodb://'+ settings.host +':'+ settings.port +'/'+ settings.db, { useNewUrlParser: true }) //创建一个数据库连接
const db = mongoose.connection

db.on('error', console.error.bind(console, 'connection error:')) // 错误处理
db.once('open', function (callback) {
  // 数据库第一次开启的回调函数
  console.log('connect database success')
})

const app = express()

app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.text()) // for parsing application/json
app.use(bodyParser.urlencoded({
  extended: true,
})) // for parsing application/x-www-form-urlencoded

const port = 3002
const isDev = app.get('env') !== 'production'

Router(app)

if (isDev) {
  // add "reload" to express, see: https://www.npmjs.com/package/reload
  const server = http.createServer(app);

  server.listen(port, () => {
    console.log(`The server is running at http://localhost:${port}/`)
  })
} else {
  // static assets served by express.static() for production
  app.listen(port, () => {
    console.log(`The server is running at http://localhost:${port}/`)
  })
}
