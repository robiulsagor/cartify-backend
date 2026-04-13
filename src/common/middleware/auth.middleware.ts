
import jwt from 'jsonwebtoken';
import type { Request, Response, NextFunction } from 'express';

export const auth = (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.headers.authorization?.split(' ')[1]
        if (!token) throw new Error("No token found!")

        const decoded = jwt.verify(token,
            process.env.JWT_SECRET as string) as { id: string, role: string };
        req.user = decoded;
        next();

    } catch (error) {
        res.status(401).json({ message: "Unauthorized" })
    }
}

