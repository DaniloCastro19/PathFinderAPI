export default class PathFinder{
    constructor() {
    }
    /**
     * Finds the shortest path from a start point to an end point in a 2D grid using Dijkstra's algorithm.
     *
     * @param {number[][]} map - 2D array representing the grid. -1 represents an obstacle, 1 represents a waypoint, and 0 represents a normal cell.
     * @param {{x: number, y: number}} start - The start point coordinates in the grid.
     * @param {{x: number, y: number}} end - The end point coordinates in the grid.
     * @returns {Array<{x: number, y: number}>} - The shortest path from start to end. Empty array if no path found.
    */
    dijkstra(map, start, end){
        const height = map.length;
        const width = map[0].length;
        
        //Initializing distances with Infitiy value
        const distances = Array.from({length: height}, ()=> Array(width).fill(Infinity))
        distances[start.y-1][start.x-1] = 0;
        
        const previous = Array.from({length: height}, () => Array(width).fill(null));
    
    
        //Priority Queue simulated with an Array
        const priorityQueue = [{x:start.x-1, y:start.y-1, distance:0}];
        
        //Obtain neighbours of a cell
        const getNeighbors = (x,y)=>{
            
            const neighbors= [];
            if(x>0) neighbors.push({x:x-1, y:y}); //left neighbor
            if(x < width-1) neighbors.push({x:x+1, y:y});//Right neighbor
            if(y >0) neighbors.push({x, y:y-1});//Top neighbor
            if(y < height-1) neighbors.push({x, y:y+1}); //Bottom neighbor
            
            if(x > 0 && y > 0) neighbors.push({x:x-1, y:y-1}); //Left top neighbor-
            if(x < width && y > 0) neighbors.push({x:x+1, y:y-1}); //Right top neighbor
            if(x > 0 && y < height-1) neighbors.push({x:x-1, y:y+1}); //Left bottom neighbor
            if(x < width -1  && y < height-1) neighbors.push({x:x+1, y:y+1}); //Left bottom neighbor
            
            return neighbors;
        }
    
    
        //Process the priority Queue
        while(priorityQueue.length>0){
            //Extract the node with de lowest distance
            priorityQueue.sort((a,b)=> a.distance - b.distance);
    
    
            const currentValue = priorityQueue.shift();
            const {x,y, distance} = currentValue;
                        
            //If we have arrive, finish
            if (x===end.x -1 && y===end.y -1){
                const path = []
                let step = {x,y};
                while (step){
                    path.push({x:step.x+1, y:step.y+1});
                    step = previous[step.y][step.x];
                }
                return path.reverse();
            }
    
            //Obtain neighbours and update distances
            const neighbors = getNeighbors(x,y);
            
            neighbors.forEach(({x:nx, y:ny})=>{
                //if is an obstacle, skip
                if (map[ny][nx]===-1){return};
    
                //Taking in count the cost to move to a neighbour cell
                const cost = map[ny][nx] ===1? 0:1; //0 cost for waypoints, 1 for normal cells (Dijkstra always look for the lowest accumulative distance)
                const newDistance = distance + cost;
                //if the new distance is minor, update it.
                if(newDistance < distances[ny][nx] && map[ny][nx] !== -1){
                    distances[ny][nx] = newDistance;
                    previous[ny][nx]= {x,y}
                    priorityQueue.push({x:nx, y:ny, distance:newDistance});   
                }
            });
    
        }
        return [];
    }

}

