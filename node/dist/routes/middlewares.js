var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "jsonwebtoken"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.verifyToken = exports.isNotLoggedIn = exports.isLoggedIn = void 0;
    const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
    const isLoggedIn = (req, res, next) => {
        if (req.isAuthenticated()) {
            next();
        }
        else {
            res.redirect('/?loginError=로그인이 필요합니다.');
        }
    };
    exports.isLoggedIn = isLoggedIn;
    const isNotLoggedIn = (req, res, next) => {
        if (!req.isAuthenticated()) {
            next();
        }
        else {
            res.redirect('/');
        }
    };
    exports.isNotLoggedIn = isNotLoggedIn;
    const verifyToken = (req, res, next) => {
        try {
            jsonwebtoken_1.default.verify(req.headers.authorization, process.env.JWT_SECRET);
            return next();
        }
        catch (error) {
            if (error.name === 'TokenExpiredError') {
                return res.status(419).json({
                    code: 419,
                    message: '토큰이 만료되었습니다. 다시 로그인을 해주세요',
                });
            }
            return res.status(401).json({
                code: 401,
                messgae: '유효하지 않은 토큰입니다.',
            });
        }
    };
    exports.verifyToken = verifyToken;
});
