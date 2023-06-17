const  constats  = require('../constants')

const errorHandler = (err, req, res, next) => {
    
    // console.log(err)

    const statusCode = res.statusCode?res.statusCode:500

    switch (statusCode) {
        case constats.BAD_REQUEST:
            res.json({
                title: "Bad Request",
                message: err.message,
                stackTrace: err.stackTrace
            })
            break;   
        case constats.FORBIDDEN:
            res.json({
                title: "Forbidden",
                message: err.message,
                stackTrace: err.stackTrace
            })
            break; 
        case constats.UNAUTHORIZED:
            res.json({
                title: "Unauthorized",
                message: err.message,
                stackTrace: err.stackTrace
            })
            break;
        case constats.NOT_FOUND:
            res.json({
                title: "Not Found",
                message: err.message,
                stackTrace: err.stackTrace
            })
            break;
        case constats.SERVER_ERROR:
            res.json({
                title: "Internal Server Error",
                message: err.message,
                stackTrace: err.stackTrace
            })
            break;
        default:
            console.log(err)
            res.status(500).json({
                title: "Uncaught",
                message: err.message,
                stackTrace: err.stackTrace,
                status:res.statusCode
            })
            break;
    }
}

module.exports = errorHandler