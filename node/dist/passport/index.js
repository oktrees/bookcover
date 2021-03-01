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
        define(["require", "exports", "passport", "./local", "../models/user"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const passport_1 = __importDefault(require("passport"));
    const local_1 = __importDefault(require("./local"));
    const user_1 = __importDefault(require("../models/user"));
    exports.default = () => {
        passport_1.default.serializeUser((user, done) => {
            done(null, user.id);
        });
        passport_1.default.deserializeUser((id, done) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const user = yield user_1.default.findOne({
                    where: { id },
                });
                if (!user) {
                    return done(new Error('no user'));
                }
                return done(null, user); // req.user
            }
            catch (err) {
                console.error(err);
                return done(err);
            }
        }));
        local_1.default();
    };
});
