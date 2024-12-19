import fetch from "node-fetch";
import { jest ,test,expect, beforeAll} from '@jest/globals';


describe('Create an obstacle for a route', () => {


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
    
    await fetch('http://localhost:5000/api/routes', {
        method: 'POST',
        headers: {'Content-type': 'application/json'},
        body:JSON.stringify(route)
    });

    });

    afterAll(async ()=> {
        await fetch('http://localhost:5000/api/maps/1', {
            method: 'DELETE',
            headers: {'Content-type': 'application/json'}
        });
    
    });

    test('should create a new obstacle for a route', async () =>{
        const obstacle = {
            position: {
                x: 3,
                y: 3
            },
            route_id:1
        }
        
        const response = await fetch('http://localhost:5000/api/obstacles', {
            method: 'POST',
            headers: {'Content-type': 'application/json'},
            body:JSON.stringify(obstacle)
        });

        const data = await  response.json();
        
        expect(data).toHaveProperty('position');
        expect(data.route_id).toBe(1);

    }); 

});