const express=require("express")
const bcrypt=require("bcrypt")
const { userModel } = require("../model/user.model")
const jwt=require('jsonwebtoken')
const { blackModel } = require("../model/blacklist.mode")


const userRouter=express.Router()

userRouter.post("/register",(req,res)=>{
    const {name,email,password,gender,age,city,is_married}=req.body
    bcrypt.hash(password,5,async(err,hash)=>{
        try {
            if(err){
                res.status(200).send({"err from bcryp":err})
    
            }
            else{
                const check=await userModel.find({email})
                console.log(check)
                if(check.length){
                    res.status(200).send({"msg":"user already registered Please Login"})
                }
                else{
                    const user=new userModel({name,email,password:hash,gender,age,city,is_married})
                    await user.save()
                    res.status(200).send({"msg":"new user has been registered","newUser":user})

                }
               
            }
            
        } catch (error) {
            res.status(400).send({"err":error})
            
        }
        
    })

})

userRouter.post("/login",async(req,res)=>{
    const {email,password}=req.body
    try {
        const user= await userModel.find({email})
        bcrypt.compare(password,user[0].password,(err,decoded)=>{
            if(err){
                res.status(200).send({"err from bcrypt":err})
            }else{
                const token=jwt.sign({email:user[0].email,userId:user[0]._id},"masai",{expiresIn:"7d"})
               
                res.status(200).send({"msg":"user is succefully logged in","token":token})

            }
        })
    } catch (error) {
        res.status(400).send({"err":error})
        
    }

    
})
userRouter.post("/logout",async(req,res)=>{
    const token=req.headers.authorization.split(" ")[1]
    try {
        const blacklisted=new blackModel({token})
       
        await blacklisted.save()
        res.status(200).send({"msg":"logged out"})
    } catch (error) {
        res.status(400).send({"err":error})
        
    }
    

})



module.exports={
    userRouter
}