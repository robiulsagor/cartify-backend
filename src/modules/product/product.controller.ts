import type { Request, Response } from "express";

import { createProduct, getMyProducts, updateProduct } from "./product.service.ts"
import type { AuthRequest } from "../vendor/vendor.controller.ts";


export const create= async (req: AuthRequest, res: Response)=> {
    try {
         if (!req.user) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        const product = await createProduct(req.user.id, req.body)
        res.status(201).json(product)
    } catch (error:any) {
        res.status(400).json({ error: error.message })
    }
}

export const myProducts = async (req: Request, res: Response) => {
    try {
        if(!req.user) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        const products =await getMyProducts(req.user.id)
         res.status(200).json(products)
    } catch (error: any) {
            res.status(400).json({ error: error.message })
    }
}

export const update = async (req: AuthRequest, res: Response) => {
    try {
        if (!req.user) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        
        const {id} = req.params;
        if(!id || Array.isArray(id)) {
            return res.status(400).json({ message: "Invalid id" });
        }

        const product = await updateProduct(req.user.id, id, req.body);
        res.status(200).json(product);

    } catch (error: any) {
        res.status(400).json({ error: error.message })
    }
}