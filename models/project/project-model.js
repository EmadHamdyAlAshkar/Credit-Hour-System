import mongoose from "mongoose";
import autopopulate from "mongoose-autopopulate"
const projectSchema=mongoose.Schema({
    name:{
        type:String,
        unique:true
    },
    background:{
        type:String
    },
    logo:{
        type:String
    },
    photos:[
        {type:String}
    ],
    videos:[
        {type:String}
    ],
    tools:[
        {type:String}
    ],
    sections:[
        {
            title:String,
            description:String,
        }
    ],
    category:{
        type:String
        // type:mongoose.Schema.Types.ObjectId,
        // ref:"category",
        // autopopulate:{select:"name"}
    }
},{ timestamps: true
    , versionKey: false
})
projectSchema.plugin(autopopulate)
import checkQuery from '../../plugins/checkQuery'
projectSchema.plugin(checkQuery)
const project=mongoose.model('projects',projectSchema);
export default project;