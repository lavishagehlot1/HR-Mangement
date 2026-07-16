import jwt from 'jsonwebtoken';
import statusCode from '../utilis/statusCode.js';
import AppError from '../utilis/appError.js';
import { verifyToken } from '../services/generateToken.js';
export const authorization=async (req,res,next)=>{
    const authHeader=req.headers.authorization //auth.headers have all the details that user send from frontend
                                                //authorization-->suppliescredentials for accessing rescrited resources.
    console.log("Auth headers:",authHeader);

    //check header starts with bearer or not
    if(!authHeader||!authHeader.startsWith('Bearer')){
        return next(AppError("No Token provided",statusCode.UNAUTHORIZED))
    }

    const token=authHeader.split(" ")[1];
    console.log("Token",token);

    try{
         const decoded= verifyToken(token);
         console.log("decoded:" ,decoded)

         req.user=decoded.payload;
         next()
    }catch(err){
        console.log("error",err)
         return next(new AppError("Invalid or expired token", statusCode.UNAUTHORIZED));
    }
} 