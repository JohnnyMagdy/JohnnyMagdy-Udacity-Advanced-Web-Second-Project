import express, { Request, Response } from 'express';
import { Category, CategoryStore } from '../../models/category';
import authorization from '../../utilities/authorization';

const store = new CategoryStore();

const index = async (req: Request, res: Response) => {
    try {
        const Categorys = await store.index();

        res.json(Categorys);
    } catch (err) {
        res.status(400)
        res.json(err)
    }
}

const show = async (req: Request, res: Response) => {
    const id = Number(req.params.id);

    try {
        const Category = await store.show(id);

        if (Category) {
            res.json(Category);
        } else {
            res.status(404)
            res.send(`Category with id: ${id} is not found.`)
        }
    } catch (err) {
        res.status(400)
        res.json(err)
    }
}

const create = async (req: Request, res: Response) => {
    const name = req.body.name

    try {
        const Category = await store.create(name);

        res.json(Category);
    } catch (err) {
        res.status(400)
        res.json(err)
    }
}

const addCategoryToProduct = async (_req: Request, res: Response) => {
    const categoryId: string = _req.params.id;
    const productId: string = _req.body.productId;

    try {
        const addedProduct = await store.addCategoryToProduct(categoryId, productId);
        res.json(addedProduct);
    } catch (err) {
        res.status(400);
        res.json(err);
    }
}

const CategoryRoutes = (app: express.Application) => {
    app.get('/categorys', authorization, index);

    app.get('/categorys/:id', authorization, show);

    app.post('/categorys', authorization, create);

    app.post('/categorys/:id/products', addCategoryToProduct);
}

export default CategoryRoutes;