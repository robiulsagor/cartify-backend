import type { Request, Response } from "express";
import { applyForVendor, approveVendor } from "./vendor.service.ts"

export interface AuthRequest extends Request {
    user?: {
        id: string;
        role: string;
    };
}

interface Params {
    id: string;
}

export const applyVendor = async (req: AuthRequest, res: Response) => {
    try {
        if (!req.user) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        const vendor = await applyForVendor(req.user.id, req.body)
        res.status(201).json(vendor);
    } catch (error: any) {
        res.status(400).json({ message: error.message })
    }
}

export const approveVen = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        if (Array.isArray(id)) {
            return res.status(400).json({ message: "Invalid id" });
        }

        if (!id) {
            return res.status(400).json({ message: "ID is required" });
        }

        const vendor = await approveVendor(id);
        res.status(200).json(vendor);
    } catch (error: any) {
        res.status(400).json({ message: error.message })
    }
}