import mongoose from 'mongoose';
const leaveSchema=new mongoose.Schema({
    employee_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"employee"
    },
    leaveType:{
        type:String,
        required:true,
        trim:true
    },
    start_Date:{
        type:Date,
        required:true,


    },
    end_Date:{
        type:Date,
        required:true
    },
    reason:{
        type:String,
        required:true,
        minLength:[8,"Reason should be atleast of 8 characters"]
    },
    status_of_leave:{
        type:String,
        enum:["pending","approved","rejected"],
        default:"pending"
    }
},{timestamps:true});
const leave= mongoose.model("leave",leaveSchema);
export default leave;