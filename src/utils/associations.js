import ActivityLog from "@/backend/models/activityLog.models";
import Comment from "@/backend/models/comment.models";
import Notification from "@/backend/models/notification.models";
import Subtask from "@/backend/models/subtask.models";
import Task from "@/backend/models/task.models";
import User from "@/backend/models/user.models";

User.hasMany(Task, { foreignKey: "user_id_fk" });
Task.belongsTo(User, { foreignKey: "user_id_fk" });

User.hasMany(Notification, { foreignKey: "user_id_fk" });
Notification.belongsTo(User, { foreignKey: "user_id_fk" });

Task.hasMany(Notification, { foreignKey: "task_id_fk" });
Notification.belongsTo(Task, { foreignKey: "task_id_fk" });

// export { User, Task, Comment, Notification, Subtask, ActivityLog };
