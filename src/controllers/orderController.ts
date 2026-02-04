import { Request, Response } from "express"
import { createOrderService } from "../services/orderService";
import { OrderType } from "../types/orderType";

export const createOrderController = async (req: Request, res: Response) => {
    try {
        const { product_id, order_status, order_quantity } = req.body;
        if(!product_id || !order_status || !order_quantity){
            res.status(404).send("All values are required")
        }
        const new_order: OrderType = {
            product_id,
            order_status,
            order_quantity
        }
        const order = await createOrderService(new_order)
        res.status(201).send(order)

    } catch(error){
       res.status(500).send(error)
    }
}