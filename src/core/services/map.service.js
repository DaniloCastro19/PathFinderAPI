import Map from '../models/map.model.js'
import IService from '../models/service.interface.js';
export default class MapService extends IService{
    constructor(){ 
        super();
        this.mapModel = Map;
    }


    createEntity = async (body) => {

        await this.mapModel.sync();
        const {name, dimensions} = body;
        const newMap = await this.mapModel.create(
            {
                name: name, 
                dimensions:dimensions
            }
        );
        return newMap.toJSON();

    }

    getEntity = async (id) => {

        const map = await this.mapModel.findByPk(id);

        return map; 
    };
    updateEntity = async (id, body) => {
        const map = await this.mapModel.findByPk(id);
        if(!map){
            return null;
        }
        Object.assign(map, body);
        await map.save();

        return map;
    };

    
    deleteEntity = async (id) => {
        const deletedRowsCount = await this.mapModel.destroy({
            where:{map_id:id}
        });
        return deletedRowsCount>0;
    };
}