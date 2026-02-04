import express from "express"
import { createProductController, getProductController } from "../controllers/productController";
import { getActiveOrderController, cancelOrderController, createOrderController } from "../controllers/orderController";
export const router = express.Router()
router.post('/addProduct', createProductController)
router.get('/getProducts', getProductController)
router.post('/addOrder', createOrderController)
router.put('/cancelOrder/:id', cancelOrderController)
router.get('/getActiveOrders',getActiveOrderController)