const createError = require('http-errors')
const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const hbs = require('hbs')
const mongoose = require('mongoose')
const debug = require('debug')('app');

const indexRouter = require('./routes/index')
const adminRouter = require('./routes/admin');
const apiRouter = require('./api/routes/api')

const app = express()

app.log = debug;

const session = require('express-session');
 
app.use(session({ secret: 'nordict-shop', cookie: { maxAge: 60 * 60 * 1000 } }));

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'hbs')

//connect database
const { MONGO_URL = 'mongodb+srv://admin:admin@12345678@nordic-shop-demo-agmy0.mongodb.net/nordic-shop?retryWrites=true&w=majority' } = process.env

mongoose
  .connect(MONGO_URL, { useNewUrlParser:true})
  .then(() => {
    console.log('connect success')
  })
  .catch(err => {
    console.log(new Error('error'))
  })


// register partials & helpers
hbs.registerPartials(`${__dirname}/views/partials`)
hbs.registerPartials(`${__dirname}/views/pages`)
require('./views/helpers')(hbs)

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

app.use('/', indexRouter)
app.use('/admin', adminRouter)
app.use('/api', apiRouter)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404))
})

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

module.exports = app
