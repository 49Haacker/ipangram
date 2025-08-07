"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("users", {
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
      createdAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
        allowNull: false,
      },
      updatedAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
        allowNull: false,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("users");
  },
};
