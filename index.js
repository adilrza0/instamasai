const express=require("express")
const connection = require("./db")
const { userRouter } = require("./route/user.route")
const { postRouter } = require("./route/post.route")
const cors=require("cors")
require("dotenv").config()


const app=express()

app.use(cors())
app.use(express.json())
app.use("/users",userRouter)
app.use("/posts",postRouter)


app.listen(process.env.port,async()=>{
    try {
        await connection
        console.log("conneted to db")
        console.log(`server running at ${process.env.port}`)
        
    } catch (error) {
        console.log(error)
        
    }
    
})