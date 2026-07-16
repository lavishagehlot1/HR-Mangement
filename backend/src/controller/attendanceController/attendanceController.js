import attendance from '../../models/attendanceModule.js';
import employee from '../../models/employeeModel.js';
import { apiResponse } from '../../utilis/apiResponse.js';
import AppError from '../../utilis/appError.js';
import statusCode from '../../utilis/statusCode.js';
import { processCheckout } from '../../services/attendanceService.js';
import { getPagination } from '../../utilis/pagination.js';
/*
POST REQUEST
EMPLOYEE check_in */
export const employee_check_in=async(req,res,next)=>{
    try{
    //fetched-logeed in user id     
    let userId=req.user.id;
    console.log("USERID:",userId);
    
    //find employee linked with that user
    let _employee=await employee.findOne({userId:userId});
    if(!_employee) return AppError(res,statusCode.NOT_FOUND,"Employee profile is not found")

    const todaysStart=new Date();
    todaysStart.setHours(0,0,0,0);

    const todaysEnd=new Date();
    todaysEnd.setHours(23,59,59,999);

    //check if  employee is already checks-in today.
    const existing=await attendance.findOne({
        employee_id:_employee._id,
        date:{$gt:todaysStart,$lte:todaysEnd}
    });
    if(existing) return AppError(res,statusCode.CONFLICT,"You already checked-in");

    //create attendance record.
    const record=await attendance.create({
        employee_id:_employee._id,
        check_in_time:new Date(),
       //record.check_in_time.toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
        date:new Date()
    })
    console.log("RECORD OF EMPLOYEE:",record);
    return res.status(statusCode.OK_COMPLETED).json(
        apiResponse(statusCode.OK_COMPLETED,
            "Employee did checked-in sucessfully ",
            {record}
        )
    )
 }catch(err){
        console.log("SERVER ERROR:",err.name);
        next(err);
    }
}

/**
 * POST REQUEST
 * EMPLOYEE CHEECK_OUT
 */

export const employee_check_out=async(req,res,next)=>{
    try{

    //fetched-logeed in user id     
    let userId=req.user.id;
    console.log("USERID:",userId);
    
    //find employee linked with that user
    let _employee=await employee.findOne({userId:userId});
    if(!_employee) return AppError(res,statusCode.NOT_FOUND,"Employee profile is not found")

    const todaysStart=new Date();
    todaysStart.setHours(0,0,0,0);

    const todaysEnd=new Date();
    todaysEnd.setHours(23,59,59,999);

    //find todays attendance record
    const record=await attendance.findOne({
        employee_id:_employee._id,
        date:{$gt:todaysStart,$lte:todaysEnd}
    });
    if(!record) return AppError(res,statusCode.NOT_FOUND,"NO check-in found today.");
    if(record.check_out_time) return AppError(res,statusCode.BAD_REQUEST,"Already checked-out")

        // //update chck-out time
        // record.check_out_time=new Date();

        // //calculate working hours
        // const diff_in_ms=record.check_out_time-record.check_in_time;
        // const hoursWorked=diff_in_ms/(1000*60*60);

        // //updateworking hours and staus of attendance
        // record.working_hours=Number(hoursWorked.toFixed(2));

        // if(hoursWorked>=8) record.status_of_attendance="Present";
        // else if(hoursWorked>=4) record.status_of_attendance="half day";
        // else record.status_of_attendance="absent";

        
         processCheckout(record);
          await record.save();

        return res.status(statusCode.OK_COMPLETED).json(
            apiResponse(statusCode.OK_COMPLETED,
                "Employee did checked-out sucessfully",
                {record}
            )
        )


    }catch(err){
        console.log("SERVER ERROR:",err.name);
        next(err);
    }
}

/**
 * GET REQUEST
 * VIEW_ALL_ATTENDANCE
 */

export const view_all_attendance=async(req,res,next)=>{
    try{
        const {page,limit,skip}=getPagination(req);

         const allAttendance=await attendance.find().sort({date:-1}).skip(skip).limit(limit);
         console.log("ALL ATTANDANCE LIST:",allAttendance);

            //total count of attendance record
            const totalAttendance=await attendance.countDocuments();

         if(!allAttendance||allAttendance.length===0) return AppError(res,statusCode.NOT_FOUND,"No attendance found");

         return res.status(statusCode.OK_COMPLETED).json(apiResponse(
            statusCode.OK_COMPLETED,
            "Employees attandance list is fetched sucessfully",
            {totalAttendance,
                attendance:allAttendance,
                page,
                limit,
                totalPage:Math.ceil(totalAttendance/limit)
            }
         ))


    }catch(err){
        console.log("SERVER ERROR:",err.name);
        next(err)
    }
}

/**
 * GET REQUEST
 * VIEW_OWN_ATTENDANCE
 */
export const view_own_attendance=async(req,res,next)=>{
    try{
         //fetched-logeed in user id     
    let userId=req.user.id;
    console.log("USERID:",userId);
    
    //find employee linked with that user
    let _employee=await employee.findOne({userId:userId});
    if(!_employee) return AppError(res,statusCode.NOT_FOUND,"Employee profile is not found")
        //find own attendance
        const records=await attendance.findOne({employee_id:_employee._id}).sort({date:-1}) //latesst first

        return res.status(statusCode.OK_COMPLETED).json(apiResponse(
            statusCode.OK_COMPLETED,
            "Your attendance is fetched sucessfully",
            {records}
        ))


    }catch(err){
        console.log("SERVER ERROR:",err.name);
        next(err);
    }
}