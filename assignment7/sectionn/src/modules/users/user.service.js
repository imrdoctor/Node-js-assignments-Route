import userModel from "../../DB/modules/user.model.js";
import productModel from "../../DB/modules/product.model.js";
import sequelize from "../../DB/modules/connectionDB.js";

export const getusers = async(req, res, next) => {
    const users = await userModel.findAll()
    try {
        return res.status(200).json({ msg: "done", usersCount: users.length, users });
    } catch (error) {
        return res.status(500).json({ msg: "error", error: error.message });
    }
}

export const signup = async (req, res) => {
    try {
        const existingUser = await userModel.findOne({ where: { email: req.body.email }});
        if (existingUser) {
            return res.status(400).json({ message: "Email already exists" });
        }
        const user = await userModel.create(req.body);
        res.status(201).json({ message: "User created successfully", user });
    } catch (error) {
        res.status(500).json({ message: "Error creating user", error });
    }
};

export const login = async (req, res) => {
    try {
        const user = await userModel.findOne({ 
            where: { 
                email: req.body.email,
                password: req.body.password
            }
        });
        if (!user) {
            return res.status(401).json({ message: "Invalid credentials" });
        }
        res.json({ message: "Login successful", user });
    } catch (error) {
        res.status(500).json({ message: "Error during login", error });
    }
};

export const alterTable = async (req, res) => {
    try {
        await sequelize.query('ALTER TABLE Users ADD COLUMN IF NOT EXISTS createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP');
        return res.json({ message: "Table altered successfully" });
    } catch (error) {
        return res.status(500).json({ message: "Error altering table", error: error.message });
    }
};

export const truncateTable = async (req, res) => {
    try {
        await productModel.truncate();
        return res.json({ message: "Products table truncated successfully" });
    } catch (error) {
        return res.status(500).json({ message: "Error truncating table", error: error.message });
    }
};