import bcrypt, { hash } from 'bcrypt';
import Client from '../database';
import env from 'dotenv';

env.config();

const {
    BCRYPT_PASSWORD,
    SALT_ROUNDS
} = process.env

const pepper = BCRYPT_PASSWORD;
const saltRounds = SALT_ROUNDS;

export type User = {
    id?: number,
    firstname: string,
    lastname: string,
    password: string
}

export class UserStore {
    //show all
    async index(): Promise<User[]> {
        try {
            const sql = 'SELECT * FROM users';

            const conn = await Client.connect();
            const result = await conn.query(sql);
            conn.release();

            return result.rows;
        } catch (err) {
            throw new Error(`Cannot get users ${err}`);
        }
    }

    //show one
    async show(id: number): Promise<User> {
        try {
            const sql = 'SELECT * FROM users WHERE id=($1)';

            const conn = await Client.connect();
            const result = await conn.query(sql, [id]);
            conn.release();

            return result.rows[0];
        } catch (err) {
            throw new Error(`Cannot show user with id = ${id}. Error : ${err}`);
        }
    }

    //create one
    async create(u: User): Promise<User> {
        try {
            const sql = 'INSERT INTO users (firstname, lastname, password) VALUES ($1, $2, $3) RETURNING *';

            const hash = bcrypt.hashSync(
                u.password + pepper,
                parseInt(saltRounds!)
            );
            
            const conn = await Client.connect();
            const result = await conn.query(sql, [u.firstname, u.lastname, hash]);
            const user = result.rows[0];
            conn.release();

            return user;
        } catch (err) {
            throw new Error(`Cannot create user: ${u.firstname} ${u.lastname}. Error: ${err}`);
        }
    }

    //update one
    async update(u: User): Promise<User> {
        try {
            const sql = 'UPDATE users SET firstname=($1), lastname=($2), password=($3) WHERE id=($4) RETURNING *';

            const hash = bcrypt.hashSync(
                u.password + pepper,
                parseInt(saltRounds!)
            );

            const conn = await Client.connect();
            const result = await conn.query(sql, [u.firstname, u.lastname, hash, u.id]);
            const user = result.rows[0];
            conn.release();

            return user;
        } catch (err) {
            throw new Error(`Cannot update user: ${u.firstname} ${u.lastname}. Error: ${err}`);
        }
    }

    //delete one
    async delete(id: number): Promise<User> {
        try {
            const sql = 'DELETE FROM users WHERE id=($1) RETURNING *';

            const conn = await Client.connect();
            const result = await conn.query(sql, [id]);
            const user = result.rows[0];
            conn.release();

            return user;
        } catch (err) {
            throw new Error(`Cannot delete user: ${id}. Error: ${err}`);
        }
    }
}