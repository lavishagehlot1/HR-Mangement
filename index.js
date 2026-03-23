import app from './src/app.js';
import dotenv from 'dotenv';
import { connectDB } from './src/config/db.js';
import globalErrorHandler from './src/middleware/globalErrorHandler.js'
import authRouter from './src/routes/authRoutes.js';
import employeeRoute from './src/routes/employeeRoute.js'
import leaveRoute from './src/routes/leaveRoute.js'
import attendanceRoute from './src/routes/attendanceRoute.js'
dotenv.config();
await connectDB();

app.use('/api/mangement',authRouter);
app.use('/api/mangement',employeeRoute);
app.use('/api/mangement',leaveRoute);
app.use('/api/mangement',attendanceRoute);



//global error handler
app.use(globalErrorHandler);



const PORT=3000;
//listening the port.
app.listen(process.env.PORT ,()=>{
    console.log(`Server is listening on port:${PORT}`);
})