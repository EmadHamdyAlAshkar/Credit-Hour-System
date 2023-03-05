import mongoose from "mongoose";
const images_schema = mongoose.Schema({
    _id:String,
    name: { type: String },
    path: {type:String},
    size:{type:Number},
    filename:{type: String}

},{ timestamps: true
    , versionKey: false
})

const images =mongoose.model("images",images_schema)
export default images;