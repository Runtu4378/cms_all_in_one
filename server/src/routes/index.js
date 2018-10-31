const site = require('./site')
const component = require('./component')
const route = require('./route')
const build = require('./build')

const router = (app) => {
  app.all('/api/*', function(req, res, next){
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Headers", "X-Requested-With,Content-Type,Accept")
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS")
    res.header("X-Powered-By",' 3.2.1')
    res.header("Content-Type", "application/json;charset=utf-8")
    next()
  })

  app.get('/', (req, res) => {
    res.send('hello world')
  })
  app.use('/api/site', site)
  app.use('/api/component', component)
  app.use('/api/route', route)

  app.use('/api/build', build)
}

module.exports = router
