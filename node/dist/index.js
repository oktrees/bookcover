var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "express", "morgan", "cookie-parser", "express-session", "passport", "dotenv", "path", "cors", "./routes", "./routes/auth", "./routes/book", "./models", "./passport", "./config/winston"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const express_1 = __importDefault(require("express"));
    const morgan_1 = __importDefault(require("morgan"));
    const cookie_parser_1 = __importDefault(require("cookie-parser"));
    const express_session_1 = __importDefault(require("express-session"));
    const passport_1 = __importDefault(require("passport"));
    const dotenv_1 = __importDefault(require("dotenv"));
    const path_1 = __importDefault(require("path"));
    const cors_1 = __importDefault(require("cors"));
    dotenv_1.default.config();
    const routes_1 = __importDefault(require("./routes"));
    const auth_1 = __importDefault(require("./routes/auth"));
    const book_1 = __importDefault(require("./routes/book"));
    const models_1 = require("./models");
    const passport_2 = __importDefault(require("./passport"));
    const winston_1 = __importDefault(require("./config/winston"));
    const app = express_1.default();
    passport_2.default();
    app.set('port', process.env.PORT || 3000);
    app.set('view engine', 'html');
    // nunjucks.configure('views', {
    //     express : app,
    //     watch : true,
    // })
    app.use(cors_1.default());
    app.use('/', express_1.default.static(path_1.default.join(__dirname, 'public')));
    app.use('/uploads', express_1.default.static(path_1.default.join(__dirname, '/../uploads')));
    app.use(express_1.default.json());
    app.use(express_1.default.urlencoded({ extended: false }));
    app.use(cookie_parser_1.default(process.env.COOKIE_SECRET));
    app.use(express_session_1.default({
        resave: false,
        saveUninitialized: false,
        secret: process.env.COOKIE_SECRET,
        cookie: {
            httpOnly: true,
            secure: false,
        },
        name: 'session-cookie',
    }));
    app.use(passport_1.default.initialize());
    app.use(passport_1.default.session());
    models_1.sequelize.sync({ force: false })
        .then(() => {
        console.log('데이터베이스 연결 성공');
    })
        .catch((error) => {
        console.error(error);
    });
    if (process.env.NODE_ENV === 'production') {
        app.use(morgan_1.default('combined'));
    }
    else {
        app.use(morgan_1.default('dev'));
    }
    app.use('/', routes_1.default);
    ;
    app.use('/auth', auth_1.default);
    app.use('/book', book_1.default);
    app.use((req, res, next) => {
        const error = new Error(`${req.method} ${req.url} 라우터가 없습니다.`);
        error.status = 404;
        winston_1.default.info('hello');
        winston_1.default.error(error.message);
        next(error);
    });
    // app.use((err, req, res, next) => {
    //     res.locals.message = err.message;
    //     res.locals.error = process.env.NODE_ENV !== 'production' ? err : {};
    //     res.status(err.status || 500);
    //     res.render('error')
    // })
    app.listen(app.get('port'), () => {
        console.log(app.get('port'), '번 포트에서 대기 중');
    });
});
