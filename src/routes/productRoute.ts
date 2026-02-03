import express from "express"
import { createProductController } from "../controllers/productController";
export const router = express.Router()
router.post('/addProduct',createProductController)

