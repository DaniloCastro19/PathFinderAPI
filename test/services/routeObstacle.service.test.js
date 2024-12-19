import { sequalize } from '../../src/data/database.js';
import * as chai from 'chai'
import { expect } from 'chai';
import sinonChai from "sinon-chai";
import { jest ,describe,beforeEach, afterEach,it, afterAll} from '@jest/globals';
import Sinon from "sinon";
import RouteObstaclesService from "../../src/core/services/routeObstacle.service.js";
import RouteObstacles from '../../src/core/models/routeObstacles.model.js';
import Route from '../../src/core/models/route.model.js';
import Obstacle from '../../src/core/models/obstacle.model.js';

describe('Route Obstacle Service', ()=>{
    let routeObstacleService;
    chai.use(sinonChai);
    let sandbox;

    beforeEach(()=>{
        routeObstacleService = new RouteObstaclesService();
        sandbox = Sinon.createSandbox();
        sandbox.stub(Route, 'sync').resolves();
        sandbox.stub(Obstacle, 'sync').resolves();
        sandbox.stub(RouteObstacles, 'sync').resolves();
        sandbox.stub(RouteObstacles, 'create').resolves({
            route_id:1,
            obstacle_id:1
        });

    });

    afterEach(()=>{
        sandbox.restore();
    });

       
    afterAll(async () => {
        await sequalize.close();
    });


    describe('create a obstacle for a route', () =>{
        it('should create a new route obstacle', async ()=>{
            
            const route_id = 1;
            const obstacle_id = 1; 
            
            await routeObstacleService.createRouteEntities(route_id,obstacle_id);
            
            expect(Route.sync).to.have.been.calledOnce;
            expect(Obstacle.sync).to.have.been.calledOnce;
            expect(RouteObstacles.sync).to.have.been.calledOnce;
            expect(RouteObstacles.create).to.have.been.calledOnceWithExactly({
                route_id:route_id,
                obstacle_id:obstacle_id
            });
        });
    });
});