import Client from '../database'

export type Order = {
    id?: Number;
    userId: Number;
    status: string;
}

export class OrderStore {
    //show all
    async index(): Promise<Order[]> {
        try {
            const sql = 'SELECT * FROM orders'

            const conn = await Client.connect();
            const result = await conn.query(sql)
            conn.release()

            return result.rows
        } catch (err) {
            throw new Error(`Cannot get orders ${err}`);
        }
    }

    //show one
    async show(id: number): Promise<Order> {
        try {
            const sql = 'SELECT * FROM orders WHERE id=($1)'

            const conn = await Client.connect();
            const result = await conn.query(sql, [id]);
            conn.release();

            return result.rows[0]
        } catch (err) {
            throw new Error(`Cannot show order with id = ${id}. Error : ${err}`);
        }
    }

    //create
    async create(p: Order): Promise<Order> {
        try {
            const sql = 'INSERT INTO orders (status_of_order, user_id) VALUES ($1, $2) RETURNING *'

            const conn = await Client.connect();
            const result = await conn.query(sql, [p.status, p.userId]);
            const order = result.rows[0];
            conn.release();

            return order;
        } catch (err) {
            throw new Error(`Cannot create order: ${p.id}. Error: ${err}`);
        }
    }

    async addProductToOrder(quantity: number, orderId: string, productId: string): Promise<object> {
        try {
            const sql = 'SELECT * FROM orders WHERE id=($1)'
            const conn = await Client.connect()
            const result = await conn.query(sql, [Number(orderId)])
            conn.release()

            const order = result.rows[0]

            if (order.status_of_order == "complete") {
                throw new Error(`Could not add product ${productId} to order ${orderId} because order status is ${order.status_of_order}`)
            }
        } catch (err) {
            throw new Error(`${err}`)
        }

        try {
            const sql = 'INSERT INTO order_products (quantity, order_id, product_id) VALUES ($1, $2, $3) RETURNING *'
            const conn = await Client.connect();
            const result = await conn.query(sql, [quantity, orderId, productId]);
            conn.release();

            const order = result.rows[0];

            return order;
        } catch (err) {
            throw new Error(`Could not add product ${productId} to order ${orderId}. Error:${err}`);
        }
    }

    // //update
    // async update(p: order): Promise<order> {
    //     try {
    //         const sql = 'UPDATE orders SET name=($1), price=($2) WHERE id=($3) RETURNING *'

    //         const conn = await Client.connect();
    //         const result = await conn.query(sql, [p.name, p.price, p.id])
    //         const order = result.rows[0];
    //         conn.release();

    //         return order;
    //     } catch (err) {
    //         throw new Error(`Cannot update order: ${p.name}. Error: ${err}`);
    //     }
    // }

    // //delete
    // async delete(id: number): Promise<order> {
    //     try {
    //         const sql = 'DELETE FROM orders WHERE id=($1) RETURNING *'

    //         const conn = await Client.connect();
    //         const result = await conn.query(sql, [id]);
    //         const order = result.rows[0];
    //         conn.release();

    //         return order;
    //     } catch (err) {
    //         throw new Error(`Cannot delete order: ${id}. Error: ${err}`);
    //     }
    // }
}