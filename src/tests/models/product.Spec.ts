import { Product, ProductStore } from "../../models/product";

const store = new ProductStore();

describe("Product Model", () => {
    it('should have an index method', () => {
        expect(store.index).toBeDefined();
    });

    it('should have a show method', () => {
        expect(store.show).toBeDefined();
    });

    it('should have a create method', () => {
        expect(store.create).toBeDefined();
    });

    it('should have an update method', () => {
        expect(store.update).toBeDefined();
    });

    it('should have a delete method', () => {
        expect(store.delete).toBeDefined();
    });


    it('create method should return the created product', async () => {
        const createdProduct: Product = {
            name: 'first',
            price: 10
        }
        const result = await store.create(createdProduct);
        expect(result).toEqual({
            id: 1,
            name: 'first',
            price: 10
        });
    });

    it('index method should return a list of products', async () => {
        const result = await store.index();
        expect(result).toEqual([{
            id: 1,
            name: 'first',
            price: 10
        }]);
    });

    it('update method should return the updated product', async () => {
        const updatedProduct: Product = {
            id: 1,
            name: 'firssst',
            price: 1000
        }
        const result = await store.update(updatedProduct);
        expect(result).toEqual({
            id: 1,
            name: 'firssst',
            price: 1000
        });
    });

    it('show method should return a product', async () => {
        const result = await store.show(1);
        expect(result).toEqual({
            id: 1,
            name: 'firssst',
            price: 1000
        });
    });

    it('delete method should delete a product', async () => {
        const result = await store.delete(1);
        expect(result).toEqual({
            id: 1,
            name: 'firssst',
            price: 1000
        });
    });
})