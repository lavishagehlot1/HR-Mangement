import mongoose from "mongoose";
import { ATTENDANCE_STATUS } from "../constants/attendanceStatus.js";

const attendanceSchema = new mongoose.Schema(
  {
    employeeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Employee",
      required: true,
    },

    checkInTime: {
      type: Date,
      required: true,
    },

    checkOutTime: {
      type: Date,
    },

    date: {
      type: Date,
      default: Date.now,
    },

    workingHours: {
      type: Number,
    },

    status: {
      type: String,
      enum: ATTENDANCE_STATUS,
      default: "present",
    },

    autoCheckedOut: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Attendance = mongoose.model("Attendance", attendanceSchema);

export default Attendance;