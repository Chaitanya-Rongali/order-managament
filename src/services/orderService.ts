import { OrderType } from "../types/orderType";
import { order } from "../models/order";
import { Product } from "../models/product";
export const createOrderService = async (new_order: OrderType) => {
    await Product.findOneAndUpdate(
        { _id: new_order.product_id.toString() },
        { $inc: { StockQuantity: -new_order.order_quantity } },
        { returnNewDocument: true }
    )
    const Order = await new order(new_order)
    return Order.save();

}
export const cancelOrderService = async (id: string) => {
    const orderStatus = await order.findByIdAndUpdate(id, {
        $set: { order_status: 'cancel' }
    },
        { new: true }
    )
    await Product.findOneAndUpdate(
        { _id: orderStatus?.product_id.toString() },
        { $inc: { StockQuantity: orderStatus?.order_quantity } },
        { new: true }
    )
    return await orderStatus;
}
export const activeOrderServices=async()=>{
    const activeOrders= await order.find({order_status:'active'})
    return activeOrders;
}