import { Category, CategoryStore } from "../../models/category";

const store = new CategoryStore();

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

    it('should have a delete method', () => {
        expect(store.addCategoryToProduct).toBeDefined();
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
        const categoryId = '1';
        const productId = '1';
        const updatedCategory: Category = {
            id: 1,
            name: 'first',
        }
        const result = await store.addCategoryToProduct(categoryId, productId);
        expect(result).toEqual({
            id: 1,
            categoryId: 1,
            productId: 1
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