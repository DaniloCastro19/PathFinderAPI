export default class MapDTO{
    constructor(map){
        this.id = map.map_id;
        this.name = map.name;
        this.dimensions = map.dimensions;
    }
}