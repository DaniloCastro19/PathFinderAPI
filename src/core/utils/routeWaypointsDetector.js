import Waypoint from "../models/waypoint.model.js";
export default class RouteWaypointsDetector{
    constructor(){}

    getRouteWaypoints = async (route_id)=>{
        const getWaypoints = await Waypoint.findAll({
            where:{
                route_id:route_id
            }
        });
        const waypoints = []
        
        getWaypoints.forEach(waypoint => waypoints.push({
            name:waypoint.dataValues.name,
            position:waypoint.dataValues.position
        }
        ));
        return waypoints;
    }
}