import express from 'express';
import cors from 'cors';
//app instance 
const app=express();
app.use(cors())
//parsse data that is coming from frontend.
app.use(express.json());
export default app;