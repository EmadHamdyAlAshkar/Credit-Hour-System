import mongoose from "mongoose";
import autopopulate from "mongoose-autopopulate"
// const Joi = require('Joi');
import  Jwt  from "jsonwebtoken"

const studentSchema=mongoose.Schema({
    _id:{
        type:Number,
        required: true,
    },
    name:{
        type:String,
        required: true,

    }
    ,department:{
        type:String,
        required: true,
    }
    ,gender:{
        type:String,
        required: true,
    }
    ,email:{
        type:String,
        required: true,
    }
    ,level:{
        type:Number,
        required: true,
    }
    ,email:{
        type:String,
        required: true,
    }
    ,password:{
        type:String,
        required: true,
    },
    isStudent: {
        type: Boolean,
        required: true,
    },
    currentcourses:[
        {
            type:String,
            required: true,
            ref:"courses",
            autopopulate:{
                select:"name"
            }
        }
    ],
    finishedcourses:[
        {
            type:String,
            required: true,
            ref:"courses",
            autopopulate:{
                select:"name"
            }
        }
    ],
    
},{ timestamps: true
    , versionKey: false
})
studentSchema.methods.generateTokens = function () {
    const token = Jwt.sign({
        _id:this._id,
        name:this.name,
        department:this.department,
        gender:this.gender,
        email:this.email,
        username:this.username,
        isStudent: this.isStudent,
        currentcourses: this.currentcourses,
        finishedcourses: this.finishedcourses,


    },"privatekey")
    return token

    
}
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