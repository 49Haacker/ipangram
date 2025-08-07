import ActivityLog from "@/backend/models/activityLog.models";
import Comment from "@/backend/models/comment.models";
import Notification from "@/backend/models/notification.models";
import Subtask from "@/backend/models/subtask.models";
import Task from "@/backend/models/task.models";
import User from "@/backend/models/user.models";

User.hasMany(Task, { foreignKey: "user_id_fk" });
Task.belongsTo(User, { foreignKey: "user_id_fk" });

// User.hasMany(Comment, { foreignKey: "user_id" });
// Comment.belongsTo(User, { foreignKey: "user_id" });

// Task.hasMany(Comment, { foreignKey: "task_id" });
// Comment.belongsTo(Task, { foreignKey: "task_id" });

// User.hasMany(Notification, { foreignKey: "user_id" });
// Notification.belongsTo(User, { foreignKey: "user_id" });

// Task.hasMany(Subtask, { foreignKey: "task_id" });
// Subtask.belongsTo(Task, { foreignKey: "task_id" });

// User.hasMany(ActivityLog, { foreignKey: "user_id" });
// ActivityLog.belongsTo(User, { foreignKey: "user_id" });

// Task.hasMany(ActivityLog, { foreignKey: "task_id" });
// ActivityLog.belongsTo(Task, { foreignKey: "task_id" });

// export { User, Task, Comment, Notification, Subtask, ActivityLog };
