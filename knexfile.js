const {env}= require("./db/constant");
module.exports= {
    development: {
      client: "pg",
      connection: {
        host: "localhost", // or your PostgreSQL server IP
        user:env.USER_NAME,
        password: env.USER_PASSWORD,
        database: env.DB_NAME,
        port: 5432, 
      }
    },
    migrations: {
      directory: "./migrations",
    },
  };
  