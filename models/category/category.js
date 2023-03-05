import mongoose from "mongoose"; 
const categoryschema =mongoose.Schema({
    name:{
        type:String
    },
    photos:[String],
    videos:[String]
})


