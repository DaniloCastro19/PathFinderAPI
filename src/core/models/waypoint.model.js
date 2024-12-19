import { sequalize } from "../../data/database.js";
import {Model, DataTypes} from 'sequelize';

class Waypoint extends Model {};

Waypoint.init({
    waypoint_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull:false
    },
    position: {
        type: DataTypes.JSON,
        allowNull: false,
        defaultValue:{
            x:0,
            y:0
        }
    },
    route_id: {
        type: DataTypes.INTEGER,
        allowNull:false
    }
},
{
    timestamps:false,
    sequelize: sequalize,
    modelName: "waypoints"
});

export default Waypoint;