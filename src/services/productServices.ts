import { ProdcutType } from "../types/productType";
import { Product } from "../models/product";

export const createProductSerives=async (newProduct:ProdcutType)=>{
    const product= await new Product(newProduct);
    return await product.save()

}