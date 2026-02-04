import { OrderType } from "../types/orderType";
import { order } from "../models/order";
import { Product } from "../models/product";
export const createOrderService = async (new_order: OrderType) => {
    const findStock = await Product.findOne({ _id: new_order.product_id.toString(), StockQuantity: { $gte: Number(new_order.order_quantity) } })
    if (!findStock) {
        return `Product are not avilable with your qunatity`
    }
    const Order = await new order(new_order)
    await Product.findOneAndUpdate(
        { _id: new_order.product_id.toString() },
        { $inc: { StockQuantity: -new_order.order_quantity } },
        { returnNewDocument: true }
    )
    return Order;

}