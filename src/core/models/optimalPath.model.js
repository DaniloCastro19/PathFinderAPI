import { sequalize } from "../../data/database.js";

import {Model, DataTypes} from 'sequelize';

class OptimalPath extends Model{};

OptimalPath.init({
    path_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    route_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    user_preferences:{
        type: DataTypes.JSON
    },
    map_data:{
        type: DataTypes.JSON
    },
    optimal_path:{
        type:DataTypes.JSON
    }
},
{
    timestamps:false,
    sequelize: sequalize,
    modelName: "optimal_paths"
}
);
export default OptimalPath;