import mongoose from "mongoose";
const adminSchema = mongoose.Schema({
    email:String,
    password:String,
    token:String,
})
const adminModal = mongoose.model('admin', adminSchema);
export  default adminModal