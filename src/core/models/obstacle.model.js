import { sequalize } from "../../data/database.js";


import {Model, DataTypes} from 'sequelize';

class Obstacle extends Model{};

Obstacle.init({
    obstacle_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    position: {
        type: DataTypes.JSON,
        allowNull: false,
        defaultValue:{
            x:0,
            y:0
        }
    },
    route_id:{
        type: DataTypes.INTEGER, 
        allowNull:false
    }
},
{
    timestamps:false,
    sequelize: sequalize,
    modelName: "obstacles"
});

export default Obstacle;