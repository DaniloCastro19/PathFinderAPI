export default class WaypointDTO{
    constructor(waypoint){
        this.id = waypoint.waypoint_id;
        this.name = waypoint.name;
        this.position = waypoint.position;
    }
}