import { sequalize } from '../../src/data/database.js';
import Sinon from "sinon";
import * as chai from 'chai'
import sinonChai from "sinon-chai";
import { expect } from "chai";
import { jest ,describe,beforeEach, afterEach,it, afterAll} from '@jest/globals';
import RouteService from "../../src/core/services/route.service.js";
import Route from "../../src/core/models/route.model.js";
import Map from "../../src/core/models/map.model.js";
import RouteObstacles from "../../src/core/models/routeObstacles.model.js";
import RouteWaypoints from "../../src/core/models/routeWaypoints.model.js";
import Obstacle from "../../src/core/models/obstacle.model.js";
import Waypoint from "../../src/core/models/waypoint.model.js";

describe('Route Service', () =>{
    let routeService;
    let sandbox;
    chai.use(sinonChai);

    beforeEach(()=>{
        routeService = new RouteService();
        sandbox = Sinon.createSandbox();

        sandbox.stub(Route,'sync').resolves();
        sandbox.stub(Map, 'sync').resolves();
        sandbox.stub(Route,'findOne');
        sandbox.stub(Route,'create');
        sandbox.stub(Route,'findByPk');
        sandbox.stub(Route,'destroy');
        sandbox.stub(Obstacle, 'findAll');
        sandbox.stub(Waypoint, 'findAll');
        sandbox.stub(RouteObstacles, 'findOne');
        sandbox.stub(RouteWaypoints, 'findOne');
    });

    afterEach(()=>{
        sandbox.restore();
    });

    afterAll(async () => {
        await sequalize.close();
    });


    describe('create route',()=>{
        it('should create a new route if not existing route for the map', async()=>{
            const body = {start:{x:4,y:4},end:{x:5,y:5}, map_id:1};
            const newRoute ={toJSON: Sinon.stub().returns({
                start:{x:4,y:4},
                end:{x:5,y:5},
                map_id:1
             })}
            Route.findOne.resolves(null);
            Route.create.resolves(newRoute);


            const result = await routeService.createRoute(body);
            
            expect(result).to.deep.equal({
                start:{x:4,y:4},
                end:{x:5,y:5},
                map_id:1
            });
            expect(Route.findOne).to.have.been.calledOnceWith({where:{map_id:1}});
            expect(Route.create).to.have.been.calledOnceWith(body);
            
        });

        it('should return null if a route already exists for the map', async () =>{
            Route.findOne.resolves({});

            const body = {
                start:{x:4,y:4},
                end:{x:5,y:5},
                map_id:1
             }

             const result = await routeService.createRoute(body);
             expect(result).to.be.null;
             expect(Route.findOne).to.have.been.calledOnceWith({where:{map_id:1}});
             expect(Route.create).to.not.have.been.called;

        });
    });

    describe('get route', ()=>{
        it('should return a route by id', async ()=>{
            const route = {
                start:{x:4,y:4},
                end:{x:5,y:5},
                map_id:1
            };            
            Route.findByPk.resolves(route);
            const result = await routeService.getRoute(1);

            expect(result).to.deep.equal(route);
            expect(Route.findByPk).to.have.been.calledOnceWith(1);
        });

        it('should return null if route is not found', async () =>{
            Route.findByPk.resolves(null);
            const result = await routeService.getRoute(999);

            expect(result).to.be.null;
            expect(Route.findByPk).to.have.been.calledOnceWith(999);
        });
    });

    describe('delete route', ()=> {
        it('should delete a route by id', async ()=>{
            Route.destroy.resolves(1);
            const result = await routeService.deleteRoute(1);
            expect(result).to.be.true;
            expect(Route.destroy).to.have.been.calledOnceWith({where:{route_id:1}});
        });

        it('should return false if no route was deleted', async () =>{ 
            Route.destroy.resolves(0);

            const result = await routeService.deleteRoute(1);

            expect(result).to.be.false;
            expect(Route.destroy).to.have.been.calledOnceWith({where:{route_id:1}});
        });
    });
});
