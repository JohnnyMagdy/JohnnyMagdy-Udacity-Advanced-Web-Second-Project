import bcrypt, { hash } from 'bcrypt';
import { User, UserStore } from "../../models/user";
import env from 'dotenv';

env.config();

const {
    BCRYPT_PASSWORD,
    SALT_ROUNDS
} = process.env

const pepper = BCRYPT_PASSWORD;
const saltRounds = SALT_ROUNDS;
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

        if(bcrypt.compareSync(createdUser.password + pepper, result.password)){
            createdUser.password = result.password;
        }else{console.log("err");}

        expect(result).toEqual({
            id: 2,
            firstname: 'name1',
            lastname: 'name2',
            password: createdUser.password
        });
    });

    it('index method should return a list of Users', async () => {
        const result = await store.index();

        let pass1:string = 'pass123';
        let pass2:string = 'pass';

        if(bcrypt.compareSync(pass1 + pepper, result[0].password)){
            pass1 = result[0].password;
        }else{console.log("err");}

        if(bcrypt.compareSync(pass2 + pepper, result[1].password)){
            pass2 = result[1].password;
        }else{console.log("err");}

        expect(result).toEqual([{
            id: 1,
            firstname: 'john',
            lastname: 'magdy',
            password: pass1
        },{
            id: 2,
            firstname: 'name1',
            lastname: 'name2',
            password: pass2
        }]);
    });

    it('update method should return the updated User', async () => {
        const updatedUser: User = {
            id: 2,
            firstname: 'Updatedname1',
            lastname: 'name2 Updated',
            password: 'pass123'
        }
        const result = await store.update(updatedUser);

        let pass = updatedUser.password;

        if(bcrypt.compareSync(pass + pepper, result.password)){
            pass = result.password;
        }else{console.log("err");}

        expect(result).toEqual({
            id: 2,
            firstname: 'Updatedname1',
            lastname: 'name2 Updated',
            password: pass
        });
    });

    it('show method should return a User', async () => {
        const result = await store.show(2);

        let pass = 'pass123';

        if(bcrypt.compareSync(pass + pepper, result.password)){
            pass = result.password;
        }else{console.log("err");}

        expect(result).toEqual({
            id: 2,
            firstname: 'Updatedname1',
            lastname: 'name2 Updated',
            password: pass
        });
    });

    // it('delete method should delete a User', async () => {
    //     const result = await store.delete(1);

    //     let pass:string = 'pass123';

    //     if(bcrypt.compareSync(pass + pepper, result.password)){
    //         pass = result.password;
    //     }else{console.log("err");}

    //     expect(result).toEqual({
    //         id: 2,
    //         firstname: 'Updatedname1',
    //         lastname: 'name2 Updated',
    //         password: pass
    //     });
    // });
})