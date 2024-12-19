const httpErrorHandler = (error, req, res, next) =>{ 
    console.log(error)
    const errorStatusCode = error.statusCode || 500;
    const payload = {
        success: false,
        timestamp: new Date().toISOString(),
        statusCode: errorStatusCode,
        errorMessage: error.message || 'Internal server error.',
    }
    res.status(errorStatusCode).json(payload);
}

export default httpErrorHandler;