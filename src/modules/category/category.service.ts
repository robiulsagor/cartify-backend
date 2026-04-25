import mongoose from "mongoose";
import Category from "./category.model.ts";

export const createCategory = async (name: string, parent?: string) => {
    if (!name || !name.trim()) {
        throw new Error("Name is required");
    }

    const payload: any = { name: name.trim() };

    if (parent) {
        if (!mongoose.Types.ObjectId.isValid(parent)) {
            throw new Error("Invalid parent id")
        }

        const parentCategory = await Category.findOne({ _id: parent, isDeleted: false });

        if (!parentCategory) {
            throw new Error("Parent category not found")
        }

        payload.parent = parent;
    }

    const category = await Category.create(payload);
    return category;
}

export const getCategories = async () => {
    try {
        const categories = await Category.find({ isDeleted: false }).populate("parent", "name");
        return categories;
    } catch (error: any) {
        throw new Error(error.message)
    }
}

export const updateCategory = async (id: string, name?: string, parent?: string) => {
    try {
        if (!id) {
            throw new Error("Category id is required")
        }

        if (!mongoose.Types.ObjectId.isValid(id)) {
            throw new Error("Invalid category id")
        }

        const category = await Category.findByIdAndUpdate({ _id: id, isDeleted: false }, { name, parent }, { new: true })

        if (!category) {
            throw new Error("Category not found")
        }
        return category;

    } catch (error: any) {
        throw new Error(error.message)
    }
}

export const deleteCategory = async (id: string) => {
    try {
        if (!id) {
            throw new Error("Category id is required")
        }

        if (!mongoose.Types.ObjectId.isValid(id)) {
            throw new Error("Invalid category id")
        }

        const category = await Category.findByIdAndUpdate(id, { isDeleted: true }, { new: true })

        if (!category) {
            throw new Error("Category not found")
        }

        return category;
    } catch (error: any) {
        throw new Error(error.message)
    }
}