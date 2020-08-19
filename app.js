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
const reportRouter = require('./routes/report')
const auth = require('./middleware/auth')
const { UI } = require('bull-board')
const { setQueues } = require('bull-board')
const reportQueue = require('./queue/report')

setQueues([reportQueue])

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/api/v1/admin/queues', UI)
app.use('/api/v1/users', auth, usersRouter);
app.use('/api/v1/products', auth, productRouter)
app.use('/api/v1/in', auth, productInRouter)
app.use('/api/v1/out', auth, productOutRouter)
app.use('/api/v1/auth', authRouter)
app.use('/api/v1/report', auth, reportRouter)

module.exports = app;
