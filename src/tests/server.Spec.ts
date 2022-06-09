import app from "../server";
import supertest from "supertest";

const request = supertest(app);

describe('Test endpoint responses', () => {
    it('gets the api endpoint', async () => {
        const response = await request.get('/api');
        expect(response.status).toBe(200);
    });
    it('gets the products endpoint', async () => {
        const response = await request.get('/products');
        expect(response.status).toBe(200);
    });
    it('gets the users endpoint', async () => {
        const response = await request.get('/users');
        expect(response.status).toBe(200);
    });
    it('gets the orders endpoint', async () => {
        const response = await request.get('/orders');
        expect(response.status).toBe(200);
    });
});