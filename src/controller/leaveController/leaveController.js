import employee from '../../models/employeeModel.js';
import leave from '../../models/leaveModel.js';
import { apiResponse } from '../../utilis/apiResponse.js';
import AppError from '../../utilis/appError.js';
import statusCode from '../../utilis/statusCode.js';
/**
 *POST REQUEST
 -for leave apply
   */ 
export const apply_for_leave=async(req,res,next)=>{
    try{
        //Data coming from postman
        const{leaveType,start_Date,end_Date,reason}=req.body;
        console.log("Data coming from postman",req.body);
        if(!leaveType||!start_Date||!end_Date||!reason) return AppError(res,statusCode.BAD_REQUEST,"All fileds are required");

        //only logeed-in user can apply for leave
        const userId=req.user.id;
        console.log("USERID:",userId);

        //find employee record link to that user
        const _employee=await employee.findOne({userId:userId});
        console.log("Employee:",_employee);

        if(!_employee) return AppError(res,statusCode.NOT_FOUND,"Employee profile is not found");

        

        //create leave
        const leaves=await leave.create({
            employee_id:_employee._id,
            leaveType,
            start_Date,
            end_Date,
            reason
        });

        console.log("leave details:",leaves);

        //if employee fill end date in start date and start date in end date
          if (new Date(end_Date) < new Date(start_Date)) {
            return AppError(res, statusCode.BAD_REQUEST, "End date must be after start date");
        }

        return res.status(statusCode.OK_COMPLETED).json(
            apiResponse(
                statusCode.OK_COMPLETED,
                `leave is applied sucessfully`,
                {leaves}
            )
        )

    }catch(err){
        console.log("SERVER ERROR:",err.name);
        next(err); //error went to global
    }

}


/**
 * GET REQUEST 
 * VIEW LEAVE REQUEST
 */
export const viewLeaveRequest=async(req,res,next)=>{
    try{
        const allLeaves=await leave.find();
        console.log("ALL LEAVES:",allLeaves);

        //check if no leave is exist
        if(!allLeaves||allLeaves.length===0) return AppError(res,statusCode.NOT_FOUND,"Currently no leaves is exist");

        //response
        return res.status(statusCode.OK_COMPLETED).json(
            apiResponse(statusCode.OK_COMPLETED,
                "All leaves are fetched sucessfully",
                {allLeaves}
            )
        )


    }catch(err){
        console.log('Server Error:',err.name);
        next(err);
    }
}

/**
 * GET REQUEST
 * View leave history
 */
export const viewLeaveHistory=async(req,res,next)=>{
    try{
        //fetch loggd-in userId
        let userID=req.user.id;
        console.log("user idfrom jwt",userID);

        //find employee linked with this user
        let _employee=await employee.findOne({userId:userID});
        console.log("employee from db",_employee);
        if(!_employee) return AppError(res,statusCode.NOT_FOUND,"Employee profil not found");

        //get only this employee leave
        const leaveHistory=await leave.find({employee_id:_employee._id});
        console.log("My leaves hitory",leaveHistory);

        return res.status(statusCode.OK_COMPLETED).json(
            apiResponse(statusCode.OK_COMPLETED,
                "History of my leaves fetched successfully",
                {leaveHistory}
            )
        )

    }catch(err){
        console.log("SERVER ERROR:",err.name);
        next(err);
    }
}

/**
 * PUT REQUEST
 * Approve leave request
 */
export const approveLeaveRequestById=async(req,res,next)=>{
    try{
        const leaveId=req.params.id;
        console.log("LEAVE ID:",leaveId);

        const approveLeaves=await leave.findById({_id:leaveId});
        console.log("leave:",approveLeaves);
        if(!approveLeaves) return AppError(res.statusCode.NOT_FOUND,"Leave request not found");

        //update  status
        approveLeaves.status_of_leave="approved";
        await approveLeaves.save();

        return res.status(statusCode.OK_COMPLETED).json(apiResponse(
            statusCode.OK_COMPLETED,
            'Leave is approved sucessfully',
            {approveLeaves}
        ))
    }catch(err){
        console.log("SERVER ERROR:",err.name);
        next(err)
    }
}

/**
 * PUT REQUEST
 * Reject leave
 */
export const rejectLeaveById=async(req,res,next)=>{
    try{
        const{id}=req.params;

        const rejectLeave=await leave.findById(id);
        if(!rejectLeave) return AppError(res,statusCode.NOT_FOUND,"Leave request not found");

        //update status
        rejectLeave.status_of_leave="rejected";
        await rejectLeave.save();

        return res.status(statusCode.OK_COMPLETED).json(
            apiResponse(statusCode.OK_COMPLETED,
                "leave request is rejected sucessfully",
                {rejectLeave}
            )
        )

    }catch(err){
        console.log("SERVER ERROR:",err.name);
        next(err)
    }
}