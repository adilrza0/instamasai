const express=require("express")
const { auth } = require("../middleware/auth.middleware")
const { postModel } = require("../model/post.model")

const postRouter=express.Router()
postRouter.use(auth)
postRouter.post("/add",async(req,res)=>{
    try {
        const post=new postModel(req.body)
        await post.save()
        res.status(200).send({"msg":"new post added","newPost":post})
    } catch (error) {
        res.status(400).send({"err":error})
        
    }
        
        
})

postRouter.get("/",async(req,res)=>{
    const {email,userId}=req.body
    const {max,min}=req.query
    
    try {
        const posts=await postModel.find({email,userId,no_of_comments:{$gte:min,$lte:max}}).limit(3)
        res.status(200).send(posts)
    } catch (error) {
        res.status(400).send({"err":error})
        
    }
})
postRouter.get("/top",async(req,res)=>{
    const {email,userId}=req.body
    try {
        const posts=await postModel.find({email,userId}).limit(3).sort({no_of_comments:-1})
        res.status(200).send(posts)
    } catch (error) {
        res.status(400).send({"err":error})
        
    }
})

postRouter.patch("/update/:postId",async(req,res)=>{
    const {postId}=req.params
    try {
        const post=await postModel.findByIdAndUpdate({_id:postId},req.body)
        res.status(200).send({"msg":"post is update","post":post})
    } catch (error) {
        console.log(error)
        res.status(400).send({"err":error})
        
    }
})
postRouter.delete("/delete/:postId",async(req,res)=>{
    const {postId}=req.params
    try {
        const post=await postModel.findOneAndDelete({_id:postId},req.body)
        res.status(200).send({"msg":"post is deleted","post":post})
    } catch (error) {
        res.status(400).send({"err":error})
        
    }
})


module.exports={
    postRouter
}