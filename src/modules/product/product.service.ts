import Vendor from "../vendor/vendor.model.ts"
import Product from "./product.model.ts";


export const createProduct = async (userId: string, productData: any) => {
    // find vendor
    const vendor = await Vendor.findOne({ userId });
    if (!vendor || vendor.status !== "approved") {
        throw new Error("Not an approved vendor!");
    }

    const product = await Product.create({
        ...productData,
        vendorId: vendor._id
    })

    return product;
}

export const getMyProducts = async (userId: string) => {
    // find vendor
    const vendor = await Vendor.findOne({ userId });

    if (!vendor || vendor.status !== "approved") {
        throw new Error("Not an approved vendor!");
    }

    const products = await Product.find({ vendorId: vendor._id });
    return products;
}

export const updateProduct = async (userId: string, productId: string, data: any) => {
    const vendor = await Vendor.findOne({userId})

    if(!vendor) throw new Error("Vendor not found!");

    const product = await Product.findOne({
        _id: productId,
        vendorId: vendor._id
    })

    if(!product) throw new Error("Product not found!");

    Object.assign(product, data)
    await product.save();
    return product;
}