import { Sequelize } from "sequelize";
import mysql from "mysql2";

const sequelize = new Sequelize(
  process.env.MYSQL_DB,
  process.env.MYSQL_USERNAME,
  process.env.MYSQL_PASSWORD,
  {
    host: process.env.HOST,
    dialect: "mysql",
    dialectModule: mysql,
    logging: false,
    timezone: "+05:30",
  }
);

const dbConnect = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

export { sequelize, dbConnect };
