import { Sequelize, INTEGER, DOUBLE, DATE } from "sequelize";

export default (sequelize: Sequelize) =>
  sequelize.define("bookings", {
    id: {
      type: INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    price: DOUBLE,
    roomId: {
      type: INTEGER,
      allowNull: false,
    },
    occupantId: {
      type: INTEGER,
      allowNull: false,
    },
    startDate: DATE,
    endDate: DATE,
  });
