
import jwt from 'jsonwebtoken';
import type { Request, Response, NextFunction } from 'express';

export const auth = (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.headers.authorization?.split(" ")[1];

        if (!token) throw new Error("No token");

        const decoded: any = jwt.verify(
            token,
            process.env.JWT_SECRET as string
        );
        req.user = decoded;
        next();

    } catch (error: any) {
        res.status(401).json({ message: error.message || "Unauthorized" })
    }
}

