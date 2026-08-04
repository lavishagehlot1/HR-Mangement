import Employee from '../../models/employeeModel.js';
import Leave from '../../models/leaveModel.js';
import { apiResponse } from '../../utilis/apiResponse.js';
import AppError from '../../utilis/appError.js';
import { getPagination } from '../../utilis/pagination.js';
import statusCode from '../../utilis/statusCode.js';
import LeaveBalance from '../../models/leaveBalanceModel.js';
import mongoose from 'mongoose';
import { LEAVE_TYPE_MAP } from '../../constants/leaveTypeMap.js';
/**
 *POST REQUEST
 -for leave apply
   */
export const apply_for_leave = async (req, res, next) => {
    try {
        //Data coming from postman
        const { leaveType, startDate, endDate, reason } = req.body;
        console.log("Data coming from postman", req.body);
        if (!leaveType || !startDate || !endDate || !reason) return AppError(res, statusCode.BAD_REQUEST, "All fileds are required");

        //only logeed-in user can apply for leave
        const userId = req.user.id;
        console.log("USERID:", userId);

        //find employee record link to that user
        const _employee = await Employee.findOne({ userId: userId });
        console.log("Employee:", _employee);

        if (!_employee) return AppError(res, statusCode.NOT_FOUND, "Employee profile is not found");
        //if employee fill end date in start date and start date in end date
        if (new Date(endDate) < new Date(startDate)) {
            return AppError(res, statusCode.BAD_REQUEST, "End date must be after start date");
        }

        const today = new Date();
        today.setHours(0, 0, 0, 0);
        if (new Date(startDate) < today) {
            return AppError(res, statusCode.BAD_REQUEST, 'Leave cannot be apply for past dates');
        }

        //if leave is already exist for selected dates
        const existingLeaves = await Leave.findOne({
            employeeId: _employee._id,
            startDate: { $lte: endDate },
            endDate: { $gte: startDate }
        });

        if (existingLeaves) {
            return AppError(res, statusCode.BAD_REQUEST, 'Leaves are already exists for selected dates')
        }
        //check employee has enough leave balance or not
        //calculate the number of leave days
        const leaveDays = Math.ceil((new Date(endDate) - new Date(startDate)) / (1000 * 60 * 60 * 24)) + 1;
        console.log(leaveDays, 'leaveDays');

        //fetch employee leave balance
        const leaveBalance = await LeaveBalance.findOne({ employeeId: _employee._id });
        console.log(leaveBalance, 'leaveBalance');
        if (!leaveBalance) {
            return AppError(res,
                statusCode.BAD_REQUEST,
                'Leave Balance are not found'
            )
        }



        const balanceField = LEAVE_TYPE_MAP[leaveType]

        const remaining = leaveBalance[balanceField].remaining;
        // if(leaveDays>remaining){
        //     return AppError(res,
        //         statusCode.BAD_REQUEST,
        //         'Insufficient leave balance'
        //     )
        // }
        let paidDays = 0;
        let unPaidDays = 0;

        if (leaveDays <= remaining) {
            paidDays = leaveDays;
        } else {
            paidDays = remaining;
            unPaidDays = leaveDays - remaining;
        }

        //create leave
        const leaves = await Leave.create({
            employeeId: _employee._id,
            leaveType,
            startDate,
            endDate,
            reason,
            totalLeaveDays: leaveDays,
            paidLeaveDays: paidDays,
            unpaidLeaveDays: unPaidDays
        });

        console.log("leave details:", leaves);



        return res.status(statusCode.OK_COMPLETED).json(
            apiResponse(
                statusCode.OK_COMPLETED,
                `leave is applied sucessfully`,
                { leaves }
            )
        )

    } catch (err) {
        console.log("SERVER ERROR:", err.name);
        next(err); //error went to global
    }

}


/**
 * GET REQUEST 
 * VIEW LEAVE REQUEST
 */
export const viewLeaveRequest = async (req, res, next) => {
    try {
        const { page, limit, skip } = getPagination(req);

        //optional filter by satatus
        const status = req.query.status;//pending approved ,rejected
        let query = {};//You start with no filter (fetch everything).
        //Then, optionally, you add filters dynamically depending on request query parameters:
        if (status) query.status = status;//If the client sends ?status=pending, the query becomes { status_of_leave: "pending" }
        //If the client doesn’t send any status, the query stays {} → fetch all leaves

        // Count total leaves for pagination info
        const totalLeaves = await Leave.countDocuments(query)


        const allLeaves = await Leave.find(query)
            .populate({
                path: "employeeId",
                populate: {
                    path: "userId",
                    select: "userFirstName userLastName userEmail"
                }
            })
           .sort({ createdAt: -1 })//sort by createdAt in descending order
           .skip(skip)
           .limit(limit)

        console.log("ALL LEAVES:", allLeaves);

        //check if no leave is exist
        if (allLeaves.length === 0) {
            return res.status(statusCode.OK_COMPLETED).json(
                apiResponse(
                    statusCode.OK_COMPLETED,
                    "No leave requests found",
                    {
                        totalLeaves: 0,
                        page,
                        limit,
                        totalPage: 0,
                        leaves: []
                    }
                )
            );
        }

        //response
        return res.status(statusCode.OK_COMPLETED).json(
            apiResponse(statusCode.OK_COMPLETED,
                "All leaves are fetched sucessfully",
                {
                    totalLeaves,
                    page,
                    limit,
                    totalPage: Math.ceil(totalLeaves / limit),
                    leaves: allLeaves
                }
            )
        )


    } catch (err) {
        console.log('Server Error:', err.name);
        next(err);
    }
}

