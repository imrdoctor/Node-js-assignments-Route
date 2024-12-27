import { Router } from "express";
import {
    createProduct,
    softDeleteProduct,
    deleteProduct,
    searchProducts,
    getProductsByIds,
    getAllProducts,
    getProductsWithUsers,
    getMaxPrice,
    getTopExpensiveProducts
} from "./product.service.js";

export const productRouter = Router();

// إنشاء وحذف المنتجات
productRouter.post('/', createProduct);
productRouter.patch('/soft-delete/:id', softDeleteProduct);
productRouter.delete('/:id', deleteProduct);

// البحث والتصفية
productRouter.get('/search', searchProducts);
productRouter.get('/in', getProductsByIds);
productRouter.get('/', getAllProducts);

// عمليات متقدمة
productRouter.get('/products-with-users', getProductsWithUsers);
productRouter.get('/max-price', getMaxPrice);
productRouter.get('/top-expensive', getTopExpensiveProducts);