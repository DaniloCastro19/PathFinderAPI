import * as chai from 'chai'
import { expect } from 'chai';
import { sequalize } from '../../src/data/database.js';
import { jest ,describe,beforeEach, afterEach,it, afterAll} from '@jest/globals';
import Sinon from "sinon";
import MapService from "../../src/core/services/map.service.js";
import Map from "../../src/core/models/map.model.js";
import sinonChai from "sinon-chai";

describe('MapService', ()=>{
    let mapService;
    let sandbox;
    chai.use(sinonChai);

    beforeEach(()=>{
        jest.useFakeTimers();
        mapService = new MapService();
        sandbox = Sinon.createSandbox();
    });

    afterEach(()=>{
        sandbox.restore();
    });

    afterAll(async () => {
        await sequalize.close();
        jest.useRealTimers();
    });

    describe('create map', ()=> { 
        it('should create a new map', async ()=>{
            const body = {
                name: 'Test Map',
                dimensions:{width:100,height:100}};
            const newMap = {
                toJSON: Sinon.stub().returns({
                    id:1,
                    name: 'Test Map', 
                    dimensions: {width:100,height:100}})
                }
            
            sandbox.stub(Map,'sync').resolves();
            sandbox.stub(Map,'create').resolves(newMap);

            const result = await mapService.createEntity(body);

            expect(result).to.deep.equal({
                id:1,
                name:'Test Map',
                dimensions: {width:100,height:100}
            });
            Sinon.assert.calledOnce(Map.sync);
            Sinon.assert.calledOnce(Map.create);
        });
    });

    describe('get map', ()=> { 
        it('should return a map by id', async ()=>{
            const map = {
                name: 'Test Map',
                dimensions:{width:100,height:100}};            
            
            sandbox.stub(Map,'findByPk').resolves(map);

            const result = await mapService.getEntity(1);

            expect(result).to.deep.equal(map);
            expect(Map.findByPk).to.have.been.calledOnceWith(1);
        });

        it('should return null if map is not found', async () =>{
            sandbox.stub(Map, 'findByPk').resolves(null);
            const result = await mapService.getEntity(999);

            expect(result).to.be.null;
            expect(Map.findByPk).to.have.been.calledOnceWith(999);
        })
    });
    
    describe('update map', ()=> { 
        it('should update a map', async ()=>{
            const map = {
                name: 'Map before update',
                dimensions:{width:100,height:100}, save:Sinon.stub().resolves()};                        
            const body = {
                name: 'Map after update',
                dimensions:{width:50,height:50}};            
            
            sandbox.stub(Map,'findByPk').resolves(map);


            const result = await mapService.updateEntity(1, body);

            expect(result.name).to.equal('Map after update');
            expect(result.dimensions).to.deep.equal({width:50,height:50});
            expect(Map.findByPk).to.have.been.calledOnceWith(1);
            Sinon.assert.calledOnce(map.save);
        });

        it('should return null if map to update is not found', async () =>{
            sandbox.stub(Map, 'findByPk').resolves(null);
            const result = await mapService.updateEntity(999,{name: 'Update Map'});

            expect(result).to.be.null;
            expect(Map.findByPk).to.have.been.calledOnceWith(999);
        });
    });
    describe('delete map', ()=> { 
        it('should delete a map by id', async ()=>{

            sandbox.stub(Map,'destroy').resolves(1);

            const result = await mapService.deleteEntity(1);

            expect(result).to.be.true;
            expect(Map.destroy).to.have.been.calledOnceWith({where:{map_id:1}});
        });

        it('should return false if map is not deleted', async () =>{
            sandbox.stub(Map, 'destroy').resolves(0);
            const result = await mapService.deleteEntity(999);

            expect(result).to.be.false;
            expect(Map.destroy).to.have.been.calledOnceWith({where:{map_id:999}});
        });
    });
});