import Cart from "./cart.model.ts";
import Product from "../product/product.model.ts";

export const addToCart = async (
    userId: string,
    productId: string,
    quantity: number
) => {
    const product = await Product.findById(productId)

    if (!product || product.isDeleted) {
        throw new Error("Product is not found!");
    }

    if (quantity > product.stock) {
        throw new Error("Quantity is greater than stock!");
    }

    let cart = await Cart.findOne({ userId })

    if (!cart) {
        cart = await Cart.create({ userId, items: [] })
    }

    const existingItem = cart.items.find(i => i.productId.toString() === productId)

    if (existingItem) {
        existingItem.quantity += quantity
    } else {
        cart.items.push({
            productId: product._id,
            vendorId: product.vendorId,
            quantity
        })
    }

    await cart.save()

    return cart
}

export const getCart = async (userId: string) => {
    const cart = await Cart.findOne({ userId })
        .populate("items.productId", "name price")
        .populate("items.vendorId", "storeName");

    if (!cart) {
        return null;
    }

    return cart
}

export const updateCart = async (userId: string, productId: string, quantity: number) => {
    const cart = await Cart.findOne({ userId })

    if (!cart) {
        throw new Error("Cart not found!")
    }

    const item = cart.items.find((item) => item.productId.toString() === productId)

    if (!item) {
        throw new Error("Item not found in cart!")
    }

    const product = await Product.findById(productId)

    if (!product) {
        throw new Error("Product not found!")
    }

    if (quantity > product.stock) {
        throw new Error("Quantity is greater than stock!");
    }

    item.quantity = quantity

    await cart.save()

    return cart
}

export const removeFromCart = async (userId: string, productId: string) => {
    const cart = await Cart.findOne({ userId })

    if (!cart) {
        throw new Error("Cart not found!")
    }

    const itemIndex = cart.items.findIndex((item) => item.productId.toString() === productId)

    if (itemIndex === -1) {
        throw new Error("Item not found in cart!")
    }

    cart.items.splice(itemIndex, 1)

    await cart.save()

    return cart
}
