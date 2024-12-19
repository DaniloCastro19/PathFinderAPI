import Obstacle from "../models/obstacle.model.js";
import RouteObstaclesService from "./routeObstacle.service.js";
const routeObstaclesService = new RouteObstaclesService();
import IService from "../models/service.interface.js";
export default class ObstacleService extends IService{
    constructor(){ 
        super();
        this.obstacleModel = Obstacle;
    }

    createEntity = async (body) => {
        await this.obstacleModel.sync();
        const {position, route_id} = body;
        const newObstacle = await this.obstacleModel.create(
            {
                position:position,
                route_id:route_id
            }
        );
        routeObstaclesService.createRouteEntities(route_id, newObstacle.obstacle_id)
        return newObstacle.toJSON();
    }

    getEntity = async (id) => {
        const obstacle = await this.obstacleModel.findByPk(id);
        if(!obstacle) return null;
        return obstacle; 
    };

    updateEntity = async (id, body) => {
        const obstacle = await this.obstacleModel.findByPk(id);
        if(!obstacle){
            return null;
        }
        Object.assign(obstacle, body);
        await obstacle.save();

        return obstacle;
    };

    deleteEntity = async (id) => {
        const deletedRowsCount = await this.obstacleModel.destroy({
            where:{obstacle_id:id}
        });
        return deletedRowsCount>0;
    };
}