import { Router } from "express";
import { getproducts } from "./product.service.js";
export const productRouter = Router();
productRouter.get('/products',getproducts)