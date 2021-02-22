import express from 'express';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import passport from 'passport';
import dotenv from 'dotenv';
import path from 'path';
import cors from 'cors';

dotenv.config();
import indexRouter from './routes';
import authRouter from './routes/auth';
import bookRouter from './routes/book';
import { sequelize } from './models';
import passportConfig from './passport';
import logger from './config/winston';
 
const app = express();
passportConfig();
app.set('port', process.env.PORT || 3000);
app.set('view engine', 'html')

// nunjucks.configure('views', {
//     express : app,
//     watch : true,
// })

app.use(cors());
app.use('/', express.static(path.join(__dirname, 'public')));
app.use('/uploads', express.static(path.join(__dirname, '/../uploads')));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(session({
    resave: false,
    saveUninitialized : false,
    secret: process.env.COOKIE_SECRET!,
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
    const error: { status?: number, message: string } = new Error(`${req.method} ${req.url} 라우터가 없습니다.`);
    error.status = 404;
    logger.info('hello');
    logger.error(error.message);
    next(error);
});

// app.use((err, req, res, next) => {
//     res.locals.message = err.message;
//     res.locals.error = process.env.NODE_ENV !== 'production' ? err : {};
//     res.status(err.status || 500);
//     res.render('error')
// })

app.listen(app.get('port'), () => {
    console.log(app.get('port'), '번 포트에서 대기 중')
})