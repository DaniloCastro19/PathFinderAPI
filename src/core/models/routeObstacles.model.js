import Route from './route.model.js';
import Obstacle from './obstacle.model.js';
import { sequalize } from "../../data/database.js";
import { DataTypes, Model } from 'sequelize';
class RouteObstacles extends Model{};

RouteObstacles.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
},
{
    timestamps:false,
    sequelize: sequalize,
    modelName: "route_obstacles",
});

Route.belongsToMany(Obstacle, {
    foreignKey: 'route_id',
    onDelete: 'CASCADE',
    through: RouteObstacles
});

Obstacle.belongsToMany(Route, {
    foreignKey: 'obstacle_id',
    through: RouteObstacles
});

export default RouteObstacles;

