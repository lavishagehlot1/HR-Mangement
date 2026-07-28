import mongoose from "mongoose";
import { LEAVE_STATUS } from "../constants/leaveStatus.js";
import { LEAVE_TYPES } from "../constants/leaveTypes.js";

const leaveSchema = new mongoose.Schema(
  {
    employeeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Employee",
      required: true,
    },

    leaveType: {
      type: String,
      enum: LEAVE_TYPES,
      required: true,
      trim: true,
    },

    startDate: {
      type: Date,
      required: true,
    },

    endDate: {
      type: Date,
      required: true,
    },

    reason: {
      type: String,
      required: true,
      minlength: [8, "Reason should be at least 8 characters"],
    },

    status: {
      type: String,
      enum: LEAVE_STATUS,
      default: "pending",
    },

    approvedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    paidLeaveDays: {
      type: Number,
      default: 0
    },
    unpaidLeaveDays: {
      type: Number,
      default: 0
    },
    totalLeaveDays: {
      type: Number
    }
  },
  {
    timestamps: true,
  }
);

const Leave = mongoose.model("Leave", leaveSchema);

export default Leave;