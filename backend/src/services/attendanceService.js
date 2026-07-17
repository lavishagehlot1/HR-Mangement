
import { ATTENDANCE_STATUS } from "../constants/attendanceStatus.js";

export const processCheckout = (record) => {
  // Set checkout time
  record.checkOutTime = new Date();

  // Calculate working hours
  const diff = record.checkOutTime - record.checkInTime;
  const hours = diff / (1000 * 60 * 60);

  // Save working hours
  record.workingHours = Number(hours.toFixed(2));

  // Update attendance status
  if (hours >= 8) {
    record.status = ATTENDANCE_STATUS[0];
  } else if (hours >= 4) {
    record.status = ATTENDANCE_STATUS[2];
  } else {
    record.status = ATTENDANCE_STATUS[1];
  }

  return record;
};