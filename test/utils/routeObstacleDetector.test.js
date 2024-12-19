import * as chai from 'chai'
import { expect } from "chai";
import { sequalize } from '../../src/data/database.js';
import { jest ,describe,beforeEach, afterEach,it, afterAll} from '@jest/globals';
import Obstacle from "../../src//core/models/obstacle.model.js"
import RouteObstaclesDetector from "../../src/core/utils/routeObstacleDetector.js";
import Sinon from 'sinon';
import sinonChai from "sinon-chai";


describe('RouteObstaclesDetector', () => {
    let routeObstaclesDetector;
    let findAllStub;
    chai.use(sinonChai);


    beforeEach(() => {
        routeObstaclesDetector = new RouteObstaclesDetector();
        findAllStub = Sinon.stub(Obstacle, 'findAll');
    });

    afterEach(() => {
        Sinon.restore();
    });

    afterAll(() => {
        sequalize.close();
    });

    describe('Get Route Obstacles', () => {
        it('should return an empty array if no obstacles are found', async () => {
            findAllStub.resolves([]);
            const routeObstacles = await routeObstaclesDetector.getRouteObstacles(1);
            expect(routeObstacles).to.be.an('array').that.is.empty;
            expect(findAllStub).to.have.been.calledOnceWith({ where: { route_id: 1 } });
        });
        it('should return an array obstacle positions for a given route', async () => {
            const mockObstacles = [
                { dataValues: { position: { x: 1, y: 2 } } },
                { dataValues: { position: { x: 3, y: 4 } } }
            ];
            findAllStub.resolves(mockObstacles);

            const obstacles = await routeObstaclesDetector.getRouteObstacles(2);

            expect(obstacles).to.deep.equal([{ x: 1, y: 2 }, { x: 3, y: 4 }]);
            expect(findAllStub).to.have.been.calledOnce;
            expect(findAllStub).calledWith({ where: { route_id: 2 } });
        });
    
    });


});
