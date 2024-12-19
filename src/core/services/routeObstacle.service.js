import RouteObstacles from "../models/routeObstacles.model.js";
import Route from "../models/route.model.js";
import Obstacle from "../models/obstacle.model.js";
import RouteEntities from "../models/routeEntities.interface.js";
export default class RouteObstaclesService extends RouteEntities{
    constructor(){
        super();
        this.routeObstacles = RouteObstacles;
    }

    createRouteEntities = async (route_Id, obstacle_id) =>{
        await Route.sync();
        await Obstacle.sync();
        await RouteObstacles.sync();
        await this.routeObstacles.create(
            {
                route_id:route_Id, 
                obstacle_id: obstacle_id
            }
        )
    }

    
 
} 