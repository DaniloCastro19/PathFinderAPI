import { ENTITY_NOT_FOUND } from "../utils/customError.js";
export class UserPreferencesService { 
    constructor(routeService, routeObstacleDetector, routeWaypointDetector) {
        this.routeService = routeService;
        this.routeObstacleDetector = routeObstacleDetector;
        this.routeWaypointDetector = routeWaypointDetector;
    }

    async getUserPreferences(route_id){ 
        const route = await this.routeService.getRoute(route_id);
        if(!route){
            throw ENTITY_NOT_FOUND('Route');
        }
        const routeObstacles = await this.routeObstacleDetector.getRouteObstacles(route_id);
        const routeWaypoints = await this.routeWaypointDetector.getRouteWaypoints(route_id);
        return {
            startPoint:route.dataValues.start,
            endPoint:route.dataValues.end,
            obstacles:routeObstacles,
            waypoints:routeWaypoints
        };
    }
}