import fetch from "node-fetch";
import { jest ,test,expect, beforeAll} from '@jest/globals';


describe('Create an Optimal Path for a map', () => {


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

    const obstacle = {
        position: {
            x: 3,
            y: 3
        },
        route_id:1
    }
    
    await fetch('http://localhost:5000/api/obstacles', {
        method: 'POST',
        headers: {'Content-type': 'application/json'},
        body:JSON.stringify(obstacle)
    });

    const waypoint = {
        position: {
            x: 1,
            y: 2
        },
        route_id:1
    }
    
    await fetch('http://localhost:5000/api/waypoints', {
        method: 'POST',
        headers: {'Content-type': 'application/json'},
        body:JSON.stringify(waypoint)
    });
    });

    afterAll(async ()=> {
        await fetch('http://localhost:5000/api/maps/1', {
            method: 'DELETE',
            headers: {'Content-type': 'application/json'}
        });
    
    });

    test('should create an Optimal Path for a Map', async () =>{
        const body = {
            route_id:1
        }

        const response = await fetch('http://localhost:5000/api/optimal_path', {
            method: 'POST',
            headers: {'Content-type': 'application/json'},
            body:JSON.stringify(body)
        });
        const data = await  response.json();
        
        expect(data).toHaveProperty('route_id');
        expect(data.route_id).toBe(1);

    }); 

});