import Obstacle from "../models/obstacle.model.js";

export default class RouteObstaclesDetector{
    constructor(){

    }

    getRouteObstacles = async (route_id)=>{
        const getObstacles = await Obstacle.findAll({
            where:{
                route_id:route_id
            }
        });
        const obstaclesPositions = []
        getObstacles.forEach(obstacle => obstaclesPositions.push(obstacle.dataValues.position));
        return obstaclesPositions;
    }
}