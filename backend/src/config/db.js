import mongoose from 'mongoose';
export const connectDB=async()=>{
    try{
        await mongoose.connect(process.env.MONGODB_URL||3000);
        //return res.status(200).json({message:"MongoDB connected sucessfully"})
        console.log("MongoDB connected sucessfully")
       
    }catch(err){
        //return res.status(500).json({message:"MongoDB error",Error:err.name})
        console.log("MongoDB error:",err.name)
         process.exit(1);
    }
}