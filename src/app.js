import express from 'express';
//app instance 
const app=express();
//parsse data that is coming from frontend.
app.use(express.json());
export default app;