import Employee from "../../models/employeeModel.js";
import AppError from "../../utilis/appError.js";
import  statusCode  from "../../utilis/statusCode.js";
import { apiResponse } from "../../utilis/apiResponse.js";
import { getPagination } from "../../utilis/pagination.js";
import LeaveBalance from "../../models/leaveBalanceModel.js";
import user from "../../models/authModels.js";
import mongoose from "mongoose";
import { DEPARTMENTS } from "../../constants/department.js";
import { DEPARTMENT_JOB_ROLES } from "../../constants/departmentJobRoles.js";
/**
 * POST request
 * createEmployee controller
 */
export const createEmployee=async(req,res,next)=>{
    let session;
    try{
        //data coming from potman
        const{userId,department,roleOfEmployee,joiningDate}=req.body;
        console.log("Data coming from postman",req.body);
        if(!userId||!department||!roleOfEmployee||!joiningDate){
            return AppError(res,statusCode.BAD_REQUEST,"All fields are required");
        }
                //find if user is already exist
        const existingEmployee=await Employee.findOne({userId});
        if(existingEmployee)return AppError(res,statusCode.CONFLICT,"Employee is already exist");

        //check if user is already exiting or not
        const existigUser=await user.findById(userId);
        if(!existigUser) return AppError(res,statusCode.NOT_FOUND,"User not found!")

        session=await mongoose.startSession();
        session.startTransaction();
        //create new employee
        const _employee=await Employee.create(
            [{
                userId,
            department,
            joiningDate,
            roleOfEmployee}],
        {session});
        console.log("Employee is created",_employee);
     
        console.log("_employee[0]:", _employee[0]);
        console.log("_employee id:", _employee[0]._id);
        //create leave balance
        const leaveBalance=await LeaveBalance.create([{
            employeeId:_employee[0]._id
        }],
    {
        session
    });
        await session.commitTransaction();
        await session.endSession();
        return res.status(statusCode.SUCCESS).json(
            apiResponse(statusCode.SUCCESS,
                `Employee  is created sucessfully`,
                {   _employee,
                    leaveBalance
                }
            )
        )

}catch(err){
    if(session){
        await session.abortTransaction();
        await session.endSession();
    }
        console.error("Server Error:",err)
        next(err);//end it to global err
            }
}



/**
 * GET REQUEST
 * getAllEmployee
 */
export const getAllEmployee=async(req,res,next)=>{
    try{
        const{page,limit,skip}=getPagination(req);

        const allEmployee=await Employee.find()
                                        .populate("userId","userFirstName userLastName userEmail")
                                        .skip(skip) //if skip =10 then it will skip first 10 records and show from the 11th record.
                                        .limit(limit);

        //total count of employee
        const totalEmployee=await Employee.countDocuments(); //countDocuments-->It is a MongoDB method that:
                                                            //Counts how many documents (records) exist in a collection
        console.log("Total employee:",totalEmployee);

        //check if no employee exist
        if(!allEmployee||allEmployee.length===0) return AppError(res,statusCode.NOT_FOUND,"No employee found");
        //return appError(res,stustcode,"msg")
         
        //send response
        return res.status(statusCode.SUCCESS).json(
            apiResponse(
                statusCode.SUCCESS,
                "All employees are fetched successfully",
                {
                    page,
                    limit,
                    totalEmployee,
                    totalPage:Math.ceil(totalEmployee/limit),
                    data:allEmployee
                }
            )
        )
    }catch(err){
        console.error("Server Error:",err)
        next(err);//end it to global err
            }
}

/**
 * GET REQUEST
 * getEmployeeById
 */
