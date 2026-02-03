import { Request, Response } from "express";
import { Product } from "../models/product";
import { ProdcutType } from "../types/productType";
import { createProductSerives, getProductServices } from "../services/productServices";
export const createProductController = async (req: Request, res: Response) => {
    try {
        const { Name, Price, StockQuantity } = req.body;
        const newProduct: ProdcutType = {
            Name,
            Price,
            StockQuantity
        }
        if (!Name || !Price || !StockQuantity) {
            return res.status(400).send("All fields are required")
        }
        const creatingProduct = await createProductSerives(newProduct)
        return res.status(201).send(creatingProduct)
    } catch (error) {
        res.status(500).send('An error occurred while creating the product');
    }
}
export const getProductController = async (req: Request, res: Response) => {
    try {
        const products = await getProductServices()
        if (products.length == 0) {
            return res.status(204).send("Products are not avilable")
        }
        return res.status(200).send(products)
    } catch (errror) {
        res.status(500).send("Error while fetching products")
    }

}