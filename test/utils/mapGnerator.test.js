import { expect } from "chai";
import {describe,beforeEach,it, afterAll} from '@jest/globals';
import MapGenerator from '../../src/core/utils/mapGenerator.js';
import { sequalize } from '../../src/data/database.js';
describe('Map generator', () => {
    let mapGenerator;

    beforeEach(() => {
        mapGenerator = new MapGenerator();
    });

       
    afterAll(async () => {
        await sequalize.close();
    });


    describe('Generate Map', () => {
        it ('should generate a map with correct dimensions', () => {
            const width = 5;
            const height = 4;
            const map = mapGenerator.generateMap(width, height);

            expect(map).to.be.an('array').with.lengthOf(height);
            map.forEach(row => expect(row).to.be.an('array').with.lengthOf(width));
        });

        it ('should place obstacles on the map', () => {
            const width = 3;
            const height = 3;
            const obstacles = [{x: 1, y: 1}, {x: 3, y: 3}];
            const map = mapGenerator.generateMap(width, height, obstacles);
            expect(map[0][0]).to.equal(-1);
            expect(map[2][2]).to.equal(-1);
        });

        it('should place waypoints correctly on the map', () => {
            const width = 3;
            const height = 3;
            const waypoints = [{position: {x: 2, y: 2}}];
            const map = mapGenerator.generateMap(width, height, [],waypoints);
            expect(map[1][1]).to.equal(1);
        }); 

    }); 

    describe('add obstacles', () => {
        it('should add obstacles to the map', ()=> {
            let map = [
                [0, 0, 0],
                [0, 0, 0],
                [0, 0, 0]
            ]
            const obstacles = [{x:1, y:1}, {x:2,y:2}];
            map = mapGenerator.addObstacles(map, obstacles);
            expect(map[0][0]).to.equal(-1);
            expect(map[1][1]).to.equal(-1);
        });
        it('should NOT add obstacles outside of map boundaries', ()=> {
            let map = [
                [0, 0, 0],
                [0, 0, 0],
                [0, 0, 0]
            ];
            const obstacles = [{x:4, y:4}, {x:-1,y:-1}];
            map = mapGenerator.addObstacles(map, obstacles);
            expect(map[0][0]).to.equal(0);
            expect(map[2][2]).to.equal(0);
        });
    });

    describe('Add waypoints', () => {
        it('should add waypoints to the map', () => {
            let map = [
                [0,0,0],
                [0,0,0],
                [0,0,0]
            ]
            const waypoints = [{position: {x: 2, y: 2}}];
            map = mapGenerator.addWaypoints(map, waypoints);
            expect(map[1][1]).to.equal(1);
        });
        it('should not add waypoints outside of map boundaries', () => {
            let map = [
                [0,0,0],
                [0,0,0],
                [0,0,0]
            ]
            const waypoints = [{position: {x: 4, y: 4}}];
            map = mapGenerator.addWaypoints(map, waypoints);
            expect(map[0][0]).to.equal(0);
            expect(map[2][2]).to.equal(0);
        });
    });

    describe('Add Optimal Path', () => {
        it('should add optimal path to the map', () => {
            let map = [
                [0,0,0],
                [0,0,0],
                [0,0,0]
            ]
            const optimalPath= [{x: 2, y: 2}];
            map = mapGenerator.addOptimalPath(map, optimalPath);
            expect(map[1][1]).to.equal("_");
        });
        it('should not add optimal path outside of map boundaries', () => {
            let map = [
                [0,0,0],
                [0,0,0],
                [0,0,0]
            ]
            const optimalPath = [{x: 4, y: 4}];
            map = mapGenerator.addOptimalPath(map, optimalPath);
            expect(map[0][0]).to.equal(0);
            expect(map[2][2]).to.equal(0);
        });
    });

});