import  statusCode from "../utilis/statusCode.js";
 const globalErrorHandler=(err,req,res,next)=>{
    console.error(err.stack) //log full stack for dubbging

    res.status(err.status||statusCode.SERVER_ERROR).json({
        message:"Internal server error"
    })
}
export default globalErrorHandler