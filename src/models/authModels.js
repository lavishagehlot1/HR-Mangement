import mongoose from 'mongoose';
import bcrypt from 'bcrypt'
const userSchema=new mongoose.Schema({
    userName:{
        type:String,
        required:[true,"User name is required"],
        trim:true
    },
    userEmail:{
        type:String,
        required:[true,"Email is required"],
        trim:true,
        lowercase:true,
        match:[/^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            "Email should be in write formate"
        ]
    },
    password:{
        type:String,
        required:[true,'Password is required'],
        minLength:[6,'Password must be atleast 6 characters'],
    },
    role:{
        type:String,
        enum:["admin","HR","employee"],
        default:"employee"
    }
},{timestamps:true});
//pre save the password in db.
userSchema.pre('save',async function(){
    if(!this.isModified('password')){
        return
    }
        this.password=await bcrypt.hash(this.password,12)
});

//compare password
userSchema.methods.comparePassword=async function(password){
    return await bcrypt.compare(password,this.password) //this refers to current document to the database
}
//const isMatch = await user.comparePassword(password);


const user=mongoose.model('User',userSchema)
export default user;