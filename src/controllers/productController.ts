import { Request, Response } from "express";
import { Product } from "../models/product";
import { ProdcutType } from "../types/productType";
import { createProductSerives } from "../services/productServices";
export const createProductController = async (req: Request, res: Response) => {
    try {
        const { Name, Price, StockQuantity } = req.body;
        const newProduct:ProdcutType={
            Name,
            Price,
            StockQuantity
        } 
        if (!Name || !Price || !StockQuantity) {
            res.status(400).send("All fields are required")
        }
        const creatingProduct= await createProductSerives(newProduct)
        res.status(201).send(creatingProduct)
    } catch (error) {
       res.status(500).send({ error: 'An error occurred while creating the product' });
    }


}