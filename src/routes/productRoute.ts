import express from "express"
import { createProductController, getProductController } from "../controllers/productController";
export const router = express.Router()
router.post('/addProduct',createProductController)
router.get('/getProducts',getProductController)
