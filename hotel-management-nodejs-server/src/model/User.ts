import { Sequelize, INTEGER, STRING } from "sequelize";

export default (sequelize: Sequelize) =>
  sequelize.define("users", {
    id: {
      type: INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    fullname: STRING,
    role: STRING,
    username: {
      type: STRING,
      allowNull: false,
    },
    password: {
      type: STRING,
      allowNull: false,
    },
  });