export const getEmployeeById=async(req,res,next)=>{
    try{
        const employeeId=req.params.id;
        console.log("employeeID:",employeeId);

        const _employee=await Employee.findById(employeeId).populate(
            "userId",
            "userFirstName userLastName userEmail -_id");
        if(!_employee) return AppError(res,statusCode.NOT_FOUND,"Employee not found!");

        return res.status(statusCode.SUCCESS).json(
            apiResponse(statusCode.SUCCESS,
                "Employee is fetched sucessfully",
                _employee
            )
        )

    }catch(err){
        console.error("Server Error:",err)
        next(err);//end it to global err
            }
}



/**
 * PUT REQUEST
 * updateEmployeeById
 */


export const updateEmployeeById=async(req,res,next)=>{
    try{
        const employeeId=req.params.id;
        console.log("EmployeeId",employeeId);

        const{department,roleOfEmployee,joiningDate}=req.body;
        console.log("data from postman",req.body)

        const _employee=await Employee.findByIdAndUpdate(
           employeeId,
        {department,
        roleOfEmployee,
        joiningDate},
        {    
            new:true,
            runValidators:true
        }
        );
        console.log("EMPLOYEE DETAILS:",_employee)
        if(!_employee) return AppError(res,statusCode.NOT_FOUND,"Employee not found!");



         return res.status(statusCode.SUCCESS).json(
            apiResponse(
                statusCode.SUCCESS,
                "Employee is updated sucessfully",
                _employee
            )
         )


    }catch(err){
        console.error("Server Error:",err)
        next(err);//end it to global err
            }
}

/**
 * GET REQUEST
 * getMyProfile controller
 */
export const getMyProfile=async(req,res,next)=>{
    try{
        //fetch id 
        const userID=req.user.id;
        console.log(userID)

        //find employee by id
        //const myProfile=await employee.findById(userID); //this will search for specific id and findById({userID:userID})
        const myProfile = await Employee.findOne({ userId: userID }); //findOne searches any field you specify
        //see if profile is not exist
        if(!myProfile) return AppError(res,statusCode.NOT_FOUND,"profile doesn't exist");

        //send success response
        return res.status(statusCode.SUCCESS).json(
    apiResponse(
        statusCode.SUCCESS,
        "Employee profile fetched successfully",
        myProfile
    )
);

    }catch(err){
        console.error("Server Error:",err)
        next(err);//end it to global err
    }
}

/**
 * DELETE REQUEST
 * delete_by_id
 */
export const deleteEmployeeById=async(req,res,next)=>{
       let session;
    try{
        session=await mongoose.startSession();
        session.startTransaction();
        const {id}=req.params;
        console.log("ID FROM PARAMS:",req.params);

        const deleteEmployee=await Employee.findById(id).session(session)
        if(!deleteEmployee) {
            await session.abortTransaction();
            session.endSession();
             return AppError(
                res,
                statusCode.NOT_FOUND,
                "employee is not found"
            );
        }
           
            //Delete leave balance
             await LeaveBalance.findOneAndDelete({
                employeeId:id
            },{session});

            //Delete user
            await user.findByIdAndDelete(
                deleteEmployee.userId,
                {session}
            )

            //Delete employee
            await Employee.findByIdAndDelete(
                deleteEmployee._id,
                {session}
            );

            await session.commitTransaction();
            session.endSession()
            return res.status(statusCode.SUCCESS).json(apiResponse(
                statusCode.SUCCESS,
                "Employee is deleted sucessfully",
                {deleteEmployee}
            ));
           
    }catch(err){
        if(session){
            await session.abortTransaction();
            session.endSession();
        }
        console.error("SERVER ERROR:",err);
        next(err);
    }
}

/**
 * GET REQUEST
 * getDepartmentsAndRoles 
 */

export const getDepartmentAndRoles=async(req,res,next)=>{
    try{
        return res.status(statusCode.SUCCESS).json(
            apiResponse(
                statusCode.SUCCESS,
                "Departments and roles fetched successfully",
                {
                    department:DEPARTMENTS,
                    roles:DEPARTMENT_JOB_ROLES
                }
            )
        )
    }catch(err){
        console.error("SERVER ERROR:",err);
        next(err);
    }
}