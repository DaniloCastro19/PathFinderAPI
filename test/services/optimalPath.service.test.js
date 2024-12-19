import { sequalize } from '../../src/data/database.js';
import * as chai from 'chai'
import { expect } from 'chai';
import { jest ,describe,beforeEach, afterEach,afterAll,it} from '@jest/globals';
import Sinon from "sinon";
import sinonChai from "sinon-chai";
import OptimalPathService from '../../src/core/services/optimalPath.service.js';
import OptimalPath from '../../src/core/models/optimalPath.model.js';
import Route from '../../src/core/models/route.model.js';
import { UserPreferencesService } from '../../src/core/services/userPreferences.service.js';
import Map from '../../src/core/models/map.model.js';
import PathFinder from '../../src/core/utils/pathFinder.js';
import MapGenerator from '../../src/core/utils/mapGenerator.js';

const mockOptimalPath ={
    routeId: 1,
    optimal_path: [],
    user_preferences: {}, 
    map_data: {},
    toJSON: function name(){
        return this
    }
}
const mockRouteInstace ={
    map_Id: 1
}
const mockUserPreferences ={
    startPoint: 1,
    endPoint: [],
    obstacles: [],
    waypoints: [], 
    route_data: 1 
}
const mockMapInstance ={
    dimensions: {width:10, height:10}
}

describe('Optimal Path Service', () => {
    let optimalPathService;
    let sandbox;
    chai.use(sinonChai);


    
    beforeEach(() => {
        sandbox = Sinon.createSandbox();
        optimalPathService = new OptimalPathService();
    }); 

    afterEach(() => {
        sandbox.restore();
        jest.restoreAllMocks();
    });

       
    afterAll(async () => {
        await sequalize.close();
    });



    describe('Create Optimal Route', () => {
        it('should create a new optimal path if does not  exist', async ()=> {
            sandbox.stub(OptimalPath, 'sync').resolves();
            sandbox.stub(Route, 'sync').resolves(mockRouteInstace);
            sandbox.stub(OptimalPath, 'findOne').resolves(null);
            sandbox.stub(UserPreferencesService.prototype, 'getUserPreferences').resolves(mockUserPreferences);
            sandbox.stub(Route, 'findByPk').resolves(mockRouteInstace);
            sandbox.stub(Map, 'findByPk').resolves(mockMapInstance);
            sandbox.stub(MapGenerator.prototype, 'generateMap').resolves([]);
            sandbox.stub(PathFinder.prototype, 'dijkstra').resolves([]);
            sandbox.stub(MapGenerator.prototype, 'addOptimalPath').resolves([]);
            sandbox.stub(OptimalPath, 'create').resolves(mockOptimalPath);
            
            const result = await optimalPathService.createRoute({route_id: 1});
            expect(result).to.deep.equal(mockOptimalPath);
            expect(OptimalPath.create).to.have.been.calledOnce;
        });
    });
    describe('get route', () => {
        it('should return the optimal path for the given id', async () =>{
            sandbox.stub(OptimalPath, 'findByPk').resolves(mockOptimalPath);
            const result = await optimalPathService.getRoute(1);
            expect(result).to.deep.equal(mockOptimalPath);
        });
        it('should return null if no optimal path is found', async () =>{
            sandbox.stub(OptimalPath, 'findByPk').resolves(null);
            const result = await optimalPathService.getRoute(1);
            expect(result).to.be.null;
        });

    describe('delete route', () => {
        it('should delete the optimal path and return true if successfull', async () =>{
            sandbox.stub(OptimalPath, 'destroy').resolves(1);
            const result = await optimalPathService.deleteRoute(1);
            expect(result).to.be.true;
        });
        it('should return null if no optimal path is found', async () =>{
            sandbox.stub(OptimalPath, 'destroy').resolves(0);
            const result = await optimalPathService.deleteRoute(1);
            expect(result).to.be.false;
        });
    });
});

});
