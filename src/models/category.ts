import Client from '../database'

export type Category = {
    id?: Number;
    name: string;
}

export class CategoryStore {
    //show all
    async index(): Promise<Category[]> {
        try {
            const sql = 'SELECT * FROM Categorys'

            const conn = await Client.connect();
            const result = await conn.query(sql)
            conn.release()

            return result.rows
        } catch (err) {
            throw new Error(`Cannot get Categorys ${err}`);
        }
    }

    //show one
    async show(id: number): Promise<Category> {
        try {
            const sql = 'SELECT * FROM Categorys WHERE id=($1)'

            const conn = await Client.connect();
            const result = await conn.query(sql, [id]);
            conn.release();

            return result.rows[0]
        } catch (err) {
            throw new Error(`Cannot show Category with id = ${id}. Error : ${err}`);
        }
    }

    //create
    async create(category: Category): Promise<Category> {
        try {
            const sql = 'INSERT INTO categorys (name) VALUES ($1) RETURNING *'

            const conn = await Client.connect();
            const result = await conn.query(sql, [category.name]);
            const Category = result.rows[0];
            conn.release();

            return Category;
        } catch (err) {
            throw new Error(`Cannot create Category: ${name}. Error: ${err}`);
        }
    }

    async addCategoryToProduct(categoryId: string, productId: string): Promise<object> {
        try {
            const sql = 'INSERT INTO category_products (category_id, product_id) VALUES ($1, $2) RETURNING *'
            const conn = await Client.connect();
            const result = await conn.query(sql, [categoryId, productId]);
            conn.release();

            const Category = result.rows[0];

            console.log(result);

            return Category;
        } catch (err) {
            throw new Error(`Could not add category ${categoryId} to product ${productId}. Error:${err}`);
        }
    }
}