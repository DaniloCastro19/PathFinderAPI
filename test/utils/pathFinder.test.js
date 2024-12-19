import { expect } from 'chai';
import {describe,beforeEach,it, afterAll} from '@jest/globals';
import PathFinder from '../../src/core/utils/pathFinder.js'
import { sequalize } from '../../src/data/database.js';
describe('Path Finder', () =>  {
    let pathFinder;

    beforeEach(() => {
        pathFinder = new PathFinder();
    });

       
    afterAll(async () => {
        await sequalize.close();
    });


    describe('dijkstra', () => {
        it('should find the shortest path in a simple 3x3 map without obstacles', () => {
            const map = [
                [0, 0, 0],
                [0, 0, 0],
                [0, 0, 0]
            ];
            const start = {x:1, y:1};
            const end = {x:3, y:3};

            const path = pathFinder.dijkstra(map,start, end);

            const expectedPath = [{x:1, y:1}, {x:2, y:2}, {x:3, y:3}];
            expect(path).to.deep.equal(expectedPath);
        });
        it('Should avoid obstacles in the path', () => {
            const map = [
                [0, 0, 0],
                [0, -1, 0],
                [0, 0, 0]
            ];
            const start = {x:1, y:1};
            const end = {x:3, y:3};
            const path = pathFinder.dijkstra(map,start, end);
            const expectedPath = [{x:1, y:1}, {x:2, y:1}, {x:3, y:2}, {x:3, y:3}];
            expect(path).to.deep.equal(expectedPath);
        });

        it('Should return an empty array if no path is possible', () => {
            const map = [
                [0,-1, 0],
                [-1,-1, 0],
                [0, 0, 0]
            ];
            const start = {x:1, y:1};
            const end = {x:3, y:3};
            const path = pathFinder.dijkstra(map,start, end);
            expect(path).to.deep.equal([]);
        });

        it('Should work with a larger map', () => {
            const map = [
                [0, 0, 0, 0],
                [0, -1, -1, 0],
                [0, 0, 0, 0],
                [0, 0, -1, 0]
            ];
            const start = {x:1, y:1};
            const end = {x:4, y:4};
            const path = pathFinder.dijkstra(map,start, end);
            const expectedPath = [{x:1, y:1}, {x:1, y:2}, {x:2, y:3}, {x:3, y:3}, {x:4, y:4}];
            expect(path).to.deep.equal(expectedPath);
        });
    });
});