import { sequalize } from "../../data/database.js";
import {Model, DataTypes} from 'sequelize';

class ApiUsage extends Model {};

ApiUsage.init({
    endpointAccess: {
        type: DataTypes.STRING,
        allowNull: false
    },
    requestMethod:{
        type: DataTypes.STRING,
        allowNull: false
    },
    statusCode: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    responseTime:{
        type: DataTypes.JSON,
        defaultValue: {
            avg: 0,
            min: 0,
            max: 0,
        }
    },
    requestCount:{
        type: DataTypes.INTEGER,
        defaultValue:0
    },
    timestamp:{
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }
    
},
{
    timestamps: false,
    sequelize: sequalize,
    modelName: "api_usage"
}
);

export default ApiUsage;