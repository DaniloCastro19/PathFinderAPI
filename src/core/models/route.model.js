import { sequalize } from "../../data/database.js";

import {Model, DataTypes} from 'sequelize';
import OptimalPath from "./optimalPath.model.js";
class Route extends Model{};

Route.init({
    route_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    start:{
        type: DataTypes.JSON,
        allowNull: false,
        defaultValue:{
            x:0,
            y:0
        }
    },
    end: {
        type: DataTypes.JSON,
        allowNull: false,
        defaultValue:{
            x:0,
            y:0
        }
    },
    map_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
},
{
    timestamps:false,
    sequelize: sequalize,
    modelName: "route"
}
);

Route.hasOne(OptimalPath,{
    foreignKey: 'route_id',
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
});

OptimalPath.belongsTo(Route,{
    foreignKey: 'route_id'
});

export default Route;