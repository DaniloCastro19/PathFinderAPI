export default class RouteEntities {
    constructor(){
        if (this.constructor === RouteEntities){
            throw new Error('Cannot instantiate abstract class RouteEntities');
        }
    }

    async createRouteEntities(route_id, entity_id){
        throw new Error('Method create must be implemented');
    }
}