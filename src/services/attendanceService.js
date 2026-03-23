export const processCheckout = (record) => {
  record.check_out_time = new Date();

  const diff = record.check_out_time - record.check_in_time;
  const hours = diff / (1000 * 60 * 60);

  record.working_hours = Number(hours.toFixed(2));

  if (hours >= 8) record.status_of_attendance = "Present";
  else if (hours >= 4) record.status_of_attendance = "Half Day";
  else record.status_of_attendance = "Absent";

  return record;
};