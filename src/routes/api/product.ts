import express, { Request, Response } from 'express';
import { Product, ProductStore } from '../../models/product';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import authorization from '../../utilities/authorization';

dotenv.config()
const {
    TOKEN_SECRET
} = process.env

const store = new ProductStore();

const index = async (req: Request, res: Response) => {
    try {
        const products = await store.index();

        res.json(products);
    } catch (err) {
        res.status(400)
        res.json(err)
    }
}

const show = async (req: Request, res: Response) => {
    const id = Number(req.params.id);

    try {
        const product = await store.show(id);

        if (product) {
            res.json(product);
        } else {
            res.status(404)
            res.send(`Product with id: ${id} is not found.`)
        }
    } catch (err) {
        res.status(400)
        res.json(err)
    }
}

const create = async (req: Request, res: Response) => {
    const createdProduct: Product = {
        name: req.body.name,
        price: req.body.price
    }

    try {
        const product = await store.create(createdProduct);

        res.json(product);
    } catch (err) {
        res.status(400)
        res.json(err)
    }
}

const update = async (req: Request, res: Response) => {
    const updatedProduct: Product = {
        id: Number(req.params.id),
        name: req.body.name,
        price: req.body.price
    }

    try {
        const product = await store.update(updatedProduct);

        if (product) {
            res.json(product);
        } else {
            res.status(404)
            res.send(`Product with id: ${updatedProduct.id} is not found.`)
        }
    } catch (err) {
        res.status(400)
        res.json(err)
    }
}

const destroy = async (req: Request, res: Response) => {
    const id = Number(req.params.id);

    try {
        const deletedProduct = await store.delete(id);

        if (deletedProduct) {
            res.json(deletedProduct);
        } else {
            res.status(404)
            res.send(`Product with id: ${id} is not found.`)
        }
    } catch (err) {
        res.status(400)
        res.json(err)
    }
}

const productRoutes = (app: express.Application) => {
    app.get('/products', index);

    app.get('/products/:id', show);

    app.post('/products', authorization, create);

    app.put('/products/:id', authorization, update);

    app.delete('/products/:id', authorization, destroy);
}

export default productRoutes;