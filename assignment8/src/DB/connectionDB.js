import { Sequelize } from "sequelize";

export const sequelize = new Sequelize("assignment8", "root", "", {
  host: "localhost",
  dialect: "mysql",
});

export const DBconnection = async () => {
  try {
    await sequelize.authenticate();
    console.log("connection to database is successful");
  } catch (err) {
    console.log("connection to database is failed", err);
  }
};


export const syncDb = async () => {
  try {
    await sequelize.sync();
    console.log("database is synced");
  } catch (err) {
    console.log("database is not synced", err);
  }
};

export default sequelize;