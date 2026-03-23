import AppError from "../utilis/appError.js";
import  statusCode  from "../utilis/statusCode.js";

export const authorize=(...roles)=>{ //rest parameter so you can pass multiple roles
    return(req,res,next)=>{
        //user role extracted from token coming from authentication middleware.
        const role=req.user.role;
        if(!roles.includes(role)){ //user role is in the list of allowed roles
            return next(AppError("You dont have access",statusCode.FORBIDDEN))
        }
        next()
    }

}