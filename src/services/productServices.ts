import { ProdcutType } from "../types/productType";
import { Product } from "../models/product";

export const createProductSerives = async (newProduct: ProdcutType) => {
    const findProduct=await Product.findOne({Name:newProduct.Name})
    if(findProduct){
        return `This product already exists`
    }
    const product = await new Product(newProduct);
    return await product.save()
}
export const getProductServices = async () => {
    const products = await Product.find();
    return products;
}