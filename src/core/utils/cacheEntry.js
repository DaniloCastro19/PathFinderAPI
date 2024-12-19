export default class Cache {
    constructor(value, expiration){
        this.value = value;
        this.expiration = expiration;
        this.lastAccess = Date.now();
    }

    hasExpired () {
        return Date.now() > this.expiration;
    }

    updateAccessTime(){
        this.lastAccess = Date.now();
    }
}


