import { userModel } from "./user.model.js";
import { postModel } from "./posts.model.js";
import { commentModel } from "./comment.model.js";

export const defineRelations = () => {
  // علاقة المستخدمين مع المنشورات
  userModel.hasMany(postModel, { foreignKey: "userId", as: "posts" });
  postModel.belongsTo(userModel, { foreignKey: "userId", as: "user" });

  // علاقة المنشورات مع التعليقات
  postModel.hasMany(commentModel, { foreignKey: "postId", as: "comments" });
  commentModel.belongsTo(postModel, { foreignKey: "postId", as: "post" });

  // علاقة المستخدمين مع التعليقات
  userModel.hasMany(commentModel, { foreignKey: "userId", as: "comments" });
  commentModel.belongsTo(userModel, { foreignKey: "userId", as: "user" });
};
