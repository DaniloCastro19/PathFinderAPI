import { sequalize } from '../../src/data/database.js';
import * as chai from 'chai'
import Sinon from "sinon";
import { expect } from 'chai';
import { jest ,describe,beforeEach, afterEach,it, afterAll} from '@jest/globals';
import WaypointService from '../../src/core/services/waypoint.service.js';
import Waypoint from '../../src/core/models/waypoint.model.js';
import sinonChai from "sinon-chai";
import Route from '../../src/core/models/route.model.js';
import RouteWaypoints from '../../src/core/models/routeWaypoints.model.js';
import RouteWaypointService from '../../src/core/services/routeWaypoint.service.js';

describe('Waypoint Service', ()=>{
    let waypointService;
    let routeWaypointService;
    chai.use(sinonChai);
    let sandbox;

    beforeEach(()=>{
        waypointService = new WaypointService();
        routeWaypointService = new RouteWaypointService();
        sandbox = Sinon.createSandbox();
    });

    afterEach(()=>{
        sandbox.restore();
    });

       
    afterAll(async () => {
        await sequalize.close();
    });


    describe('create waypoint', ()=> { 
        it('should create a new waypoint and associate it with a route', async ()=>{
            const body = {
                name:"Test waypoint",
                position:{x:10,y:10},
                route_id: 1,
            };
            const newWaypoint = {
                toJSON: Sinon.stub().returns({
                    waypoint_id:1,
                    name:"Test waypoint",
                    position:{x:10,y:10}, 
                    route_id: 1
                })};
            const newRelation = {
                route_id:1,
                waypoint_id:1
            }

            sandbox.stub(Waypoint,'sync').resolves();
            sandbox.stub(Waypoint,'create').resolves(newWaypoint);
            sandbox.stub(Route,'sync').resolves();
            sandbox.stub(RouteWaypoints,'sync').resolves();
            sandbox.stub(RouteWaypoints,'create').resolves(newRelation);
        

            const result = await waypointService.createEntity(body);

            expect(result).to.deep.equal({
                waypoint_id:1,
                name:"Test waypoint",
                position:{x:10,y:10}, 
                route_id: 1
            });
            expect(Waypoint.create).to.have.been.calledOnceWith(body);
        });
    });

    describe('get Waypoint', ()=> { 
        it('should return a Waypoint by id when is found', async ()=>{
            const waypoint = {
                name: 'Test Waypoint',
                position:{x:10,y:10},
                route_id:1
            };            
            
            sandbox.stub(Waypoint,'findByPk').resolves(waypoint);

            const result = await waypointService.getEntity(1);

            expect(result).to.deep.equal(waypoint);
            expect(Waypoint.findByPk).to.have.been.calledOnceWith(1);
        });

    });

    describe('update Waypoint', ()=> { 
        it('should update an Waypoint', async ()=>{
            const waypoint = {
                waypoint_id:1,
                name: 'Test Waypoint',
                position:{x:120,y:110},
                route_id:1,
                save: Sinon.stub().resolves()
            };     
            const body = {position: {x:14,y:45}}       
            
            sandbox.stub(Waypoint,'findByPk').resolves(waypoint);

            const result = await waypointService.updateEntity(1,body);

            expect(result.position).to.deep.equal({x:14,y:45});
            expect(waypoint.save).to.have.been.calledOnce;
            expect(Waypoint.findByPk).to.have.been.calledOnceWith(1);
        });
        it('should return null if Waypoint to update is not found', async ()=>{
            sandbox.stub(Waypoint,'findByPk').resolves(null);
            const result = await waypointService.updateEntity(999,{x:44,y:54});
    
            expect(result).to.be.null;
            expect(Waypoint.findByPk).to.have.been.calledOnceWith(999);
        });

    });
    describe('delete Waypoint', ()=> { 
        it('should delete an Waypoint by id', async ()=>{
            
            sandbox.stub(Waypoint, 'destroy').resolves(1);
            const result = await waypointService.deleteEntity(1);
            
            expect(result).to.be.true;
            expect(Waypoint.destroy).to.have.been.calledOnceWith({where:{waypoint_id:1}});
        });
        it('should return false if no Waypoint is deleted', async ()=>{            
            sandbox.stub(Waypoint, 'destroy').resolves(0);
            const result = await waypointService.deleteEntity(999);
            
            expect(result).to.be.false;
            expect(Waypoint.destroy).to.have.been.calledOnceWith({where:{waypoint_id:999}});
        });

    });
});
