import { expect } from "chai";
import {describe,beforeEach,it, jest, afterAll} from '@jest/globals';
import LRUCache from "../../src/core/utils/LRUcache.js";
import { sequalize } from '../../src/data/database.js';
describe('LRU cache', () => {
    let cache;
    const maxEntries = 2;
    const maxAge = 1000;

    beforeEach(() => {
        cache = new LRUCache(maxEntries,maxAge);
    });

       
    afterAll(async () => {
        await sequalize.close();
    });


    it('should add an entry to the cache', () => {
        cache.set('key1', "value1");
        expect(cache.get('key1')).to.equal("value1");
    });

    it('should update an existing entry', () => {
        cache.set('key1', "value1");
        cache.set('key1', "value1Updated");
        expect(cache.get('key1')).to.equal("value1Updated");
    });

    it('should return null for exipred entry', () => {
        expect(cache.get('non-existent')).to.be.null;
    });

    it('should return null for an exipred entry', () => {
        const clock = jest.useFakeTimers()
        cache.set('key1', "value1");
        clock.advanceTimersByTime(maxAge +1);
        expect(cache.get('key1')).to.be.null;
        clock.restoreAllMocks();
    });
});

