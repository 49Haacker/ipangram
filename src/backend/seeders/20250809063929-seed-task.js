"use strict";

import { randomUUID } from "crypto";
import { tasksData } from "../data/tasksData.js";

export async function up(queryInterface, Sequelize) {
  const users = await queryInterface.sequelize.query(`SELECT id FROM users;`, {
    type: Sequelize.QueryTypes.SELECT,
  });
  if (!users.length) {
    throw new Error(
      "No users found in the users table. Please seed users first."
    );
  }

  const tasks = tasksData.map((task) => {
    const randomUser = users[Math.floor(Math.random() * users.length)];
    // console.log("randomUser", randomUser);
    // const taskid = randomUUID();
    // console.log("randomUser", taskid);

    return {
      id: randomUUID(),
      user_id_fk: randomUser.id,
      title: task.title,
      description: task.description,
      priority: task.priority,
      status: task.status,
      due_date: task.dueDate,
      is_completed: task.status === "completed",
    };
  });
  await queryInterface.bulkInsert("tasks", tasks, {});
}

export async function down(queryInterface, Sequelize) {
  await queryInterface.bulkDelete("tasks", null, {});
}
