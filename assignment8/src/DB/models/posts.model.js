import { Sequelize } from "sequelize";
import sequelize from "../connectionDB.js";

export const postModel = sequelize.define(
  "post",
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: Sequelize.STRING(255),
      allowNull: false,
    },
    content: {
      type: Sequelize.TEXT,
      allowNull: false,
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
  },
  {
    timestamps: true, 
  }
);
