import jwt, { JwtPayload } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

const SECRET_KEY = process.env.SECRET_KEY ?? '';

export interface CustomRequest extends Request {
  decodedToken: string | JwtPayload;
}

export const authorizer = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
      throw new Error();
    }

    const decoded = jwt.verify(token, SECRET_KEY);
    (req as CustomRequest).decodedToken = decoded;

    next();
  } catch (err) {
    res.status(401).send('Please authenticate');
  }
};
