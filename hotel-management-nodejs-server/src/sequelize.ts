import { Sequelize } from "sequelize";
import UserModel from "./model/User";
import RoomModel from "./model/Room";
import BookingModel from "./model/Booking";

const databaseConfig = {
  database: process.env.MYSQL_DATABASE || "db",
  username: process.env.MYSQL_USER || "user",
  password: process.env.MYSQL_PASSWORD || "password",
  databaseHost: "db",
  databaseType: "mysql" as "mysql",
};

const sequelize = new Sequelize(
  databaseConfig.database,
  databaseConfig.username,
  databaseConfig.password,
  {
    host: databaseConfig.databaseHost,
    dialect: databaseConfig.databaseType,
  }
);

export const dbUser = UserModel(sequelize);
export const dbRoom = RoomModel(sequelize);
export const dbBooking = BookingModel(sequelize);
dbRoom.hasOne(dbUser, {
  foreignKey: "ownerId",
});

dbRoom.hasOne(dbUser, {
  foreignKey: {
    name: "managerId",
    allowNull: true,
  },
});

dbBooking.hasOne(dbRoom, {
  foreignKey: "roomId",
});

dbBooking.hasOne(dbUser, {
  foreignKey: "occupantId",
});

sequelize.sync({ alter: true }).then(() => {
  console.log("Users db and user table have been created");
});
