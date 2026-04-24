import type { Request, Response } from "express";
import Category from "./category.model.ts";

export const createCategory = async (req: Request, res: Response) => {
    try {
        const category = await Category.create(req.body);
        res.status(201).json(category);
    } catch (error: any) {
        res.status(400).json({ error: error.message })
    }
}

export const getCategories = async (req: Request, res: Response) => {
    try {
        const categories = await Category.find();
        res.status(200).json(categories);
    } catch (error: any) {
        res.status(400).json({ error: error.message })
    }
}

export const updateCategory = async (req: Request, res: Response) => {
try {
     
} catch (error: any) {
    res.status(400).json({ error: error.message })
}
}