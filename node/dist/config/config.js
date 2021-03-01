var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "dotenv"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    // const dotenv = require('dotenv');
    //js로 db 생성후 ts로 변경
    const dotenv = __importStar(require("dotenv"));
    dotenv.config();
    const config = {
        development: {
            "username": process.env.SEQUELIZE_USERNAME,
            "password": process.env.SEQUELIZE_PASSWORD,
            "database": "book",
            "host": process.env.SEQUELIZE_HOST,
            "dialect": "mysql"
        },
        test: {
            "username": process.env.SEQUELIZE_USERNAME,
            "password": process.env.SEQUELIZE_PASSWORD,
            "database": "book",
            "host": "127.0.0.1",
            "dialect": "mysql"
        },
        production: {
            "username": process.env.SEQUELIZE_USERNAME,
            "password": process.env.SEQUELIZE_PASSWORD,
            "database": "book",
            "host": process.env.SEQUELIZE_HOST,
            "dialect": "mysql"
        }
    };
    exports.default = config;
});
