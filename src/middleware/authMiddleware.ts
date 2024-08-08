import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { AppError } from '../Errors/AppError';

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        throw new AppError('Token not provided', 401);
    }

    const [, token] = authHeader.split(' ');

    try {
        const decoded = jwt.verify(token, String(process.env.PRIVATE_KEY_JWT));
        req.user = decoded;
        return next();
    } catch (error) {
        throw new AppError('Invalid token', 401);
    }
};