const customError = (statusCode, errorMesage) =>{
    const error = new Error();
    error.statusCode = statusCode || 500;
    error.message = errorMesage;
    return error;
}

//Bad Request
const BAD_REQUEST = (message) => {
    return customError(400 , message);
};

//Entity not found
const ENTITY_NOT_FOUND = (entity) => {
    return customError(404, `${entity} not found.`);
}

//Existing entity
const DUPLICATED_ENTITY = (entity) => {
    return customError(409, `This ${entity} has already been created.`);
}

export {ENTITY_NOT_FOUND, BAD_REQUEST, DUPLICATED_ENTITY};

