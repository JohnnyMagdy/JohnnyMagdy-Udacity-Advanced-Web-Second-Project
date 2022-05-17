import express, { Request, Response } from 'express';
import { User, UserStore } from '../../models/user';
import jwt, { JwtPayload } from 'jsonwebtoken';
import dotenv from 'dotenv';
import authorization from '../../utilities/authorization';

dotenv.config();

const store = new UserStore();

const index = async (req: Request, res: Response) => {
    try {
        const users = await store.index();

        res.json(users);
    } catch (err) {
        res.status(400)
        res.json(err)
    }
}
const show = async (req: Request, res: Response) => {
    const id = Number(req.params.id);

    try {
        const user = await store.show(id);

        if (user) {
            res.json(user);
        } else {
            res.status(404)
            res.send(`user with id: ${id} is not found.`)
        }
    } catch (err) {
        res.status(400)
        res.json(err)
    }
}
const create = async (req: Request, res: Response) => {
    const createduser: User = {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        password: req.body.password
    }

    try {
        const user = await store.create(createduser);

        var token = jwt.sign({ user: user }, process.env.TOKEN_SECRET!)

        res.json(token);
    } catch (err) {
        res.status(400)
        res.json(err)
    }
}

const authenticate = async (req: Request, res: Response) => {
    const authUser: User = {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        password: req.body.password
    }

    try {
        const user = await store.authenticate(authUser.firstname, authUser.password)
        var token = jwt.sign({ u: user }, process.env.TOKEN_SECRET!);
        res.json(token);
    } catch (err) {
        res.status(401);
        res.json({ err });
    }
}

const update = async (req: Request, res: Response) => {
    const updateduser: User = {
        id: Number(req.params.id),
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        password: req.body.password
    };

    try {
        const authorizationHeader = req.headers.authorization;
        const token = authorizationHeader!.split(' ')[1];
        const decoded = jwt.verify(token, process.env.TOKEN_SECRET!);

        if ((decoded as JwtPayload).user.id !== updateduser.id) {
            throw new Error('User id does not match!')
        }
    } catch (err) {
        res.status(401);
        res.json(err);
        return;
    }

    try {
        const user = await store.update(updateduser);

        if (user) {
            var token = jwt.sign({ user: user }, process.env.TOKEN_SECRET!);
            res.json(token);
        } else {
            res.status(404);
            res.send(`user with id: ${updateduser.id} is not found.`);
        }
    } catch (err) {
        res.status(400);
        res.json(err);
    }
}
const destroy = async (req: Request, res: Response) => {
    const id = Number(req.params.id);

    try {
        const deleteduser = await store.delete(id);

        if (deleteduser) {
            res.json(deleteduser);
        } else {
            res.status(404)
            res.send(`user with id: ${id} is not found.`)
        }
    } catch (err) {
        res.status(400)
        res.json(err)
    }
}

const userRoutes = (app: express.Application) => {
    app.get('/users', index);

    app.get('/users/authenticate', authenticate); //login

    app.get('/users/:id', authorization, show);

    app.post('/users', create); //signup

    app.put('/users/:id', authorization, update);

    app.delete('/users/:id', authorization, destroy);
}

export default userRoutes;