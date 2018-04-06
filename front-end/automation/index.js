const express = require('express'),
  mongodb = require('mongodb'),
  app = express(),
  bodyParser = require('body-parser'),
  validator = require('express-validator'),
  logger = require('morgan'),
  errorHandler = require('errorhandler'),
  compression = require('compression'),
  exphbs = require('express-handlebars'),
  url = 'mongodb://localhost:27017/fio',
  ReactDOM = require('react-dom'),
  ReactDOMServer = require('react-dom/server'),
  React = require('react')

require('babel-register')({
  presets: ['react']
})

const Autocomplete = React.createFactory(require('./src/autocomplete.jsx')),
  port = 3000

mongodb.MongoClient.connect(url, function(err, db) {
  if (err) {
    console.error(err)
    process.exit(1)
  }
  app.use(compression())
  app.use(logger('dev'))
  app.use(errorHandler())
  app.use(bodyParser.json())
  app.use(validator())
  app.use(express.static('public'))
  app.engine('handlebars', exphbs())
  app.set('view engine', 'handlebars')

  app.use(function(req, res, next) {
    req.scripts = db.collection('scripts')
    return next()
  })

  app.get('/scripts', function(req, res, next) {
    req.scripts.find({}, {
      sort: {
        _id: -1
      }
    }).toArray(function(err, docs) {
      if (err) return next(err)
      return res.json(docs)
    })
  })


  app.post('/scripts', function(req, res, next) {
    req.checkBody('name', 'Invalid name in body').notEmpty()
    var errors = req.validationErrors()
    if (errors) return next(errors)
    console.log(req.body)
  })

  app.get('/', function(req, res, next) {
    var url = 'http://localhost:' + port + '/scripts'
    req.scripts.find({}, {
      sort: {
        _id: -1
      }
    }).toArray(function(err, scripts) {
      if (err) return next(err)
      res.render('index', {
        autocomplete: ReactDOMServer.renderToString(Autocomplete({
          options: scripts,
          url: url
        })),
        data: `<script type="text/javascript">
                window.__autocomplete_data = {
                  scripts: ${JSON.stringify(scripts, null, 2)},
                  url: "${url}"
                }
              </script>`
      })
    })
  })

  app.listen(port)
})
