import Attendance from "../../../models/attendanceModule.js";
import Employee from "../../../models/employeeModel.js";
import LeaveBalance from "../../../models/leaveBalanceModel.js";
import Leave from "../../../models/leaveModel.js";
import { apiResponse } from "../../../utilis/apiResponse.js";
import AppError from "../../../utilis/appError.js";
import statusCode from "../../../utilis/statusCode.js";

export const employeeDashboard = async (req, res, next) => {
    try {
        //fechted logged-in user id
        const userId = req.user.id;
        console.log('user id', userId);

        //calculate today's date range
        const todayStart = new Date();
        todayStart.setHours(0, 0, 0, 0);

        const todayEnd = new Date();
        todayEnd.setHours(23, 59, 59, 999);

        //find employee using userId
        const _employee = await Employee.findOne({ userId });
        if (!_employee) {
            return AppError(
                res,
                statusCode.NOT_FOUND,
                'Employee Profile is not found'
            )
        }
        const [
            todayAttendance,
            pendingLeaveCount,
            leaveBalance
        ] = await Promise.all([
            Attendance.findOne({
                employeeId: _employee._id,
                date: {
                    $gte: todayStart,
                    $lte: todayEnd
                }
            }),
            Leave.countDocuments({
                employeeId: _employee._id,
                status: "pending"
            }),
            LeaveBalance.findOne({
                employeeId: _employee._id
            })
        ]);
        if (!leaveBalance) {
            return AppError(
                res,
                statusCode.NOT_FOUND,
                'Leeave balance not found'
            )
        }

        return res.status(statusCode.SUCCESS).json(
            apiResponse(
                statusCode.SUCCESS,
                'Employee dashboard fetched successfully',
                {
                    checkedIn: !!todayAttendance,
                    todayAttendance,
                    leaveBalance,
                    pendingLeaveCount
                }
            )
        )

    } catch (err) {
        console.log(err);
        next(err);
    }
}