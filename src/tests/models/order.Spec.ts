import { Order, OrderStore } from "../../models/order";

const store = new OrderStore();

describe("Order Model", () => {
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
        expect(store.addProductToOrder).toBeDefined();
    });


    it('create method should return the created Order', async () => {
        const createdOrder: Order = {
            userId: 1,
            status: "active"
        }
        const result = await store.create(createdOrder);
        expect(result).toEqual({
            id: 1,
            userId: 1,
            status: "active"
        });
    });

    it('index method should return a list of Orders', async () => {
        const result = await store.index();
        expect(result).toEqual([{
            id: 1,
            userId: 1,
            status: "active"
        }]);
    });

    it('add product to an order method should delete a Order', async () => {
        const result = await store.addProductToOrder(10, '1', '1');
        expect(result).toEqual({
            id: 8,
            quantity: 5,
            order_id: "1",
            product_id: "1"
        });
    });

    it('show method should return a Order', async () => {
        const result = await store.show(1);
        expect(result).toEqual({
            id: 1,
            userId: 1,
            status: 'active'
        });
    });
})