var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "express", "passport", "jsonwebtoken", "./middlewares", "../models/user"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const express_1 = __importDefault(require("express"));
    const passport_1 = __importDefault(require("passport"));
    const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
    const middlewares_1 = require("./middlewares");
    const user_1 = __importDefault(require("../models/user"));
    const router = express_1.default.Router();
    router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        let data = yield user_1.default.findAll({ attributes: ['contact'], where: { id: 1 } });
        res.send(data[0]);
    }));
    router.post('/', (req, res, next) => {
        passport_1.default.authenticate('local', (userError, user, info) => {
            if (userError) {
                console.error(userError);
                return next(userError);
            }
            if (!user) {
                return res.send({ result: false, message: info.message });
            }
            return req.login(user, (loginError) => {
                if (loginError) {
                    console.error(loginError);
                    return next(loginError);
                }
                const token = jsonwebtoken_1.default.sign({
                    name: user.name,
                }, process.env.JWT_SECRET, {
                    expiresIn: '365d',
                    issuer: 'oktree',
                });
                return res.json({
                    code: 200,
                    message: '토큰이 발급되었습니다.',
                    token,
                });
            });
        })(req, res, next);
    });
    router.patch('/', middlewares_1.verifyToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        let data = yield user_1.default.findAll({ attributes: ['contact'], where: { id: 1 } });
        yield user_1.default.update(req.body, { where: { id: 1 } });
        res.send(true);
    }));
    exports.default = router;
});
