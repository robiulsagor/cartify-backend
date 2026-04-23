import type { Response, NextFunction } from 'express';

export const authorize = (...roles: string[])=>{
    return (req: any, res: Response, next: NextFunction) => {
        if(!roles.includes(req.user.role)) {
            return res.status(403).json({message: "You don't have permission to perform this action!"})
        }
        next();
    }
}