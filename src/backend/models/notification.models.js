"use strict";
import { Sequelize } from "sequelize";
import { sequelize } from "../db/dbConnect";

const Notification = sequelize.define(
  "Notification",
  {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
    },
    user_id_fk: {
      type: Sequelize.UUID,
      allowNull: false,
      references: {
        model: "users",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
    task_id_fk: {
      type: Sequelize.UUID,
      allowNull: true,
      references: {
        model: "tasks",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "SET NULL",
    },
    message: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    read: {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
    },
    type: {
      type: Sequelize.ENUM("task", "system", "reminder"),
      defaultValue: "task",
    },
  },
  { timestamps: true, tableName: "notifications" }
);

export default Notification;
