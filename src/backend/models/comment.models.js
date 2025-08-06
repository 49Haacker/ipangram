"use strict";
import { Sequelize } from "sequelize";
import { sequelize } from "../db/dbConnect";

const Comment = sequelize.define(
  "Comment",
  {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
    },
    content: { type: Sequelize.TEXT, allowNull: false },
  },
  { timestamps: true, tableName: "comments" }
);

export default Comment;
