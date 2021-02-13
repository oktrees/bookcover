require('dotenv').config();

module.exports = {
    development: {
        "username": process.env.SEQUELIZE_USERNAME,
        "password": process.env.SEQUELIZE_PASSWORD,
        "database": "book",
        "host": process.env.SEQUELIZE_HOST,
        "dialect": "mysql",
        "logging": false
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
        "dialect": "mysql",
        "logging": false
    }
}