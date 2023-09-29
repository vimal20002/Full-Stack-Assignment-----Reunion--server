import mongoose from "mongoose";

const userSchema=new mongoose.Schema(
    {
        email : String,
        password: String,
        phone:String,
        firstName:String,
        lastName:String,
        cart:[Object],
        googleId:String,
        imageUrl:String,
    }
)
const userModal= mongoose.model("user",userSchema);
export default userModal
