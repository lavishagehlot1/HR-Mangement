
// // Function-based AppError
// function AppError(message, statusCode) { 
//     //custom function that will accept 2 parameters message and statusCode
//   const error = new Error(message); // maintain stack trace ,itis js error object y it used because it will automatically throw error and stack trace where error occured.
//   error.statusCode = statusCode;
//   error.success = false;
//   return error;
// }
// export default AppError


   const AppError=(res,statusCode,message)=>{
  return res.status(statusCode).json({
  success:false,message})}
 export default AppError;