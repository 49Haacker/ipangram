"use strict";
import { Sequelize } from "sequelize";
import { sequelize } from "../db/dbConnect";

const ActivityLog = sequelize.define(
  "ActivityLog",
  {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
    },
    action: { type: Sequelize.STRING, allowNull: false },
    metadata: { type: Sequelize.JSON, allowNull: true },
  },
  { timestamps: true, tableName: "activity_logs" }
);

export default ActivityLog;
