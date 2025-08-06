"use strict";
import { Sequelize } from "sequelize";
import { sequelize } from "../db/dbConnect";

const Task = sequelize.define(
  "Task",
  {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
    },
    title: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    description: {
      type: Sequelize.TEXT,
      allowNull: true,
    },
    priority: {
      type: Sequelize.ENUM("High", "Medium", "Low"),
      defaultValue: "Medium",
    },
    status: {
      type: Sequelize.ENUM("Pending", "In Progress", "Completed", "Overdue"),
      defaultValue: "Pending",
    },
    due_date: {
      type: Sequelize.DATE,
      allowNull: true,
    },
    is_completed: {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
    },
  },
  { timestamps: true, tableName: "tasks" }
);

export default Task;
