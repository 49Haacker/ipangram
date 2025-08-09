"use strict";

import bcryptjs from "bcryptjs";
import { randomUUID } from "crypto";

export async function up(queryInterface, Sequelize) {
  // Hash the password once for all dummy users
  const commonPassword = await bcryptjs.hash("123456789", 10);

  // Names list
  const names = [
    "admin",
    "Gaurav Tiwari",
    "Rahul",
    "Anupam",
    "Abhishek",
    "Milan",
    "Saurabh",
    "Minish",
    "Viveak",
  ];

  // Build users array
  const users = names.map((fullName) => {
    const firstName = fullName.split(" ")[0].toLowerCase();
    return {
      id: randomUUID(),
      user_name: firstName,
      name: fullName,
      email: `${firstName}@gmail.com`,
      password: commonPassword,
      role: firstName === "admin" ? "admin" : "user",
      status: "active",
      is_verified: true,
      verify_token: null,
      verify_token_expiry: null,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
  });

  await queryInterface.bulkInsert("users", users);
}

export async function down(queryInterface, Sequelize) {
  await queryInterface.bulkDelete("users", null, {});
}
