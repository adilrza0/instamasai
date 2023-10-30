const jwt=require("jsonwebtoken")


const auth=(req,res,next)=>{
    const token=req.headers.authorization.split(" ")[1]
    if(token){
        jwt.verify(token,"masai",(err,decoded)=>{
            if(decoded){
                req.body.email=decoded.email;
                req.body.userId=decoded.userId
                next()
            }
            else{
                res.status(200).send({"err":"please login"})
    
            }
        })

    }
    else{
        res.status(200).send({"err":"token is not present login again"})
    }
    
}

module.exports={
    auth
}