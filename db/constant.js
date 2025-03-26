require("dotenv-flow").config();

module.exports = {
  env: {
    NODE_ENV: process.env.NODE_ENV,
    JWT_SECRET: process.env.JWT_SECRET,
    DB_NAME: process.env.DB_NAME,
    PORT:process.env.PORT,
    USER_NAME:process.env.USER_NAME,
    DB_PORT:process.env.DB_PORT,
    USER_PASSWORD:process.env.USER_PASSWORD
  },
  statuses: [true, false],
  YesOrNoValues: ["Yes", "No"],
  }