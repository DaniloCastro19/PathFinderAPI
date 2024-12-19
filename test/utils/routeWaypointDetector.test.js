import * as chai from 'chai'
import { expect } from "chai";
import { sequalize } from '../../src/data/database.js';
import { jest ,describe,beforeEach, afterEach,it, afterAll} from '@jest/globals';
import Waypoint from "../../src//core/models/waypoint.model.js"
import RouteWaypointsDetector from "../../src/core/utils/routeWaypointsDetector.js";
import Sinon from 'sinon';
import sinonChai from "sinon-chai";

describe('Route Waypoints Detector', () => {

    let routeWaypointsDetector;
    let findAllStub;
    chai.use(sinonChai);


    beforeEach(() => {
        routeWaypointsDetector = new RouteWaypointsDetector();
        findAllStub = Sinon.stub(Waypoint, 'findAll');
    });

    afterEach(() => {
        Sinon.restore();
    });

    afterAll(() => {
        sequalize.close();
    });

    describe('Get Route Waypoints', () => {
        it('should return an empty array if no waypoints are found', async () => {
            findAllStub.resolves([]);
            const routeWaypoints = await routeWaypointsDetector.getRouteWaypoints(1);
            expect(routeWaypoints).to.be.an('array').that.is.empty;
            expect(findAllStub).to.have.been.calledOnceWith({ where: { route_id: 1 } });
        });
        it('should return an array obstacle positions for a given route', async () => {
            const mockWaypoints = [
                { dataValues: { name: "Start", position: { x: 1, y: 2 } } },
                { dataValues: {name: "Middle",  position: { x: 3, y: 4 } } }
            ];
            findAllStub.resolves(mockWaypoints);

            const waypoints = await routeWaypointsDetector.getRouteWaypoints(2);

            expect(waypoints).to.deep.equal([
                {name: "Start", position:{x:1,y:2}},
                {name: "Middle", position:{x:3,y:4}},
            ]);
            expect(findAllStub).to.have.been.calledOnce;
            expect(findAllStub).calledWith({ where: { route_id: 2 } });
        });
    
    });


});