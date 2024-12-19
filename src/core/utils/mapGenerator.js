export default class MapGenerator{
    constructor() {
    }
     generateMap(width, height, obstacles =[], waypoints=[]) {
        let map = Array.from({length: height}, () => Array(width).fill(0));
        map = this.addObstacles(map, obstacles);
        map = this.addWaypoints(map, waypoints);
        return map
    }
    
    addObstacles(map, obstacles){
        obstacles.forEach( ({x,y}) => {
            const adjustedY= y-1;
            const adjustedX= x-1;
    
            if(map[adjustedY] && map[adjustedY][adjustedX] !== undefined){
                map[adjustedY][adjustedX] = -1;
            }
        });
        return map;
    }
    addWaypoints(map, waypoints){
        waypoints.forEach(({position})=>{
            const {x,y} = position;
            const adjustedY= y-1;
            const adjustedX= x-1;
            if(map[adjustedY] && map[adjustedY][adjustedX] !== undefined){
                map[adjustedY][adjustedX] = 1;
            }
        });
        return map;
    }
    
    addOptimalPath(map, optimalPath){
        optimalPath.forEach(({x, y}) => {
            const adjustedY= y-1;
            const adjustedX= x-1;
            if(map[adjustedY] && map[adjustedY][adjustedX]!== undefined){
                map[adjustedY][adjustedX] = "_";
            }
        });
        return map;
    }

}

