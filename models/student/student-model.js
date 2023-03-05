import mongoose from "mongoose";
import autopopulate from "mongoose-autopopulate"
const studentSchema=mongoose.Schema({
    _id:{
        type:Number,
    },
    name:{
        type:String,

    }
    ,department:{
        type:String,
    }
    ,gender:{
        type:String,
    }
    ,email:{
        type:String,
    }
    ,level:{
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
studentSchema.plugin(autopopulate)
import checkQuery from '../../plugins/checkQuery'
studentSchema.plugin(checkQuery)
const student=mongoose.model('students',studentSchema);
export default student;