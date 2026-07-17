import Attendance from "../../../models/attendanceModule.js";
import user from "../../../models/authModels.js";
import Employee from "../../../models/employeeModel.js";
import Leave from "../../../models/leaveModel.js";
import { apiResponse } from "../../../utilis/apiResponse.js";
import statusCode from "../../../utilis/statusCode.js";

export const getAdminDashboard = async (req, res, next) => {
    try {
        const todaysStart = new Date();
        todaysStart.setHours(0, 0, 0, 0);

        const todaysEnd = new Date();
        todaysEnd.setHours(23, 59, 59, 999);
        const [totalCountOfEmployee,
            totalHr,
            totalAdmin,
            presentToday,
            halfDayToday,
            absentToday,
            pendingLeaves] = await Promise.all([
                Employee.countDocuments(),
                user.countDocuments({
                    role: 'HR'
                }),
                user.countDocuments({
                    role: 'admin'
                }), Attendance.countDocuments({
                    date: {
                        $gte: todaysStart,
                        $lte: todaysEnd
                    },
                    status: "present"
                }),

                Attendance.countDocuments({
                    date: {
                        $gte: todaysStart,
                        $lte: todaysEnd
                    },
                    status: "absent"
                }),
                Attendance.countDocuments({
                    date: {
                        $gte: todaysStart,
                        $lte: todaysEnd
                    },
                    status: "half day"
                }),

                Leave.countDocuments({
                    status: "pending"
                })
            ]);
        return res.status(statusCode.SUCCESS).json(
            apiResponse(
                statusCode.SUCCESS,
                "Dashboard fetched successfully",
                {
                    totalCountOfEmployee,
                    totalHr,
                    totalAdmin,
                    presentToday,
                    halfDayToday,
                    absentToday,
                    pendingLeaves
                }
            )
        )

    } catch (err) {
        console.log('Error', err);
        next(err);
    }
}