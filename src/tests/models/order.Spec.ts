import { Order, OrderStore } from "../../models/order";
import { User, UserStore } from "../../models/user";

const store = new OrderStore();
const store2 = new UserStore();

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
        const user: User = {
            firstname:'john',
            lastname:'magdy',
            password:'pass123'
        }
        await store2.create(user);

        const createdOrder: Order = {
            userId: 1,
            status: "active"
        }
        const result = await store.create(createdOrder);
        expect(result as object).toEqual({
            id: 1,
            user_id: '1',
            status_of_order: 'active'
        });
    });

    it('index method should return a list of Orders', async () => {
        const result = await store.index();
        expect(result as object).toEqual([{
            id: 1,
            user_id: '1',
            status_of_order: 'active'
        }]);
    });

    it('add product to an order method should add product to order', async () => {
        const result = await store.addProductToOrder(10, '1', '1');
        expect(result).toEqual({
            id: 1,
            quantity: 10,
            order_id: "1",
            product_id: "1"
        });
    });

    it('show method should return a Order', async () => {
        const result = await store.show(1);
        expect(result as object).toEqual({
            id: 1,
            user_id: '1',
            status_of_order: 'active'
        });
    });
})