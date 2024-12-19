export default class IRoute {
    constructor(){
        if (this.constructor === IRoute){
            throw new Error('Cannot instantiate abstract class IRoute');
        }
    }

    async createRoute(body){
        throw new Error('Method create must be implemented');
    }
    async getRoute(id){
        throw new Error('Method read must be implemented');
    }
    async deleteRoute(id){
        throw new Error('Method delete must be implemented');
    }
}