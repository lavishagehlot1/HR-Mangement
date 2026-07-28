import AppError from "./appError";
import statusCode from "./statusCode";

export const abortTransaction=async(
    session,
    res,
    statusCode,
    message
)=>{
    await session.abortTransaction();
    session.endsession();
    return AppError(res,statusCode,message)
}