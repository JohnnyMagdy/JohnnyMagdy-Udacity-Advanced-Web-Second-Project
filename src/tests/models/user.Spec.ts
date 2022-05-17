import { User, UserStore } from "../../models/user";

const store = new UserStore();

describe("User Model", () => {
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


    it('create method should return the created User', async () => {
        const createdUser: User = {
            firstname: 'name1',
            lastname: 'name2',
            password: 'pass'
        }
        const result = await store.create(createdUser);
        expect(result).toEqual({
            id: 1,
            firstname: 'name1',
            lastname: 'name2',
            password: 'pass'
        });
    });

    it('index method should return a list of Users', async () => {
        const result = await store.index();
        expect(result).toEqual([{
            id: 1,
            firstname: 'name1',
            lastname: 'name2',
            password: 'pass'
        }]);
    });

    it('update method should return the updated User', async () => {
        const updatedUser: User = {
            id: 1,
            firstname: 'Updatedname1',
            lastname: 'name2 Updated',
            password: 'pass123'
        }
        const result = await store.update(updatedUser);
        expect(result).toEqual({
            id: 1,
            firstname: 'Updatedname1',
            lastname: 'name2 Updated',
            password: 'pass123'
        });
    });

    it('show method should return a User', async () => {
        const result = await store.show(1);
        expect(result).toEqual({
            id: 1,
            firstname: 'Updatedname1',
            lastname: 'name2 Updated',
            password: 'pass123'
        });
    });

    it('delete method should delete a User', async () => {
        const result = await store.delete(1);
        expect(result).toEqual({
            id: 1,
            firstname: 'Updatedname1',
            lastname: 'name2 Updated',
            password: 'pass123'
        });
    });
})