import { Sequelize } from "sequelize"
import sequelize from "../../DB/connectionDB.js"
import { userModel } from "../../DB/models/user.model.js"

export const getallusers = async (req, res, next) => {
    const users = await userModel.findAll()
    return res.json({ "users": users })
}

export const signup = async (req, res, next) => {
    const { name, email, password, role } = req.body;
  
    if (!name) {
      return res.status(400).json({ error: "Name is required." });
    }
    if (!email) {
      return res.status(400).json({ error: "Email is required." });
    }
    if (!password) {
      return res.status(400).json({ error: "Password is required." });
    }
    if (!role) {
      return res.status(400).json({ error: "Role is required." });
    }
    try {
      const newUser = await userModel.create({ name, email, password, role });
  
      return res.status(201).json({
        message: "User created successfully.",
        user: {
          id: newUser.id,
          name: newUser.name,
          email: newUser.email,
          role: newUser.role,
        },
      });
    } catch (err) {
      if (err.name === "SequelizeValidationError") {
        const validationErrors = err.errors.map((error) => error.message);
        return res.status(400).json({ error: validationErrors });
      }
      if (err.name === "SequelizeUniqueConstraintError") {
        return res.status(400).json({ error: "Email already exists." });
      }
      return res.status(500).json({ error: "An unexpected error occurred." });
    }
  };

export const updateCrate = async (req, res, next) => {
    const { id } = req.params
    const { name, email, password, role } = req.body
        try {
            if (!name || !email || !password || !role) {
                return res.json({ "error": "Please fill all fields" })
            }
            const existingUser = await userModel.findOne({
                where: { email, id: { [sequelize.Sequelize.Op.ne]: id } }
            })
            if (existingUser) {
                return res.status(400).json({ error: "Email already exists." });
            } 
            const [user, created] = await userModel.upsert(
                { id, name, email, password, role },
                { returning: true }
            )
            if (created) {
                return res.status(201).json({ message: "User created successfully", user });
            } else {
                return res.status(200).json({ message: "User updated successfully", user });
            }

        } catch (err) {
            if (err.name === 'SequelizeUniqueConstraintError') {
                return res.status(400).json({ error: "Email already exists." });
            }
            return res.status(500).json({ error: "An unexpected error occurred.", err });
        }
    

}


export const getUserByEmail = async (req, res, next) => {
    const { email } = req.query
    if (!email) {
        return res.status(400).json({ error: "Email parameter is required" });
    }
    try {
        const user = await userModel.findOne({ where: { email } })
        if (!user) {
            return res.status(404).json({ error: "User not found." });
        }
        return res.status(200).json({"user":user});
    }catch(err){
        return res.status(500).json({ error: "An unexpected error occurred.", err });
    }
}

export const  getuserdata = async (req, res, next) => {
    const { id } = req.params
    try {
        if(!id){
            return res.status(400).json({ error: "Id parameter is required" });
        }
        const user = await userModel.findByPk(id, {
            attributes: { exclude: ['role'] } 
        });
        if (!user) {
            return res.status(404).json({ error: "User not found." });
        }
        return res.status(200).json({"user":user});
    }catch(err){

    }
}