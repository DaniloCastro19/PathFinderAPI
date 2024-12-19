import { sequalize } from '../../src/data/database.js';
import * as chai from 'chai'
import { expect } from 'chai';
import sinonChai from "sinon-chai";
import { jest ,describe,beforeEach, afterEach,it, afterAll} from '@jest/globals';
import Sinon from "sinon";

import RouteWaypointService from "../../src/core/services/routeWaypoint.service.js";
import Route from '../../src/core/models/route.model.js';
import Waypoint from '../../src/core/models/waypoint.model.js';
import RouteWaypoints from '../../src/core/models/routeWaypoints.model.js';

describe('Route Obstacle Service', ()=>{
    let routeWaypointService;
    chai.use(sinonChai);
    let sandbox;

    beforeEach(()=>{
        routeWaypointService = new RouteWaypointService();
        sandbox = Sinon.createSandbox();
        sandbox.stub(Route, 'sync').resolves();
        sandbox.stub(Waypoint, 'sync').resolves();
        sandbox.stub(RouteWaypoints, 'sync').resolves();
        sandbox.stub(RouteWaypoints, 'create').resolves({
            route_id:1,
            waypoint_id:1
        });

    });

    afterEach(()=>{
        sandbox.restore();
    });

       
    afterAll(async () => {
        await sequalize.close();
    });


    describe('create a waypoint for a route', () =>{
        it('should create a new route obstacle', async ()=>{
            
            const route_id = 1;
            const waypoint_id = 1; 
            
            await routeWaypointService.createRouteEntities(route_id,waypoint_id);
            
            expect(Route.sync).to.have.been.calledOnce;
            expect(Waypoint.sync).to.have.been.calledOnce;
            expect(RouteWaypoints.sync).to.have.been.calledOnce;
            expect(RouteWaypoints.create).to.have.been.calledOnceWithExactly({
                route_id:route_id,
                waypoint_id:waypoint_id
            });
        });
    });
});