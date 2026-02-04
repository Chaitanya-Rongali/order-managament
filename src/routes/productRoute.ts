import express from "express"
import { createProductController, getProductController } from "../controllers/productController";
import { getActiveOrderController, cancelOrderController, createOrderController, fetchTotalRevenue, fetchTopSellingProducts } from "../controllers/orderController";
export const router = express.Router()
router.post('/addProduct', createProductController)
router.get('/getProducts', getProductController)
router.post('/addOrder', createOrderController)
router.put('/cancelOrder/:id', cancelOrderController)
router.get('/getActiveOrders', getActiveOrderController)
router.get('/totalRevenue', fetchTotalRevenue)
router.get('/topSellingOrders', fetchTopSellingProducts)