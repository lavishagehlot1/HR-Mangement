import employee from "../../models/employeeModel.js";
import AppError from "../../utilis/appError.js";
import  statusCode  from "../../utilis/statusCode.js";
import { apiResponse } from "../../utilis/apiResponse.js";
import { getPagination } from "../../utilis/pagination.js";
/**
 * POST request
 * createEmployee controller
 */
export const createEmployee=async(req,res,next)=>{
    try{
        //data coming from potman
        const{userId,department,role_of_employee,joining_Date}=req.body;
        console.log("Data coming from postman",req.body);
        if(!userId||!department||!role_of_employee||!joining_Date){
            return AppError(res,statusCode.BAD_REQUEST,"All fields are required");
        }

        //find if user is already exist
        const existingEmployee=await employee.findOne({userId});
        if(existingEmployee)return AppError(res,statusCode.CONFLICT,"Employee is already exist");

        //create new employee
        const _employee=await employee.create({
            userId,
            department,
            joining_Date,
            role_of_employee
        });
        console.log("Employee is created",_employee);
        return res.status(statusCode.SUCCESS).json(
            apiResponse(statusCode.SUCCESS,
                `Employee  is created sucessfully`,
                {_employee}
            )
        )

}catch(err){
        console.log("Server Error:",err.name)
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

        const allEmployee=await employee.find()
                                        .populate("userId","userName userEmail")
                                        .skip(skip) //if skip =10 then it will skip first 10 records and show from the 11th record.
                                        .limit(limit);

        //total count of employee
        const totalEmployee=await employee.countDocuments(); //countDocuments-->It is a MongoDB method that:
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
        console.log("Server Error:",err.name)
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

        const _employee=await employee.findById(employeeId).populate("userId","userName userEmail-_id");
        if(!_employee) return AppError(res,statusCode.NOT_FOUND,"Employee not found!");

        return res.status(statusCode.SUCCESS).json(
            apiResponse(statusCode.SUCCESS,
                "Employee is fetched sucessfully",
                _employee
            )
        )

    }catch(err){
        console.log("Server Error:",err.name)
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

        const{department,role_of_employee,joining_Date}=req.body;
        console.log("data from postman",req.body)

        const _employee=await employee.findByIdAndUpdate(
           employeeId,
        {department,
        role_of_employee,
        joining_Date},
        {new:true}
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
        console.log("Server Error:",err.name)
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
        const myProfile = await employee.findOne({ userId: userID }); //findOne searches any field you specify
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
        console.log("Server Error:",err.name)
        next(err);//end it to global err
    }
}

/**
 * DELETE REQUEST
 * delete_by_id
 */
export const deleteEmployeeById=async(req,res,next)=>{
    try{
        const {id}=req.params;
        console.log("ID FROM PARAMS:",req.params);

        const delete_employee=await employee.findById(id).populate("userId","userName userEmail-_id");
        if(!delete_employee) return AppError(res,statusCode.NOT_FOUND,"employee is not found")

            return res.status(statusCode.SUCCESS).json(apiResponse(
                statusCode.SUCCESS,
                "Employee is deleted sucessfully",
                {delete_employee}
            ))

    }catch(err){
        console.log("SERVER ERROR:",err.name);
        next(err);
    }
}