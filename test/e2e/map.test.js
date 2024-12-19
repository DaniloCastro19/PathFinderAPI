import fetch from "node-fetch";
import { jest ,test, expect, afterAll} from '@jest/globals';


describe('Map API endpoints',() => {

    afterAll(async ()=> {
        await fetch('http://localhost:5000/api/maps/2', {   
            method: 'DELETE',
            headers: {'Content-type': 'application/json'}
        });
    
    });
    test('should create a new map', async () =>{
        const body = {
            name:"Map 1 Test",
            dimensions: {
            width:5,
            height:5
        }
    }

    const response = await fetch('http://localhost:5000/api/maps', {
        method: 'POST',
        headers: {'Content-type': 'application/json'},
        body: JSON.stringify(body)
    });

    expect(response.status).toBe(201);

    const data = await response.json();
    
    expect(data).toHaveProperty('id');
    expect(data.name).toBe('Map 1 Test');
    });


});
