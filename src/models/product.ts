import Client from '../database'

export type Product = {
    id?: Number;
    name: string;
    price: number;
}

export class ProductStore {
    //show all
    async index(): Promise<Product[]> {
        try {
            const sql = 'SELECT * FROM products'

            const conn = await Client.connect();
            const result = await conn.query(sql)
            conn.release()

            return result.rows
        } catch (err) {
            throw new Error(`Cannot get products ${err}`);
        }
    }

    //show one
    async show(id: number): Promise<Product> {
        try {
            const sql = 'SELECT * FROM products WHERE id=($1)'

            const conn = await Client.connect();
            const result = await conn.query(sql, [id]);
            conn.release();

            return result.rows[0]
        } catch (err) {
            throw new Error(`Cannot show product with id = ${id}. Error : ${err}`);
        }
    }

    //create
    async create(p: Product): Promise<Product> {
        try {
            const sql = 'INSERT INTO products (name, price) VALUES ($1, $2) RETURNING *'

            const conn = await Client.connect();
            const result = await conn.query(sql, [p.name, p.price]);
            const product = result.rows[0];
            conn.release();

            return product;
        } catch (err) {
            throw new Error(`Cannot create product: ${p.name}. Error: ${err}`);
        }
    }

    //update
    async update(p: Product): Promise<Product> {
        try {
            const sql = 'UPDATE products SET name=($1), price=($2) WHERE id=($3) RETURNING *'

            const conn = await Client.connect();
            const result = await conn.query(sql, [p.name, p.price, p.id])
            const product = result.rows[0];
            conn.release();

            return product;
        } catch (err) {
            throw new Error(`Cannot update product: ${p.name}. Error: ${err}`);
        }
    }

    //delete
    async delete(id: number): Promise<Product> {
        try {
            const sql = 'DELETE FROM products WHERE id=($1) RETURNING *'

            const conn = await Client.connect();
            const result = await conn.query(sql, [id]);
            const product = result.rows[0];
            conn.release();

            return product;
        } catch (err) {
            throw new Error(`Cannot delete product: ${id}. Error: ${err}`);
        }
    }
}