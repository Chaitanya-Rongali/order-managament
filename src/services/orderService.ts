import { OrderType } from "../types/orderType";
import { order } from "../models/order";
import { Product } from "../models/product";
import { getProductServices } from "./productServices";
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
export const activeOrderServices = async () => {
    const activeOrders = await order.find({ order_status: 'active' })
    return activeOrders;
}
export const getTotalRevenue = async () => {
    const result = order.aggregate([{ $match: { order_status: 'active' } },
    {
        $lookup: {
            from: 'products',
            localField: 'product_id',
            foreignField: '_id',
            as: 'product_details'
        }
    },
    {
        $unwind: '$product_details'
    },
    { $group: { _id: null, total_revenue: { $sum: { $multiply: ['$order_quantity', '$product_details.Price'] } } } }
    ])
    return result;
}
export const getTopSellingOrders = async () => {
    const result = order.aggregate([{ $match: { order_status: 'active' } },
    { $group: { _id: '$product_id', total_sold: { $sum: '$order_quantity' } } },
    { $sort: { total_sold: -1 } },
    { $limit: 2 },
    {
        $lookup: {
            from: 'products',
            localField: '_id',
            foreignField: '_id',
            as: 'product_details'
        }
    },
    { $unwind: '$product_details' }
    ])
    return result;
}

