import { constants } from "../utils/constants.js";

export const errorHandler = (err, req, res, next) => {
    const statusCode = res.statusCode ? res.statusCode : 500; 
    
    switch (statusCode) {
        case constants.VALIDATION_ERROR:
            return res.json({ title: 
            "Validation Failed!", 
            message: err.message,
            stackTrace: err.stack,}); 
    
    break; 
    case constants.NOT_FOUND: 
   return res.json({
        title: "Not Found!", 
        message: err.message,
        stackTrace: err.stack 
    }); 
    case constants.UNAUTHORIZED: 
    return res.json({
        title: "Unauthorized!",
        message: err.message, 
        stackTrace: err.stack
    }); 
    case constants.FORBIDDEN: 
    return res.json({
        title: "Forbidden!!!", 
        message: err.message, 
        stackTrace: err.stack 
    }); 
    case constants.SERVER_ERROR:
        return res.json({
            title:"Server Error!",
            message: err.message,
            stackTrace: err.stack 
        }); 

        default:
            console.log('NO ERROR  FOUND!!!')
            break; 
    }
}