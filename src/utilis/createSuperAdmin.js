import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import user from '../models/authModels.js';
dotenv.config();
const createSuperAdmin=async()=>{
    try{
        await mongoose.connect(process.env.MONGODB_URL);
        const superAdminEmail="Ishika12@gmail.com";

        //check if super admin already exist
        const existingAdmin=await user.findOne({userEmail:superAdminEmail})
        if(existingAdmin){
            console.log("Super admin already exist");
            process.exit() //bydefault-0--> for success
        }

        //hashed password
        const hashedPassword=await bcrypt.hash('Ishika12',12);

        
        //create super admin
        const admin=await user.create({
            userName:"Ishika raut",
            userEmail:superAdminEmail,
            password:hashedPassword,
            role:"admin" //superior admin
        })
        console.log("Super admin created successfully",admin);
        process.exit()

    
    }catch(err){
        console.log("Error while creating super admin",err.name);
        console.error(err.errors); // <-- ADD THIS LINE
        process.exit(1); //1-failer/error
    }
}
createSuperAdmin();

//we are using process.exit again and again becoz its seed-script(where wecreate admin one time) not server .