import express from "express";
import jwt from 'jsonwebtoken';

const authorization = (req: express.Request, res: express.Response, next: Function): void => {
    try {
        const authorization = req.headers.authorization;
        const token = authorization?.split(' ')[1]
        jwt.verify(token!, process.env.TOKEN_SECRET!);
    } catch (err) {
        res.status(401);
        res.json(`Access denied, invalid token ${err}`);
        return;
    }
    next();
}

export default authorization;