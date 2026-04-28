import { addToCart, getCart, removeFromCart, updateCart } from "./cart.service.ts"
import type { Request, Response } from "express"

export const add = async (req: Request, res: Response) => {
    try {
        const { productId, quantity } = req.body
        const userId = req.user?.id as string

        if (!productId) {
            throw new Error("Product id is required!")
        }

        const cart = await addToCart(userId, productId, quantity)
        res.status(201).json({ success: true, cart })
    } catch (error: any) {
        res.status(500).json({ success: false, message: error.message })
    }
}

export const get = async (req: Request, res: Response) => {
    try {
        const userId = req.user?.id as string
        const cart = await getCart(userId)
        res.status(200).json({ success: true, cart })
    } catch (error: any) {
        res.status(500).json({ success: false, message: error.message })
    }
}

export const update = async (req: Request, res: Response) => {
    try {
        const { productId, quantity } = req.body
        const userId = req.user?.id as string

        if (!productId) {
            throw new Error("Product id is required!")
        }

        const cart = await updateCart(userId, productId, quantity)
        res.status(200).json({ success: true, cart })
    } catch (error: any) {
        res.status(500).json({ success: false, message: error.message })
    }
}

export const remove = async (req: Request, res: Response) => {
    try {
        const productId = req.params.productId as string
        const userId = req.user?.id as string

        if (!productId) {
            throw new Error("Product id is required!")
        }

        const cart = await removeFromCart(userId, productId)
        res.status(200).json({ success: true, cart })
    } catch (error: any) {
        res.status(500).json({ success: false, message: error.message })
    }
}
