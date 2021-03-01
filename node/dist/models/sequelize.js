var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "sequelize", "../config/config"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.sequelize = void 0;
    const sequelize_1 = require("sequelize");
    const config_1 = __importDefault(require("../config/config"));
    const env = process.env.NODE_ENV || 'development';
    const { database, username, password } = config_1.default[env];
    const sequelize = new sequelize_1.Sequelize(database, username, password, config_1.default[env]);
    exports.sequelize = sequelize;
    exports.default = sequelize;
});
