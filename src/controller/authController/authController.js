import user from "../../models/authModels.js";
import statusCode  from "../../utilis/statusCode.js";
import AppError from '../../utilis/appError.js'
import { apiResponse } from "../../utilis/apiResponse.js";
import { generateToken } from "../../services/generateToken.js";
export const registerUser=async(req,res,next)=>{
    try{
        //data from postman
        const {userName,userEmail,password,role}=req.body;
        console.log("Data coming from postman:",req.body);
        if(!userName||!userEmail||!password||!role){
            return AppError(res,statusCode.BAD_REQUEST,"All fileds are required")
        };

        //find if email is already exist
        const userExist=await user.findOne({userEmail});
        if(userExist)
        return AppError(res,statusCode.CONFLICT,`User with ${userEmail} is already exist`);

        const users= await user.create({
            userName,
            userEmail,
            password,
            role
        });
        console.log("userId:",users._id)
        //api response
        // 

        return res.status(statusCode.SUCCESS).json(
  apiResponse(statusCode.SUCCESS, `User ${users.userName} registered  successfully`, { users })
);
         }catch(err){
        console.log("Server error:",err)
        return next(err); //went to global error handler.
    }
}

export const loginUser=async(req,res,next)=>{
    try{
        //data from postman
        const{userEmail,password}=req.body;
        console.log("Data from postman:",req.body);
        if(!userEmail||!password) return AppError(res,statusCode.BAD_REQUEST,"All filed are required")

        //find user email
        const users=await user.findOne({userEmail});
        if(!users)return AppError(res,statusCode.NOT_FOUND,`User with ${userEmail} not found`)

        const token=generateToken({
           payload:{ id:users._id,
            role:users.role},
        

        });
        //send response
        return res.status(statusCode.SUCCESS).json(
                        apiResponse(
                            statusCode.SUCCESS,
                            `User ${users.userName} is login sucessfully`,
                            {token}

            )
        )
        
    }catch(err){
        console.log("SERVER ERROR:",err);
        return next(err);
    }
}