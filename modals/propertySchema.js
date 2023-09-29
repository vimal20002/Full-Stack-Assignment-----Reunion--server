import mongoose from "mongoose"
const propertySchema= mongoose.Schema({
    name:String,
    price:String,
    town:String,
    type:String,
    date:String,
    imageUrls:[String],
})
const propertyModal = mongoose.model("property", propertySchema)
export default propertyModal