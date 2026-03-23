import mongoose from 'mongoose';
const attendanceSchema=new mongoose.Schema({
    employee_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"employee"
    },
    check_in_time:{
        type:Date,
        required:true
    },
    check_out_time:{
        type:Date
    },
    date:{
        type:Date,
        default:Date.now
    },
    working_hours:{
        type:Number
    },
    status_of_attendance:{
        type:String,
        enum:["present","absent","half day"],
        default:"present"
    },
    autoCheckedOut: {
  type: Boolean,
  default: false
}
},{timestamps:true});
const attendance=mongoose.model('attendance',attendanceSchema);
export default attendance;