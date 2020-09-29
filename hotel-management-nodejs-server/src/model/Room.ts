import { Sequelize, INTEGER, STRING, DOUBLE } from "sequelize";

export default (sequelize: Sequelize) =>
  sequelize.define("rooms", {
    id: {
      type: INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: STRING,
    pricePerNight: DOUBLE,
    ownerId: {
      type: INTEGER,
      allowNull: false,
    },
    managerId: {
      type: INTEGER,
      allowNull: true,
    },
  });
