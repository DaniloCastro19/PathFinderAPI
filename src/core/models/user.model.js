import { sequalize } from "../../data/database.js";
import {Model, DataTypes} from 'sequelize';

class User extends Model{};

User.init({
    user_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    username: {
        type: DataTypes.STRING, 
        allowNull: false, 
    },
    email: {
        type: DataTypes.STRING,
        allowNull:false, 
    },
}, 
{
    timestamps:false,
    sequelize: sequalize,
    modelName: "users"
}
);

export default User;