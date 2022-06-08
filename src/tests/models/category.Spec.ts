import { Category, CategoryStore } from "../../models/category";
import { Product, ProductStore } from "../../models/product";

const store = new CategoryStore();
const store2 = new ProductStore();

describe("Category Model", () => {
    it('should have an index method', () => {
        expect(store.index).toBeDefined();
    });

    it('should have a show method', () => {
        expect(store.show).toBeDefined();
    });

    it('should have a create method', () => {
        expect(store.create).toBeDefined();
    });

    it('should have a add category to product method', () => {
        expect(store.addCategoryToProduct).toBeDefined();
    });
    it('should have a add category to product method', () => {
        expect(store.update).toBeDefined();
    });


    it('create method should return the created Category', async () => {
        const createdCategory: Category = {
            name: 'first'
        }
        const result = await store.create(createdCategory);
        expect(result).toEqual({
            id: 1,
            name: 'first'
        });
    });

    it('index method should return a list of Categorys', async () => {
        const result = await store.index();
        expect(result).toEqual([{
            id: 1,
            name: 'first'
        }]);
    });

    it('add category to product method should return the updated Category', async () => {
        const prod:Product = {
            name: 'new',
            price: 200
        }
        await store2.create(prod);

        const categoryId = '1';
        const productId = '1';

        const result = await store.addCategoryToProduct(categoryId, productId);

        expect(result).toEqual({
            id: 1,
            category_id: '1',
            product_id: '1'
        });
    });

    it('update method should return an updated category', async () => {
        const updatedCategory:Category = {
            name: 'firssst'
        }

        const result = await store.update(1,updatedCategory);
        expect(result).toEqual({
            id: 1,
            name: 'firssst'
        });
    });

    it('show method should return a Category', async () => {
        const result = await store.show(1);
        expect(result).toEqual({
            id: 1,
            name: 'firssst'
        });
    });
})