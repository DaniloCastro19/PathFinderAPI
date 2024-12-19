import { sequalize } from '../../src/data/database.js';
import * as chai from 'chai'
import { expect } from 'chai';
import sinonChai from "sinon-chai";
import { jest ,describe,beforeEach, afterEach,it, afterAll} from '@jest/globals';
import UserService from '../../src/core/services/user.service.js';
import User from '../../src/core/models/user.model.js';
import Sinon from "sinon";

describe('Route Obstacle Service', ()=>{
    let userService;
    chai.use(sinonChai);
    let sandbox;

    beforeEach(()=>{
        userService = new UserService();
        sandbox = Sinon.createSandbox();

        sandbox.stub(User, 'sync').resolves();
        sandbox.stub(User, 'create').resolves({
            user_id:1,
            name:'John Doe',
            email:'john.doe@example.com',
            toJSON: function name() {
                return this 
            }
        });

        sandbox.stub(User, 'findByPk');
        sandbox.stub(User, 'destroy');
    });

    afterEach(()=>{
        sandbox.restore();
    });

       
    afterAll(async () => {
        await sequalize.close();
    });



    describe('create user', ()=>{
        it('should create a new user', async()=>{
            const body = {username:'John Doe', email:'john.doe@example.com'};
            const newUser = await userService.createEntity(body);
            expect(User.sync).to.have.been.calledOnce;
            expect(User.create).to.have.been.calledOnceWithExactly(body);
            expect(newUser.user_id).to.equal(1);
        });
    });

    describe('get user', ()=>{
        it('should return a user when found', async()=>{
            const user = {user_id:1, username:'John Doe', email:'john.doe@example.com'};
            User.findByPk.resolves(user);
            const result = await userService.getEntity(1);
            expect(User.findByPk).to.have.been.calledOnceWithExactly(1);
            expect(result).to.equal(user);
        });
        it('should return null when user is not found', async()=>{
            User.findByPk.resolves(null);
            const result = await userService.getEntity(1);
            expect(User.findByPk).to.have.been.calledOnceWithExactly(1);
            expect(result).to.be.null;
        });
    });
    describe('update user', ()=>{
        it('should update the user when is found', async()=>{
            const user = {
                user_id:1,
                username:'John Doe',
                email:'john.doe@example.com',
                save: Sinon.stub().resolvesThis()
            };
            User.findByPk.resolves(user);
            const body = {username: 'updated Jhon'};
            const result = await userService.updateEntity(1, body);
            expect(User.findByPk).to.have.been.calledOnceWithExactly(1);
            expect(user.save).to.have.been.calledOnce;
            expect(result.username).to.equal('updated Jhon');
        });
        it('should return null when user is not found', async()=>{
            User.findByPk.resolves(null);
            const result = await userService.updateEntity(1, {username:'updated Jhon'});
            expect(User.findByPk).to.have.been.calledOnceWithExactly(1);
            expect(result).to.be.null;
        });
    });
    describe('delete user', ()=>{
        it('should delete the user', async()=>{
            await userService.deleteEntity(1);    

            expect(User.destroy).to.have.been.calledOnceWithExactly({where:{user_id:1}});
        });
        it('should return false when no user is deleted', async()=>{
            User.destroy.resolves(0);
            const result = await userService.deleteEntity(1);
            expect(User.destroy).to.have.been.calledOnceWithExactly({where:{user_id:1}});
            expect(result).to.be.false;
        });
    });
});