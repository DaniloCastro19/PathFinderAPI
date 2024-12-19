import Waypoint from "../models/waypoint.model.js";
import RouteWaypointService from "./routeWaypoint.service.js";
const routeWaypointService = new RouteWaypointService();
import IService from "../models/service.interface.js";
export default class WaypointService extends IService { 
    constructor(){ 
        super();
        this.waypointModel = Waypoint;
    }
    
    createEntity = async (body) => {
        await this.waypointModel.sync();
        const {name, position, route_id} = body;
        const newWaypoint = await this.waypointModel.create(
            {
                name:name,
                position:position,
                route_id:route_id
            }
        );
        routeWaypointService.createRouteEntities(route_id, newWaypoint.waypoint_id)
        return newWaypoint.toJSON();
    }

    getEntity = async (id) => {
        const waypoint = await this.waypointModel.findByPk(id);
        if(!waypoint) return null;
        return waypoint; 
    };

    updateEntity = async (id, body) => {
        const waypoint = await this.waypointModel.findByPk(id);
        if(!waypoint){
            return null;
        }
        Object.assign(waypoint, body);
        await waypoint.save();

        return waypoint;
    };

    deleteEntity = async (id) => {
        const deletedRowsCount = await this.waypointModel.destroy({
            where:{waypoint_id:id}
        });
        return deletedRowsCount>0;
    };
}