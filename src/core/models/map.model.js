import { sequalize } from "../../data/database.js";
import {Model, DataTypes} from 'sequelize';
import Route from "./route.model.js";
class Map extends Model{};

Map.init({
    map_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name:{
        type: DataTypes.STRING, 
        allowNull: false
    },
    dimensions: {
        type: DataTypes.JSON,
        allowNull: false,
        defaultValue:{
            width:0,
            height:0
        }
    }
}, {
    timestamps:false,
    sequelize: sequalize,
    modelName: "maps"
});


Map.hasOne(Route,{
    foreignKey: 'map_id',
    onDelete: 'CASCADE',
});

Route.belongsTo(Map,{
    foreignKey: 'map_id'
});

export default Map;