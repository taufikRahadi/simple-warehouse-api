var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const productRouter = require('./routes/products')
const productInRouter = require('./routes/productin')
const productOutRouter = require('./routes/productout')
const authRouter = require('./routes/auth')
const auth = require('./middleware/auth')

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', auth, usersRouter);
app.use('/products', auth, productRouter)
app.use('/in', auth, productInRouter)
app.use('/out', auth, productOutRouter)
app.use('/auth', authRouter)

module.exports = app;
