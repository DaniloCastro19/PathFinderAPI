import LRUCache from "../../core/utils/LRUcache.js";
import {logger} from "../../core/utils/logger.js";
const cacheMiddleware = cacheConfig => {
    const {max, maxAge} = cacheConfig;
    const cache = new LRUCache(max, maxAge);
    return (req, res, next) => {
        const cacheKey = `${req.method}:${req.originalUrl}`;

        const cachedResponse = cache.get(cacheKey);
        if(cachedResponse) {
            logger.info("Response with cache");
            return res.status(200).json(cachedResponse);
        }
        res.sendResponse = res.json;
        res.json = (body) => {
            cache.set(cacheKey, body);
            logger.info("Response with API");
            res.sendResponse(body);
        };
        next();
    }
}

export default cacheMiddleware;