/**
 * GET REQUEST
 * View leave history
 */
export const viewLeaveHistory = async (req, res, next) => {
    try {
        //fetch loggd-in userId
        const userID = req.user.id;
        console.log("user idfrom jwt", userID);

        //find employee linked with this user
        const _employee = await Employee.findOne({ userId: userID });
        console.log("employee from db", _employee);
        if (!_employee) return AppError(res, statusCode.NOT_FOUND, "Employee profil not found");

        //get only this employee leave
        const leaveHistory = await Leave.find({ employeeId: _employee._id }).sort({createdAt:-1});
        console.log("My leaves hitory", leaveHistory);

        if (leaveHistory.length === 0) {
            return res.status(statusCode.OK_COMPLETED).json(
                apiResponse(
                    statusCode.OK_COMPLETED,
                    "No leave history found",
                    { leaveHistory: [] }
                )
            );
        }
        return res.status(statusCode.OK_COMPLETED).json(
            apiResponse(statusCode.OK_COMPLETED,
                "History of my leaves fetched successfully",
                { leaveHistory }
            )
        )

    } catch (err) {
        console.log("SERVER ERROR:", err.name);
        next(err);
    }
}

/**
 * PUT REQUEST
 * Approve leave request
 */
export const approveLeaveRequestById = async (req, res, next) => {
    const session = await mongoose.startSession();
    try {
        session.startTransaction();
        const leaveId = req.params.id;
        console.log("LEAVE ID:", leaveId);

        const approveLeaves = await Leave.findById(leaveId).session(session);
        console.log("leave:", approveLeaves);
        if (!approveLeaves) return abortTransaction(
            session,
            res,
            statusCode.NOT_FOUND,
            "Leave request not found"
        );
        if (approveLeaves.status !== "pending") {
            return abortTransaction(
                session,
                res,
                statusCode.BAD_REQUEST,
                `Leave is already ${approveLeaves.status}`
            );
        }

        //fetch employee leave balance
        const leaveBalance = await LeaveBalance.findOne({
            employeeId: approveLeaves.employeeId
        }).session(session);
        if (!leaveBalance)
            return abortTransaction(
                session,
                res,
                statusCode.NOT_FOUND,
                "Leave balance not found"
            );
        // Map leave type

        const balanceField = LEAVE_TYPE_MAP[approveLeaves.leaveType];

        if (!balanceField) {
            return abortTransaction(
                session,
                res,
                statusCode.BAD_REQUEST,
                "Invalid leave type"
            );
        }

        const remaining = leaveBalance[balanceField].remaining;

        if (remaining < approveLeaves.paidLeaveDays) {
            return abortTransaction(
                session,
                res,
                statusCode.BAD_REQUEST,
                "Insufficient leave balance"
            );
        }
        //deducte only paid leave days
        leaveBalance[balanceField].remaining -= approveLeaves.paidLeaveDays;
        approveLeaves.status = "approved";
        approveLeaves.approvedBy = req.user.id;
        // Save both
        await leaveBalance.save({ session });
        await approveLeaves.save({ session });
        await session.commitTransaction();
        session.endSession();
        return res.status(statusCode.OK_COMPLETED).json(
            apiResponse(
                statusCode.OK_COMPLETED,
                "Leave approved successfully",
                { approveLeaves }
            )
        );

    } catch (err) {
        if (session.inTransaction()) {
            await session.abortTransaction();
        }
        session.endSession();
        console.log("SERVER ERROR:", err);
        next(err);
    }

}

/**
 * PUT REQUEST
 * Reject leave
 */
export const rejectLeaveById = async (req, res, next) => {
    try {
        const { id } = req.params;

        const rejectLeave = await Leave.findById(id);
        if (!rejectLeave) return AppError(res, statusCode.NOT_FOUND, "Leave request not found");

        if(rejectLeave.status!=="pending"){
            return AppError(
                res,
                statusCode.BAD_REQUEST,
                `Leave is already ${rejectLeave.status}`
            )
        } 

        //update status
        rejectLeave.status = "rejected";
        await rejectLeave.save();

        return res.status(statusCode.OK_COMPLETED).json(
            apiResponse(statusCode.OK_COMPLETED,
                "leave request is rejected sucessfully",
                { rejectLeave }
            )
        )

    } catch (err) {
        console.log("SERVER ERROR:", err.name);
        next(err)
    }
}