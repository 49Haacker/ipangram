"use strict";

import { Sequelize } from "sequelize";
import { sequelize } from "../db/dbConnect";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

const User = sequelize.define(
  "User",
  {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    user_name: { type: Sequelize.STRING(12), allowNull: false, unique: true },
    name: { type: Sequelize.STRING(45), allowNull: false },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: { type: Sequelize.STRING, allowNull: false },
    role: { type: Sequelize.ENUM("user", "admin"), defaultValue: "user" },
    status: {
      type: Sequelize.ENUM("active", "inactive", "banned"),
      allowNull: false,
      defaultValue: "active",
    },
    is_verified: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    verify_token: {
      type: Sequelize.STRING(512),
      allowNull: true,
    },
    verify_token_expiry: {
      type: Sequelize.DATE,
      allowNull: true,
    },
    reset_token: {
      type: Sequelize.STRING(512),
      allowNull: true,
    },
    reset_token_expires: {
      type: Sequelize.DATE,
      allowNull: true,
    },
    refresh_token: {
      type: Sequelize.STRING(512),
      allowNull: true,
    },
    refresh_token_expires: {
      type: Sequelize.DATE,
      allowNull: true,
    },
  },
  { timestamps: true, tableName: "users" }
);

export default User;

User.beforeSave(async (user) => {
  if (user.changed("password")) {
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(user.password, salt);
    user.password = hashedPassword;
  }
});

User.prototype.isPasswordCorrect = async function (password) {
  try {
    const comparePassword = await bcryptjs.compare(password, this.password);
    return comparePassword;
  } catch (error) {
    console.error("Error comparing passwords:", error);
    return false;
  }
};

User.prototype.generateAccessToken = function () {
  return jwt.sign(
    {
      id: this.id,
      userName: this.user_name,
      role: this.role,
      status: this.status,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
    }
  );
};

User.prototype.generateRefreshToken = function () {
  return jwt.sign(
    {
      id: this.id,
      userName: this.user_name,
      role: this.role,
      status: this.status,
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
    }
  );
};
