const { default: mongoose } = require("mongoose");

const blacklistSchema=mongoose.Schema({
    token:String
},{versionKey:false})

const blackModel=mongoose.model("blacklist",blacklistSchema)
module.exports={
    blackModel
}