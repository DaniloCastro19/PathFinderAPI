import * as chai from 'chai'
import { expect } from 'chai';
import { jest ,describe,beforeEach, afterEach,afterAll, it} from '@jest/globals';
import { sequalize } from '../../src/data/database.js';
import Sinon from "sinon";
import ObstacleService from "../../src/core/services/obstacle.service.js"
import Obstacle from "../../src/core/models/obstacle.model.js";
import sinonChai from "sinon-chai";
import Route from '../../src/core/models/route.model.js';
import RouteObstacles from '../../src/core/models/routeObstacles.model.js';
import RouteObstaclesService from '../../src/core/services/routeObstacle.service.js';

describe('Obstacle Service', ()=>{
    let obstacleService;
    let routeObstacleService;
    chai.use(sinonChai);
    let sandbox;

    beforeEach(()=>{
        obstacleService = new ObstacleService();
        routeObstacleService = new RouteObstaclesService();
        sandbox = Sinon.createSandbox();
    });

    afterEach(()=>{
        sandbox.restore();
    });

    
    afterAll(async () => {
        await sequalize.close();
    });

    describe('create obstacle', ()=> { 
        it('should create a new obstacle and associate it with a route', async ()=>{
            const body = {
                position:{x:10,y:10},
                route_id: 1,
            };
            const newObstacle = {
                toJSON: Sinon.stub().returns({
                    obstacle_id:1,
                    position:{x:10,y:10}, 
                    route_id: 1
                })};
            const newRelation = {
                route_id:1,
                obstacle_id:1
            }

            sandbox.stub(Obstacle,'sync').resolves();
            sandbox.stub(Obstacle,'create').resolves(newObstacle);
            sandbox.stub(Route,'sync').resolves();
            sandbox.stub(RouteObstacles,'sync').resolves();
            sandbox.stub(RouteObstacles,'create').resolves(newRelation);
        

            const result = await obstacleService.createEntity(body);

            expect(result).to.deep.equal({
                obstacle_id:1,
                position:{x:10,y:10}, 
                route_id: 1
            });
            expect(Obstacle.create).to.have.been.calledOnceWith(body);
        });
    });

    describe('get obstacle', ()=> { 
        it('should return a obstacle by id', async ()=>{
            const obstacle = {
                name: 'Test obstacle',
                dimensions:{width:100,height:100},
                route_id:1
            };            
            
            sandbox.stub(Obstacle,'findByPk').resolves(obstacle);

            const result = await obstacleService.getEntity(1);

            expect(result).to.deep.equal(obstacle);
            expect(Obstacle.findByPk).to.have.been.calledOnceWith(1);
        });

    });

    describe('update obstacle', ()=> { 
        it('should upate an obstacle', async ()=>{
            const obstacle = {
                obstacle_id:1,
                position:{x:120,y:110},
                route_id:1,
                save: Sinon.stub().resolves()
            };     
            const body = {position: {x:14,y:45}}       
            
            sandbox.stub(Obstacle,'findByPk').resolves(obstacle);

            const result = await obstacleService.updateEntity(1,body);

            expect(result.position).to.deep.equal({x:14,y:45});
            expect(obstacle.save).to.have.been.calledOnce;
            expect(Obstacle.findByPk).to.have.been.calledOnceWith(1);
        });
        it('should return null if obstacle to update is not found', async ()=>{
            sandbox.stub(Obstacle,'findByPk').resolves(null);
            const result = await obstacleService.updateEntity(999,{x:44,y:54});
    
            expect(result).to.be.null;
            expect(Obstacle.findByPk).to.have.been.calledOnceWith(999);
        });

    });
    describe('delete obstacle', ()=> { 
        it('should delete an obstacle by id', async ()=>{
            
            sandbox.stub(Obstacle, 'destroy').resolves(1);
            const result = await obstacleService.deleteEntity(1);
            
            expect(result).to.be.true;
            expect(Obstacle.destroy).to.have.been.calledOnceWith({where:{obstacle_id:1}});
        });
        it('should return false if no obstacle is deleted', async ()=>{            
            sandbox.stub(Obstacle, 'destroy').resolves(0);
            const result = await obstacleService.deleteEntity(999);
            
            expect(result).to.be.false;
            expect(Obstacle.destroy).to.have.been.calledOnceWith({where:{obstacle_id:999}});
        });

    });
});
