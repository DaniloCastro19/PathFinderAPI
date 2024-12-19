import Route from "../models/route.model.js";
import RouteWaypoints from "../models/routeWaypoints.model.js";
import Waypoint from "../models/waypoint.model.js";
import RouteEntities from "../models/routeEntities.interface.js";
export default class RouteWaypointService extends RouteEntities{
    constructor(){ 
        super();
        this.routeWaypoints = RouteWaypoints;
    }

    createRouteEntities = async (route_Id, waypoint_id) => {
        await Route.sync();
        await Waypoint.sync();
        await RouteWaypoints.sync();
        await this.routeWaypoints.create(
            {
                route_id:route_Id, 
                waypoint_id:waypoint_id
            }
        );
    }
}