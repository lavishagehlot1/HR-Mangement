import cron from 'node-cron';
import { processCheckout } from "../services/attendanceService";
cron.schedule('59 23 * * *',async()=>{
    console.log("Running cron");
});

 const count=await processCheckout();
 console.log(`Checked out ${count} employee`)

 /**try {
    // Find all employees who checked in but didn't check out
    const records = await attendance.find({
      check_in_time: { $ne: null },
      check_out_time: null
    });

    for (let record of records) {
      processCheckout(record);
      record.autoCheckedOut = true; // mark as auto checkout
      await record.save();
    }

    console.log(`Auto checked out ${records.length} employees`);

  } catch (err) {
    console.error('Cron job error:', err);
  }
}); */