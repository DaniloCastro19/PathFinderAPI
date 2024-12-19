import { sequalize } from '../../src/data/database.js';
import * as chai from 'chai'
import { expect } from 'chai';
import { jest ,describe,beforeEach, afterAll,it} from '@jest/globals';
import PositionValidator from '../../src/core/utils/validators/positionValidator.js';
import Sinon from 'sinon';
import sinonChai from "sinon-chai";

describe('PositionValidator', ()=>{
    chai.use(sinonChai);
    let requestMock, valueMock, customValidationStub, checkStub;

    beforeEach(()=>{
        requestMock = {
            body: {route_id:1}
        };
        valueMock = {
            custom: Sinon.stub().returnsThis()
        };
        customValidationStub = Sinon.stub();

    });

    afterAll(async () => {
        await sequalize.close();
    });


    it('should pass validation when related entity is null', async() =>{
        customValidationStub.resolves(null);

        const validator = new PositionValidator(valueMock);
        await validator.validatePosition(customValidationStub, 'Waypoint', 'Obstacle');
        
        expect(valueMock.custom).to.have.been.calledOnce;
        
        const validationFunction = valueMock.custom.firstCall.args[0];

        await validationFunction({x:1,y:1}, {req:requestMock});
        expect(customValidationStub).calledWith(requestMock.body.route_id);
    });
    it('should throw an error if positions match', async() =>{
        customValidationStub.resolves({position:{x:1, y:1}});
        const validator = new PositionValidator(valueMock);
        await validator.validatePosition(customValidationStub, 'Waypoint', 'Obstacle');
       
        const validationFunction = valueMock.custom.firstCall.args[0];

        try{
            await validationFunction({x:1, y:1}, {req:requestMock});
        }catch(error){
            expect(error.message).to.equal('Waypoint Position must be different from Obstacle position.');
        }
    });

    it('should pass validation if position do not match', async () => {
        customValidationStub.resolves({position:{x:2, y:2}});
        const validator = new PositionValidator(valueMock);
        validator.validatePosition(customValidationStub, 'Waypoint', 'Obstacle');
        const validationFunction = valueMock.custom.firstCall.args[0];
        await validationFunction({x:1, y:1}, {req:requestMock});
        expect(customValidationStub).calledWith(requestMock.body.route_id);

    });

});