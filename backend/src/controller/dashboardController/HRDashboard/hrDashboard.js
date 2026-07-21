import Attendance from "../../../models/attendanceModule.js";
import Employee from "../../../models/employeeModel.js";
import Leave from "../../../models/leaveModel.js";
import { apiResponse } from "../../../utilis/apiResponse.js";
import statusCode from "../../../utilis/statusCode.js";

export const hrDashboard=async(req,res,next)=>{
    try{
        const todaysStart = new Date();
        todaysStart.setHours(0, 0, 0, 0);

        const todaysEnd = new Date();
        todaysEnd.setHours(23, 59, 59, 999);

        const[totalEmployee,
            presentToday,
            absentToday,
            halfDayToday,
            approvedLeaves,
            rejectedLeaves
        ]=await Promise.all([
            Employee.countDocuments(),
            Attendance.countDocuments({
                date:{
                    $gte:todaysStart,
                    $lte:todaysEnd
                },
                status:'present',
            }),
            Attendance.countDocuments({
                date:{
                    $gte:todaysStart,
                    $lte:todaysEnd
                },
                status:'absent',
            }),
            Attendance.countDocuments({
                date:{
                    $gte:todaysStart,
                    $lte:todaysEnd
                },
                status:'half day',
            }),
            Leave.countDocuments({
                status:'approved'
            }),
            Leave.countDocuments({
                status:'rejected'
            })

        ]);

        return res.status(statusCode.SUCCESS).json(
            apiResponse(
                statusCode.SUCCESS,
                'HR Dashboard fetched sucessfully',
                {
                   totalEmployee,
                   presentToday,
                   absentToday,
                   halfDayToday,
                   approvedLeaves,
                   rejectedLeaves 
                }
            )
        )
    }catch(err){
        console.log(err);
        next(err);
    }
}