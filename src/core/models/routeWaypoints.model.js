import { sequalize } from "../../data/database.js";
import {Model, DataTypes} from 'sequelize';
import Route from './route.model.js';
import Waypoint from "./waypoint.model.js";
class RouteWaypoints extends Model{};

RouteWaypoints.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
},
{
    timestamps:false,
    sequelize: sequalize,
    modelName: "route_waypoints",
});

Route.belongsToMany(Waypoint, {
    foreignKey: 'route_id',
    onDelete: 'CASCADE',
    through: RouteWaypoints
});

Waypoint.belongsToMany(Route, {
    foreignKey: 'waypoint_id',
    through: RouteWaypoints
});

export default RouteWaypoints;
