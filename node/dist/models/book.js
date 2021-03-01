(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "sequelize", "./sequelize"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.associate = void 0;
    const sequelize_1 = require("sequelize");
    const sequelize_2 = require("./sequelize");
    class Book extends sequelize_1.Model {
    }
    Book.init({
        title: {
            type: sequelize_1.DataTypes.STRING(40),
            allowNull: false,
        },
        nick: {
            type: sequelize_1.DataTypes.STRING(15),
            allowNull: true,
            defaultValue: 'admin',
        },
        contents: {
            type: sequelize_1.DataTypes.TEXT,
            allowNull: true,
        },
        frontimg: {
            type: sequelize_1.DataTypes.STRING(100),
            allowNull: true,
        },
        backimg: {
            type: sequelize_1.DataTypes.STRING(100),
            allowNull: true,
        }
    }, {
        sequelize: sequelize_2.sequelize,
        modelName: 'Book',
        tableName: 'book',
        paranoid: false,
        charset: 'utf8',
        collate: 'utf8_general_ci',
    });
    const associate = (db) => {
    };
    exports.associate = associate;
    exports.default = Book;
});
