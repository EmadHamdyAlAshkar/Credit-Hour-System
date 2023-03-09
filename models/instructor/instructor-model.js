import mongoose from "mongoose";
import autopopulate from "mongoose-autopopulate"
const instructorSchema=mongoose.Schema({
    _id:{
        type:Number,
    },
    name:{
        type:String,

    }
    ,qualification:{
        type:String,
    }
    ,gender:{
        type:String,
    }
    ,email:{
        type:String,
    }
    ,mobile:{
        type:Number,
    }
    ,username:{
        type:String,
    }
    ,password:{
        type:String, 
    }
    
},{ timestamps: true
    , versionKey: false
})
instructorSchema.plugin(autopopulate)
import checkQuery from '../../plugins/checkQuery'
instructorSchema.plugin(checkQuery)
const instructor=mongoose.model('instructor',instructorSchema);
export default instructor;