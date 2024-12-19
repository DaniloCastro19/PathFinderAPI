import Route from "../models/route.model.js";
import Map from "../models/map.model.js";
import IRoute from "../models/routes.interface.js";
export default class RouteService extends IRoute{ 
    constructor(routeObstacles, routeWaypoints){ 
        super();
        this.routeModel = Route;
        this.mapModel = Map;
        this.routeObstacles = routeObstacles;
        this.routeWaypoints = routeWaypoints;
    }
    createRoute = async (body) => {

        await this.routeModel.sync();
        await this.mapModel.sync();
        const {start, end, map_id} = body;
        const existingRoute = await Route.findOne({
            where:{
                map_id:map_id
            }
        })
        if(existingRoute){
            return null;
        }
        const newRoute = await this.routeModel.create(
            {
                start:start,
                end:end,
                map_id:map_id
            }
        );
        return newRoute.toJSON();
    }

    getRoute= async (id) => {
        const route= await this.routeModel.findByPk(id);
        if(!route) return null;
        return route; 
    };

    deleteRoute = async (id) => {
        const deletedRowsCount = await this.routeModel.destroy({
            where:{route_id:id}
        });
        return deletedRowsCount>0;
    };


}