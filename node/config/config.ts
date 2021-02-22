// const dotenv = require('dotenv');
//js로 db 생성후 ts로 변경
import * as dotenv from 'dotenv';
dotenv.config(); 

type Config = {
  username: string,
  password: string,
  database: string,
  host: string,
  // dialect: string,
  [key: string]: string,
}
interface IConfigGroup {
  development: Config;
  test: Config;
  production: Config;
}

const config: IConfigGroup = {
    development: {
        "username": process.env.SEQUELIZE_USERNAME!,
        "password": process.env.SEQUELIZE_PASSWORD!,
        "database": "book",
        "host": process.env.SEQUELIZE_HOST!,
        "dialect": "mysql"
    },
    test: {
        "username": process.env.SEQUELIZE_USERNAME!,
        "password": process.env.SEQUELIZE_PASSWORD!,
        "database": "book",
        "host": "127.0.0.1",
        "dialect": "mysql"
    },
    production: {
        "username": process.env.SEQUELIZE_USERNAME!,
        "password": process.env.SEQUELIZE_PASSWORD!,
        "database": "book",
        "host": process.env.SEQUELIZE_HOST!,
        "dialect": "mysql"
    }
}

export default config;