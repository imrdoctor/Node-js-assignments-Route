import productModel from "../../DB/modules/product.model.js";
import userModel from "../../DB/modules/user.model.js";
import { Op } from "sequelize";

// الوظائف الأساسية للمنتجات
export const createProduct = async (req, res) => {
    try {
        const product = await productModel.create(req.body);
        return res.status(201).json({ message: "Product created successfully", product });
    } catch (error) {
        return res.status(500).json({ message: "Error creating product", error: error.message });
    }
};

export const softDeleteProduct = async (req, res) => {
    try {
        const product = await productModel.update(
            { isDeleted: true },
            { where: { id: req.params.id }}
        );
        return res.json({ message: "Product soft deleted successfully" });
    } catch (error) {
        return res.status(500).json({ message: "Error soft deleting product", error: error.message });
    }
};

export const deleteProduct = async (req, res) => {
    try {
        await productModel.destroy({ where: { id: req.params.id }});
        return res.json({ message: "Product deleted successfully" });
    } catch (error) {
        return res.status(500).json({ message: "Error deleting product", error: error.message });
    }
};

export const searchProducts = async (req, res) => {
    try {
        const products = await productModel.findAll({
            where: {
                name: { [Op.like]: `%${req.query.name}%` }
            }
        });
        return res.json({ products });
    } catch (error) {
        return res.status(500).json({ message: "Error searching products", error: error.message });
    }
};

export const getProductsByIds = async (req, res) => {
    try {
        const ids = req.query.ids.split(',').map(Number);
        const products = await productModel.findAll({
            where: { id: ids },
            attributes: ['id', 'name', 'price']
        });
        return res.json({ products });
    } catch (error) {
        return res.status(500).json({ message: "Error fetching products", error: error.message });
    }
};

export const getAllProducts = async (req, res) => {
    try {
        const products = await productModel.findAll({
            where: { isDeleted: false },
            attributes: [
                ['name', 'productName'],
                ['price', 'cost']
            ]
        });
        return res.json({ products });
    } catch (error) {
        return res.status(500).json({ message: "Error fetching products", error: error.message });
    }
};

export const getProductsWithUsers = async (req, res) => {
    try {
        const products = await productModel.findAll({
            attributes: [['name', 'productName']],
            include: [{
                model: userModel,
                attributes: ['email']
            }]
        });
        return res.json({ products });
    } catch (error) {
        return res.status(500).json({ message: "Error fetching products with users", error: error.message });
    }
};

export const getMaxPrice = async (req, res) => {
    try {
        const maxPrice = await productModel.max('price');
        return res.json({ maxPrice });
    } catch (error) {
        return res.status(500).json({ message: "Error getting max price", error: error.message });
    }
};

export const getTopExpensiveProducts = async (req, res) => {
    try {
        const products = await productModel.findAll({
            attributes: ['name', 'price'],
            order: [['price', 'DESC']],
            limit: 5
        });
        return res.json({ products });
    } catch (error) {
        return res.status(500).json({ message: "Error fetching top expensive products", error: error.message });
    }
}; 