const express = require('express');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const passport = require('passport');
const dotenv = require('dotenv');
const path = require('path');
const nunjucks = require('nunjucks')

dotenv.config();
const indexRouter = require('./routes');
const authRouter = require('./routes/auth');
const bookRouter = require('./routes/book');
const router = require('./routes');
const { sequelize } = require('./models');
const passportConfig = require('./passport');
const logger = require('./logger');
 
const app = express();
passportConfig();
app.set('port', process.env.PORT || 3000);
app.set('view engine', 'html')

nunjucks.configure('views', {
    express : app,
    watch : true,
})

app.use('/', express.static(path.join(__dirname, 'public')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(session({
    resave: false,
    saveUninitialized : false,
    secret: process.env.COOKIE_SECRET,
    cookie: {
        httpOnly : true,
        secure: false,
    },
    name: 'session-cookie',
}));


app.use(passport.initialize());
app.use(passport.session());

sequelize.sync({ force: false })
    .then(() => {
        console.log('데이터베이스 연결 성공');
    })
    .catch((error) => {
        console.error(error);
    })


if (process.env.NODE_ENV === 'production') {
    app.use(morgan('combined'));
}else {
    app.use(morgan('dev'));
}

app.use('/', indexRouter);;
app.use('/auth', authRouter);
app.use('/book', bookRouter);

app.use((req, res, next) => {
    const error = new Error(`${req.method} ${req.url} 라우터가 없습니다.`);
    error.status = 404;
    logger.info('hello');
    logger.error(error.message);
    next(error);
});

app.use((err, req, res, next) => {
    res.locals.message = err.message;
    res.locals.error = process.env.NODE_ENV !== 'production' ? err : {};
    res.status(err.status || 500);
    res.render('error')
})

app.listen(app.get('port'), () => {
    console.log(app.get('port'), '번 포트에서 대기 중')
})