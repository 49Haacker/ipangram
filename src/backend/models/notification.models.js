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
    type: {
      type: Sequelize.ENUM("TaskUpdated", "TaskAssigned", "Commented"),
      allowNull: false,
    },
    message: { type: Sequelize.STRING, allowNull: false },
    is_read: { type: Sequelize.BOOLEAN, defaultValue: false },
  },
  { timestamps: true, tableName: "notifications" }
);

export default Notification;
