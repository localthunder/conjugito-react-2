require('dotenv').config();

module.exports = {
  development: {
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    host: process.env.DATABASE_HOST,
    dialect: 'postgres',
    // ...other options
  },
  test: {
    //...test db config
  },
  production: {
    username: process.env.DATABASE_USERNAME_PRODUCTION,
    password: process.env.DATABASE_PASSWORD_PRODUCTION,
    database: process.env.DATABASE_NAME_PRODUCTION,
    host: process.env.DATABASE_HOST_PRODUCTION,
    dialect: 'postgres',  }
};
