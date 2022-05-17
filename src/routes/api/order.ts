import express, { Request, Response } from 'express';
import { Order, OrderStore } from '../../models/order';
import authorization from '../../utilities/authorization';

const store = new OrderStore();

const index = async (req: Request, res: Response) => {
    try {
        const orders = await store.index();

        res.json(orders);
    } catch (err) {
        res.status(400)
        res.json(err)
    }
}

const show = async (req: Request, res: Response) => {
    const id = Number(req.params.id);

    try {
        const order = await store.show(id);

        if (order) {
            res.json(order);
        } else {
            res.status(404)
            res.send(`order with id: ${id} is not found.`)
        }
    } catch (err) {
        res.status(400)
        res.json(err)
    }
}

const create = async (req: Request, res: Response) => {
    const createdOrder: Order = {
        userId: req.body.userId,
        status: 'active',
    }

    try {
        const order = await store.create(createdOrder);

        res.json(order);
    } catch (err) {
        res.status(400)
        res.json(err)
    }
}

// const update = async (req: Request, res: Response) => {
//     const updatedorder: order = {
//         id: Number(req.params.id),
//         name: req.body.name,
//         price: req.body.price
//     }

//     try {
//         const order = await store.update(updatedorder);

//         if (order) {
//             res.json(order);
//         } else {
//             res.status(404)
//             res.send(`order with id: ${updatedorder.id} is not found.`)
//         }
//     } catch (err) {
//         res.status(400)
//         res.json(err)
//     }
// }

// const destroy = async (req: Request, res: Response) => {
//     const id = Number(req.params.id);

//     try {
//         const deletedorder = await store.delete(id);

//         if (deletedorder) {
//             res.json(deletedorder);
//         } else {
//             res.status(404)
//             res.send(`order with id: ${id} is not found.`)
//         }
//     } catch (err) {
//         res.status(400)
//         res.json(err)
//     }
// }

const addProductToOrder = async (_req: Request, res: Response) => {
    const orderId: string = _req.params.id;
    const productId: string = _req.body.productId;
    const quantity: number = parseInt(_req.body.quantity);

    try {
        const addedProduct = await store.addProductToOrder(quantity, orderId, productId);
        res.json(addedProduct);
    } catch (err) {
        res.status(400);
        res.json(err);
    }
}

const orderRoutes = (app: express.Application) => {
    app.get('/orders', authorization, index);

    app.get('/orders/:id', authorization, show);

    app.post('/orders', authorization, create);

    app.post('/orders/:id/products', addProductToOrder);

    // app.put('/orders/:id', update);

    // app.delete('/orders/:id', destroy);
}

export default orderRoutes;