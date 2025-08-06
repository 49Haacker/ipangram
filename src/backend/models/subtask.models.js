"use strict";
import { Sequelize } from "sequelize";
import { sequelize } from "../db/dbConnect";

const Subtask = sequelize.define(
  "Subtask",
  {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
    },
    title: { type: Sequelize.STRING, allowNull: false },
    is_completed: { type: Sequelize.BOOLEAN, defaultValue: false },
  },
  { timestamps: true, tableName: "subtasks" }
);

export default Subtask;
