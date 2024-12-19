export default class IService {
    constructor(){
        if (this.constructor === IService){
            throw new Error('Cannot instantiate abstract class IService');
        }
    }

    async createEntity(body){
        throw new Error('Method create must be implemented');
    }
    async getEntity(id){
        throw new Error('Method read must be implemented');
    }
    async updateEntity(id,body){
        throw new Error('Method update must be implemented');
    }
    async deleteEntity(id){
        throw new Error('Method delete must be implemented');
    }
}