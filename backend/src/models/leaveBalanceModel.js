import mongoose from "mongoose";
import { LEAVE_POLICY } from "../constants/leavePolicy.js";

const leaveBalanceSchema=new mongoose.Schema({
    employeeId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Employee',
        required:true,
        unique:true
    },
    annualLeave:{
        total:{
            type:Number,
            default:LEAVE_POLICY.annual
        },
        remaining:{
            type:Number,
            default:LEAVE_POLICY.annual
        },
    },
    casualLeave:{
          total: {
        type: Number,
        default: LEAVE_POLICY.casual,
      },
      remaining: {
        type: Number,
        default: LEAVE_POLICY.casual,
      },
    },
       sickLeave: {
      total: {
        type: Number,
        default: LEAVE_POLICY.sick,
      },
      remaining: {
        type: Number,
        default: LEAVE_POLICY.sick,
      },
    },

    maternityLeave: {
      total: {
        type: Number,
        default: LEAVE_POLICY.maternity,
      },
      remaining: {
        type: Number,
        default: LEAVE_POLICY.maternity,
      },
    },

    paternityLeave: {
      total: {
        type: Number,
        default: LEAVE_POLICY.paternity,
      },
      remaining: {
        type: Number,
        default: LEAVE_POLICY.paternity,
      },
    },

},{
    timestamps:true
});

const LeaveBalance=mongoose.model('LeaveBalance',leaveBalanceSchema);
export default LeaveBalance;