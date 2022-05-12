import express, { Request, Response } from 'express';
import { User, UserStore } from '../../models/user';

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
    try {
        const id = Number(req.params.id);
        const user = await store.show(id);

        if (user) {
            res.json(user);
        } else{
            res.status(404)
            res.send(`user with id: ${id} is not found.`)
        }
    } catch (err) {
        res.status(400)
        res.json(err)
    }
}
const create = async (req: Request, res: Response) => {
    try {
        const createduser: User = {
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            password: req.body.password
        }
        const user = await store.create(createduser);

        res.json(user);
    } catch (err) {
        res.status(400)
        res.json(err)
    }
}
const update = async (req: Request, res: Response) => {
    try {
        const updateduser: User = {
            id: Number(req.params.id),
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            password: req.body.password
        }
        const user = await store.update(updateduser);

        if (user) {
            res.json(user);
        } else{
            res.status(404)
            res.send(`user with id: ${updateduser.id} is not found.`)
        }
    } catch (err) {
        res.status(400)
        res.json(err)
    }
}
const destroy = async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id);
        const deleteduser = await store.delete(id);

        if (deleteduser) {
            res.json(deleteduser);
        } else{
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

    app.get('/users/:id', show);

    app.post('/users', create);

    app.put('/users/:id', update);

    app.delete('/users/:id', destroy);
}

export default userRoutes;