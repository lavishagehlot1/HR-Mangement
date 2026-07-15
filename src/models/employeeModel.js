import mongoose from "mongoose";
import { DEPARTMENTS } from "../constants/department.js";
import { JOB_ROLES } from "../constants/jobRoles.js";

const employeeSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },

    department: {
      type: String,
      enum: DEPARTMENTS,
      required: true,
    },

    roleOfEmployee: {
      type: String,
      enum: JOB_ROLES,
      required: true,
    },

    joiningDate: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Employee = mongoose.model("Employee", employeeSchema);

export default Employee;