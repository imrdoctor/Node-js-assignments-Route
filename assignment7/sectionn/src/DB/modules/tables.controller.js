import { Router } from "express";
import sequelize from "./connectionDB.js";
import { DataTypes } from 'sequelize';

const tableRouter = Router();

tableRouter.post('/create-tables', async (req, res) => {
    try {
        // إنشاء جدول المستخدمين
        await sequelize.define('User', {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            firstName: {
                type: DataTypes.STRING,
                allowNull: false
            },
            lastName: {
                type: DataTypes.STRING,
                allowNull: false
            },
            email: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true
            },
            phone: {
                type: DataTypes.STRING
            },
            password: {
                type: DataTypes.STRING,
                allowNull: false
            },
            role: {
                type: DataTypes.STRING,
                defaultValue: 'user'
            }
        });

        // إنشاء جدول المنتجات
        await sequelize.define('Product', {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false
            },
            stock: {
                type: DataTypes.INTEGER,
                defaultValue: 0
            },
            price: {
                type: DataTypes.DECIMAL(10, 2),
                allowNull: false
            },
            isDeleted: {
                type: DataTypes.BOOLEAN,
                defaultValue: false
            }
        });

        // مزامنة الجداول مع قاعدة البيانات
        await sequelize.sync({ force: true });

        return res.json({ message: "Tables created successfully." });
    } catch (error) {
        console.error('Error creating tables:', error);
        return res.status(500).json({ message: "Error creating tables", error: error.message });
    }
});

export default tableRouter; 