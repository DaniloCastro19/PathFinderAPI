import Cache from "./cacheEntry.js";
export default class LRUCache {
    constructor(max, maxAge){
        this.max = max;
        this.maxAge = maxAge;
        this.cache = new Map();
    }

    evacuate(){
        let oldestKey = null;
        let oldestTime = Infinity;

        for(const [key, timestamp] of this.cache){
            if(timestamp.lastAccessed < oldestTime){
                oldestTime = timestamp.lastAccessed;
                oldestKey = key;
            }
        }
        if(oldestKey !== null){
            this.cache.delete(oldestKey);
        }
    }

    set(key, value){
        if(this.cache.has(key)){
            this.cache.delete(key);
        }else if(this.cache.size >= this.max){
            this.evacuate();
        }
        const timeExpires = Date.now() + this.maxAge;
        this.cache.set(key, new Cache(value, timeExpires));
    }

    get(key){
        const entry = this.cache.get(key);
        if(!entry){
            return null;
        }

        if(entry.hasExpired()){
            this.cache.delete(key);
            return null;
        }

        entry.updateAccessTime();
        return entry.value;
    }
}