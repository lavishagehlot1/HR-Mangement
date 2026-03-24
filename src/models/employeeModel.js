import mongoose from 'mongoose';
const employeeSchema=new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
        
    },
    department:{
        type:String,
        required:true
    },
    role_of_employee:{
        type:String,
        required:true
    },
    joining_Date:{
        type:Date,
        required:true
    }
},{timestamps:true});
const employee=mongoose.model('employee',employeeSchema);
export default employee;