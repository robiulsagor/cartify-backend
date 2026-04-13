import type { Request, Response } from "express";
import { applyForVendor, approveVendor } from "./vendor.service.ts"

interface AuthRequest extends Request {
  user: {
    id: string;
    role: string;
  };
}

interface Params  {
    id: string;
}

export const applyVendor= async (req: AuthRequest, res: Response)=>{
    try {
        const vendor = await applyForVendor(req.user.id, req.body)
        res.status(201).json(vendor);
    } catch (error: any) {
        res.status(400).json({message: error.message})
    }
}

export const approve = async (req: Request<Params>, res: Response)=>{
    try {
        const vendor = await approveVendor(req.params.id)
        res.status(200).json(vendor);
    } catch (error: any) {
        res.status(400).json({message: error.message})
    }
}