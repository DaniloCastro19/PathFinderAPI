import Route from "../models/route.model.js";
import RouteObstaclesDetector from "./routeObstacleDetector.js";
import RouteWaypointsDetector from "./routeWaypointsDetector.js";
const routeWaypointsDetector = new RouteWaypointsDetector();
const routeObstacleDetector = new RouteObstaclesDetector(); 

export default class RouteMapValidator{
    constructor(){
    }

    async validateMapRoute(map){
        const existingRoute = await Route.findOne({
            where:{
                map_id:map.map_id
            }
        });
        if (!existingRoute) return false;
        const routeObstacles = await routeObstacleDetector.getRouteObstacles(existingRoute.route_id); 
        const routeWaypoints = await routeWaypointsDetector.getRouteWaypoints(existingRoute.route_id); 
        if(routeObstacles.length==0 || routeWaypoints.length==0 ) return false;
        return true; 
    }
}

