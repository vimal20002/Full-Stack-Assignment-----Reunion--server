import adminModal from "../modals/adminSchema.js";
import propertyModal from "../modals/propertySchema.js";
import userModal from "../modals/userSchema.js";
import bcrypt from "bcryptjs"

import uuid4 from "uuid4";

export const register= async(req,res)=>{
    try {
        const email=req.body.email;
   const user=await userModal.findOne({email:email});
   if(user){
    res.status(409).json({message:"User Already Exists"});
   }
   else{
       const salt =await bcrypt.genSalt(10);
       const npass= await bcrypt.hash(req.body.password,salt);
   const nuser= new userModal({...req.body,password:npass});
   await nuser.save();
   res.status(200).json({message:"Registered Successfully !"});
   } 
    } catch (error) {
        console.log(error)
    } 
}
export const login=async(req,res)=>{
    try {
        if(req?.body?.email === "sambhavi@admin.com")
            {
                return adminLogin(req, res);
            }
            else{
        const user=await userModal.findOne({email:req.body.email});
        if(user){
            
            
         const password=req.body.password;
         const compared=await bcrypt.compare(password,user.password);
         if(compared){
            res.status(200).json({user: user});
         }
         else{
            res.status(401).json({message:"Invalid Credentials!"})
         }
        
        }
        else{
            res.status(409).json({message:"User Does not exist ! "})
        }
    }
        
    } catch (error) {
        console.log(error)
    }
}
export  const addproperty  = async(req, res)=>{
    try {
        console.log(req.body)
    const admin = await adminModal.findOne({email:"sambhavi@admin.com"})
    if(req.body.token = admin.token){
const prop = await propertyModal.findOne({name:req.body.name});
if(prop)
{
    res.status(409).json({message:"Proprty already exist"});

}
else{
    const nprop = new propertyModal(req.body);
    await nprop.save()
    console.log(nprop)
    res.status(200).json({message:"Added successfully"});
}
    }
    else{
        res.status(401).json({message:"You are not a admin"});
    }
} catch (error) {
    console.log(error)   
   }
}
export const getProperty = async(req, res)=>{
try {
    const data = await propertyModal.find({});
    res.status(200).json(data);
} catch (error) {
    console.log(error)
}
}

export const adminLogin = async(req, res)=>
{
    try {
        const admin = await adminModal.findOne({email: "sambhavi@admin.com"})
        console.log(req.body.email)
        if(req.body.email === admin.email && req.body.password === admin.password)
        {
            var token = uuid4();
            admin.token = token;
            await admin.save()
            res.status(200).json({token:token})
        }
        else{
            res.status(401).json({message:"You are not a admin"})
        }
    } catch (error) {
        console.log(error)
    }
}
export const delProperty=async(req,res)=>{
    try {
        const admin = await adminModal.findOne({email: "sambhavi@admin.com"})
        if(req.body.token===admin.token){
            await propertyModal.deleteOne({name:req.body.name});
            const data = await propertyModal.find({});
            res.status(200).json(data);
        }
        else{
         res.status(401).json({message:"You're not an Admin !"});
        }
    } catch (error) {
        console.log(error)
    }
}
export const updateProperty=async(req,res)=>{
   try {
    console.log(req.body)
    const admin=await adminModal.findOne({email:"sambhavi@admin.com"});
    if(req.body.token===admin.token){
        const property=await propertyModal.findOne({name:req.body.name});
        if(property){
           await propertyModal.updateOne({name:req.body.name},{...req.body});
           res.status(200).json({message:"Details Updated!"})
        }
        else{
            res.status(409).json({message:"Property Doesn't Exist!"})
        }
    }
    else{
        res.status(401).json({message:"You're not an Admin!"})
    }
   } catch (error) {
    console.log(error)
   }
}
export const addcart=async(req,res)=>{
  try {
    const user=await userModal.findOne({email:req.body.email});
    if(user){
    const arr=user.cart;
    arr.push(req.body);
    user.cart=arr;
    await user.save();
    res.status(200).json({message:"Property Added SuccessFully!"})
    }
    else{
        res.status(401).json({message:"Please Login First!"})
    }
  } catch (error) {
    console.log(error)
  }
}
export const getcart=async(req,res)=>{
    try {
        const user=await userModal.findOne({email:req.body.email});
        if(user){
         res.status(200).json(user.cart);
        } 
        else{
          res.status(401).json({message:"Please Login First"});
        }
    } catch (error) {
        console.log(error); 
    }
}

export const googleLogin = async(req, res)=>{
    try {
        const user = await userModal.findOne({googleId:req.body.googleId})
        if(user === null)
        {
            const nuser = new userModal(req.body);
            nuser.save();
            res.status(200).json(nuser);
        }
        else{
            res.status(200).json(user);
        }
    } catch (error) {
        console.log(error)
    }
}