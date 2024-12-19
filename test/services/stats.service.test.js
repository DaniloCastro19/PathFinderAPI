import * as chai from 'chai'
import { expect } from 'chai';
import { jest ,describe,beforeEach, afterEach,it, afterAll} from '@jest/globals';
import Sinon from "sinon";
import sinonChai from "sinon-chai";
import { sequalize } from '../../src/data/database.js';
import ApiUsageService from '../../src/core/services/stats.service.js'
import ApiUsage from '../../src/core/models/apiUsage.model.js';
const apiUsageService = new ApiUsageService();
describe('Optimal Path Service', () => {
    let apiUsageService;
    let sandbox;
    chai.use(sinonChai);

    beforeEach(() => {
        sandbox = Sinon.createSandbox();
        apiUsageService = new ApiUsageService();
    });

    afterEach(() => {
        sandbox.restore();
    });

       
    afterAll(async () => {
        await sequalize.close();
    });


    describe('Get Request Stats', () => {
        it('Should return the correct request stats', async () => {
            const mockStats = [
                {requestCount:10,endpointAccess:'/api/testing',requestMethod: 'GET'},
                {requestCount:20,endpointAccess:'/api/testing',requestMethod: 'POST'}
            ]

            sandbox.stub(ApiUsage, 'findAll').resolves(mockStats);

            const result = await apiUsageService.getRequestStats();

            expect(result).to.deep.equal({
                total_requests:30,
                breakdown:{
                    '/api/testing':{
                        GET:10,
                        POST:20
                    }
                }
            });
        });
    
    });

    describe('Get status code Stats', () => {
        it('Should return the correct status code stats', async () =>{
            const mockStats = [
                {statusCode: 200,requestCount:10},
                {statusCode: 404,requestCount:5}
            ]

            sandbox.stub(ApiUsage, 'findAll').resolves(mockStats);

            const result = await apiUsageService.getStatusCodeStats();

            expect(result).to.deep.equal({
                200:10,
                404:5
            });
        });
    });

    describe('Get popular endpoints', () => {
        it('Should return the most popular endpoint', async () =>{
            const mockStats = [
                {endpointAccess:'/api/test',requestCount:10},
                {endpointAccess:'/api/test',requestCount:15}
            ]

            sandbox.stub(ApiUsage, 'findAll').resolves(mockStats);

            const result = await apiUsageService.getPopularEndpoints();

            expect(result).to.deep.equal({
                most_popular:'/api/test',
                request_count:15
            });
        });
    });
});