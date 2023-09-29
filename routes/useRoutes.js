import express from "express";
import { addcart, addproperty, delProperty, getProperty, getcart, googleLogin, login, register, updateProperty } from "../controllers/controller.js";

const userRoute=express.Router();
userRoute.post('/login',login);
userRoute.post('/register',register)
userRoute.post('/addproperty',addproperty)
userRoute.post('/deleteproperty',delProperty)
userRoute.get('/getproperty',getProperty);
userRoute.post('/updateproperty',updateProperty)
userRoute.post('/addtocart',addcart);
userRoute.post('/getcart',getcart);
userRoute.post('/googlelogin',googleLogin);

export default userRoute;