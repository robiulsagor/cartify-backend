import type { Request, Response } from "express";
import { loginUser, registerUser } from "./auth.service.ts";

export const register = async (req: Request, res: Response) => {
    try {
        const user = await registerUser(req.body);
        res.status(201).json(user);
    } catch (error: any) {
        res.status(400).json({ message: error.message })
    }
}

export const login = async (req: Request, res: Response) => {
    try {
        const user = await loginUser(req.body.email, req.body.password);
        res.status(200).json(user);
    } catch (error: any) {
        res.status(400).json({ message: error.message })
    }
}