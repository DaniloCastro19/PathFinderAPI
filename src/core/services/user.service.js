import User from '../models/user.model.js'
import IService from '../models/service.interface.js';
export default class UserService extends IService{
    constructor(){ 
        super();
        this.userModel = User;
    }

    createEntity = async (body) => {
        await this.userModel.sync();
        const {username, email} = body;
        const newUser = await this.userModel.create(
            {
                username: username, 
                email: email
            }
        );
        return newUser.toJSON();

    };
    getEntity = async (id) => {
        const user = await this.userModel.findByPk(id);
        if(!user) return null;
        return user;
    };
    updateEntity = async (id, body) => {
        const user = await this.userModel.findByPk(id);
        if(!user){
            return null;
        }
        Object.assign(user, body);
        await user.save();

        return user;
    };

    deleteEntity = async (id) => {
        const deletedRowsCount = await this.userModel.destroy({
            where:{user_id:id}
        });
        return deletedRowsCount>0;
    };
}
