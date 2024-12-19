import OptimalPath from "../models/optimalPath.model.js";
import Route from "../models/route.model.js";
import RouteService from "./route.service.js";
import PathFinder from "../utils/pathFinder.js";
import { UserPreferencesService } from "./userPreferences.service.js";
import RouteObstaclesDetector from "../utils/routeObstacleDetector.js";
import RouteWaypointsDetector from "../utils/routeWaypointsDetector.js";
import MapGenerator from "../utils/mapGenerator.js";
import Map from "../models/map.model.js";
const routeService = new RouteService();
const routeObstacleDetector = new RouteObstaclesDetector();
const routeWaypointsDetector = new RouteWaypointsDetector();
const userPreferencesService = new UserPreferencesService(routeService,routeObstacleDetector, routeWaypointsDetector);
const pathFinder = new PathFinder();
const mapGenerator = new MapGenerator();
import IRoute from "../models/routes.interface.js";
export default class OptimalPathService extends IRoute{
    constructor(){ 
        super();
        this.optimalPathModel = OptimalPath;
        this.route = Route;
    }


    createRoute = async (body) =>{
        await OptimalPath.sync();
        await this.route.sync();
        const {route_id} = body;
        const existingPath = await OptimalPath.findOne({
            where:{
                route_id:route_id
            }
        });
        if(existingPath){
            return null;
        }
        
        const userPreferences = await userPreferencesService.getUserPreferences(route_id);
        const routeInstance = await this.route.findByPk(route_id);
        const mapInstance = await Map.findByPk(routeInstance.map_id);
        
        const map = mapGenerator.generateMap(mapInstance.dimensions.width, mapInstance.dimensions.height, userPreferences.obstacles ,userPreferences.waypoints);
    
        console.log(map);
        
        const startNode = userPreferences.startPoint;
        const endNode = userPreferences.endPoint;

        const optimalPath = pathFinder.dijkstra(map,startNode,endNode);
        console.log(optimalPath);
        console.log(mapGenerator.addOptimalPath(map, optimalPath));

        const newOptimalPath = await OptimalPath.create({
            route_id: route_id,
            optimal_path: optimalPath,
            user_preferences: userPreferences,
            map_data: map
        });
        return newOptimalPath.toJSON();
    }

    getRoute= async (id) => {
        const optimalPath= await this.optimalPathModel.findByPk(id);
        if(!optimalPath) return null;
        return optimalPath; 
    };

    deleteRoute = async (id) => {
        const deletedRowsCount = await this.optimalPathModel.destroy({
            where:{path_id:id}
        });
        
        return deletedRowsCount>0;
    };
}