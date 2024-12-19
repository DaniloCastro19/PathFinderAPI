
import fetch from "node-fetch";
import { jest ,test,expect, beforeAll} from '@jest/globals';


describe('Create a route for a map', () => {


    beforeAll(async () => {
        const body = {
            name:"Map with route",
            dimensions: {
            width:5,
            height:5
        }
    }

    await fetch('http://localhost:5000/api/maps', {
        method: 'POST',
        headers: {'Content-type': 'application/json'},
        body: JSON.stringify(body)
        });

    });

    afterAll(async ()=> {
        await fetch('http://localhost:5000/api/maps/2', {
            method: 'DELETE',
            headers: {'Content-type': 'application/json'}
        });
    
    });

    test('should create a new route for a map', async () =>{


        const route = {
            start: {
                x: 1,
                y: 1
            },
            end:{
                x: 5,
                y: 5
            },
            map_id:1
        }
        
        const response = await fetch('http://localhost:5000/api/routes', {
            method: 'POST',
            headers: {'Content-type': 'application/json'},
            body:JSON.stringify(route)
        });
        console.log(response);
        
        expect(response.status).toBe(201);


        const data = await response.json();
        console.log(data);
        

        expect(data.data).toHaveProperty('start');
        expect(data.data.map_id).toBe(1);


    });

});
