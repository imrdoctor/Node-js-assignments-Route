import { Sequelize } from "sequelize";
import sequelize from "../connectionDB.js";

export const userModel = sequelize.define("user", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: Sequelize.STRING(50),
    allowNull: false,
    validate: {
      len: {
        args: [3, 50], // الحد الأدنى 3 والحد الأقصى 50
        msg: "Name must be greater than 2 characters.",
      },
    },
  },
  email: {
    type: Sequelize.STRING(100),
    unique: true,
    allowNull: false,
    validate: {
      isEmail: {
        args: true,
        msg: "Please enter a valid email address.",
      },
    },
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      checkPasswordLength: (value) => {
        if (value.length < 6) {
          throw new Error("Password must be at least 6 characters long.");
        }
      },
    },
  },
  role: {
    type: Sequelize.ENUM("user", "admin"),
    defaultValue: "user",
    allowNull: false,
  },
  createdAt: {
    type: Sequelize.DATE,
    defaultValue: Sequelize.NOW,
  },
  updatedAt: {
    type: Sequelize.DATE,
    defaultValue: Sequelize.NOW,
  },
});


// معرفش ليه مش بيجيب رسالة الايرور فى بوست مان وبيقولي 
//     "error": "An unexpected error occurred."
// فا همشته وعملت تحقق فوق
// ----
// userModel.beforeCreate(async (user, options) => {
//   if (user.name.length < 3) {
//     throw new Error("Name must be greater than 2 characters.");
//   }
// });