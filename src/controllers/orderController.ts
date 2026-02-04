import { Request, Response } from "express"
import { activeOrderServices, cancelOrderService, createOrderService, getTotalRevenue} from "../services/orderService";
import { OrderType } from "../types/orderType";
import { order } from "../models/order";
import { Product } from "../models/product";

export const createOrderController = async (req: Request, res: Response) => {
    try {
        const { product_id, order_status, order_quantity } = req.body;
        if (!product_id || !order_status || !order_quantity) {
            res.status(404).send("All values are required")
        }
        const new_order: OrderType = {
            product_id,
            order_status,
            order_quantity
        }
        const findStock = await Product.findOne({ _id: new_order.product_id.toString(), StockQuantity: { $gte: Number(new_order.order_quantity) } })
        if (!findStock) {
            res.status(404).send("Product are not avilable with your qunatity or out of stcok")
        }
        const order = await createOrderService(new_order)
        res.status(201).send(order)

    } catch (error) {
        res.status(500).send("Error while creating order")
    }
}
export const cancelOrderController = async (req: Request, res: Response) => {
    try {
        const id = req.params.id as string
        if (!id) {
            return res.status(400).send('id is required ')
        }
        const findOrder = await order.findById(id)
        if (!findOrder) {
            return res.status(400).send('Order is not avilable')
        }
        const orderStatus = await cancelOrderService(id)
        res.status(200).send({ message: "successfully cancel the order" })

    } catch (error) {
        res.status(500).send("Error while cancel the order ")
    }

}
export const getActiveOrderController = async (req: Request, res: Response) => {
    try {
        const getActiveOrders = await activeOrderServices()
        if (getActiveOrders.length == 0) {
            return res.status(204).send("Active Orders are not avilable")
        }
        return res.status(200).send(getActiveOrders)

    } catch (error) {
        return res.status(500).send("Error while fecthing active orders")
    }
}
export const fetchTotalRevenue=async(req:Request,res:Response)=>{
    try{
       const result=await getTotalRevenue();
       if(result.length==0){
        return res.status(204).send("Active orders not avilable")
       }
       return res.status(200).send(result[0].total_revenue)
    }catch(error){
       return res.status(500).send("Error while fetching total revenue")
    }
}
