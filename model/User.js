import mongoose from "mongoose"


const userschema = new mongoose.Schema(
    {
        name:{
            type: String,
        },
        email:{
            type:String,
            unique: true,
        },
        phone:{
            type:Number,
            default:0
    },
    password:{
        type:String,
    }
}
);

const user = new mongoose.model("user",userschema);
export default user;