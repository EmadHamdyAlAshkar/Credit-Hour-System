import mongoose from "mongoose";
import autopopulate from "mongoose-autopopulate"
// const Joi = require('Joi');
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
    },
    currentcourses:[
        {
            type:String,
            ref:"courses",
            autopopulate:{
                select:"name"
            }
        }
    ],
    finishedcourses:[
        {
            type:String,
            ref:"courses",
            autopopulate:{
                select:"name"
            }
        }
    ],
    
},{ timestamps: true
    , versionKey: false
})
//  function studentvalidate(student){
//     const schema = {
//         fullname: Joi.String().min(4).max(44).required(),
//         email: Joi.String().min(3).max().required().email(),
//         password: Joi.String().min(8).max(255).required(),
//     }
//     return Joi.validate(student,schema)
//  }

studentSchema.plugin(autopopulate)
import checkQuery from '../../plugins/checkQuery'
studentSchema.plugin(checkQuery)
const student=mongoose.model('students',studentSchema);
export default student;
// exports.studentvalidate = studentvalidate;