import { Sequelize } from "sequelize";
import sequelize from "../connectionDB.js";

export const commentModel = sequelize.define("comments", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  content: {
    type: Sequelize.TEXT,
  },
  postId: {
    type: Sequelize.INTEGER,
    references: {
      model: "posts", 
      key: "id",
    },
    onDelete: "CASCADE",
    onUpdate: "CASCADE", 
  },
  userId: {
    type: Sequelize.INTEGER,
    references: {
      model: "users", 
      key: "id",
    },
    onDelete: "CASCADE", 
    onUpdate: "CASCADE",
  },
});

