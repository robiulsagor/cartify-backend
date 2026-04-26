import Category from "../category/category.model.ts";
import Vendor from "../vendor/vendor.model.ts"
import Product from "./product.model.ts";

// public api
export const getAllProducts = async () => {
    const products = await Product.find({ isDeleted: false })
        .populate("categoryId")
        .populate("vendorId");
    return products
}

// public api
export const getProductById = async (productId: string) => {
    const product = await Product.findById(productId)
    if (!product) throw new Error("Product not found!");
    return product
}

// vendor api
export const createProduct = async (userId: string, productData: any) => {
    // find vendor
    const vendor = await Vendor.findOne({ userId });
    if (!vendor || vendor.status !== "approved") {
        throw new Error("Not an approved vendor!");
    }

    const category = await Category.findById(productData.categoryId);
    if (!category) {
        throw new Error("Invalid category!")
    }

    const product = await Product.create({
        ...productData,
        vendorId: vendor._id
    })

    return product;
}

// vendor api
export const getMyProducts = async (userId: string) => {
    // find vendor
    const vendor = await Vendor.findOne({ userId });

    if (!vendor || vendor.status !== "approved") {
        throw new Error("Not an approved vendor!");
    }

    const products = await Product.find({ vendorId: vendor._id, isDeleted: false });
    return products;
}

export const updateProduct = async (userId: string, productId: string, data: any) => {
    const vendor = await Vendor.findOne({ userId })

    if (!vendor) throw new Error("Vendor not found!");

    const product = await Product.findOne({
        _id: productId,
        vendorId: vendor._id
    })

    if (!product) throw new Error("Product not found!");

    Object.assign(product, data)
    await product.save();
    return product;
}

export const deleteProduct = async (userId: string, productId: string) => {
    // find vendor
    const vendor = await Vendor.findOne({ userId });

    if (!vendor || vendor.status !== "approved") {
        throw new Error("Not an approved vendor!");
    }

    const product = await Product.findOne({
        _id: productId,
        vendorId: vendor._id
    })

    if (!product) throw new Error("Product not found!");

    product.isDeleted = true;
    await product.save();
    return product;
}