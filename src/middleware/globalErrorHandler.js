import  statusCode from "../utilis/statusCode.js";
 const globalErrorHandler=(err,req,res,next)=>{
    console.error(err.stack) //log full stack for dubbging

    //JOi validation error
    if(err.isJoi){
        return res.status(statusCode.BAD_REQUEST).json({
            success:false,
            message:err.details.map(detail=>detail.message).join(",") //show all joi messages in one response
        })
    }


    return res.status(statusCode.SERVER_ERROR).json({
        success:false,
        message:"Internal server error"
    })
}
export default globalErrorHandler