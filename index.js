import  express from "express";
import mongoose from "mongoose";
import cors from "cors";
import userRoute from "./routes/useRoutes.js";

const app= express();
app.use(express.json({limit:"30mb" ,extended:true}));
app.use(express.urlencoded({limit:"30mb" ,extended:true}));
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    next();
  });
  
app.use(cors());
app.use(userRoute);
app.listen(8000,()=>{
    console.log("connected sucefully");
})
const uri="mongodb+srv://skk180509:OWkUpe1cZxAZWzks@cluster0.u1fc4bg.mongodb.net/?retryWrites=true&w=majority"

try {
    mongoose.connect(uri).then(()=>{
        console.log("connected")
    }) 
} catch (error) {
    console.log(error)
}

