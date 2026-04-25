import { createCategory, getCategories, updateCategory, deleteCategory } from "./category.service.ts";
import type { Request, Response } from "express";
import mongoose from "mongoose";


export const create = async (req: Request, res: Response) => {
    try {
        const { name, parent } = req.body;

        const category = await createCategory(name, parent)
        res.status(201).json({ message: "Category created successfully", category });
    } catch (error: any) {
        res.status(400).json({ message: error.message })
    }
}

export const get = async (req: Request, res: Response) => {
    try {
        const categories = await getCategories();
        res.status(200).json({ message: "Categories fetched successfully", categories });
    } catch (error: any) {
        res.status(400).json({ message: error.message })
    }
}

export const updateCat = async (req: Request, res: Response) => {
    try {
        const id = req.params.id as string;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            throw new Error("Invalid category id")
        }

        const { name, parent } = req.body;
        const category = await updateCategory(id, name, parent);
        res.status(200).json({ message: "Category updated successfully", category });
    } catch (error: any) {
        res.status(400).json({ message: error.message })
    }
}

export const deleteCat = async (req: Request, res: Response) => {
    try {
        const id = req.params.id as string;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            throw new Error("Invalid category id")
        }
        const category = await deleteCategory(id);
        res.status(200).json({ message: "Category deleted successfully", category });
    } catch (error: any) {
        res.status(400).json({ message: error.message })
    }
}