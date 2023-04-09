import mongoose from "mongoose";
import autopopulate from "mongoose-autopopulate"
// const Joi = require('Joi');
import  Jwt  from "jsonwebtoken"

const studentSchema=mongoose.Schema({
    _id:{
        type:Number,
        required: true,
    },
    full_name:{
        type:String,
        required: true,

    },
    country_of_nationality:{
        type: String,
        required: true,
    },
    religion:{
        type: String,
        required: true,
    },
    date_of_birth:{
        type: Number,
        required: true,
    },
    place_of_birth:{
        type: String,
        required: true,
    },
    national_id:{
        type: Number,
        required: true,
    },
    guardian_name:{
        type: String,
        required: true,
    },
    jop:{
        type: String,
        required:true,
    },
    city:{
        type:String,
        required:true,
    },
    address:{
        type: String,
        required:true,
    },
    home_phone:{
        type: Number,
        required: true,
    },
    mobile:{
        type: Number,
        required:true,
    },
    school:{
        type:String,
        required:true,
    },
    fully_qualified:{
        type:String,
        required:true,
    },
    graduation_year:{
        type:Number,
        required:true,
    },
    role_of_qualification:{
        type: String,
        required:true,
    },
    total_score:{
        type:Number,
    },
    department:{
        type:String,
        required: true,
    },
    gender:{
        type:String,
        required: true,
    },
    email:{
        type:String,
        required: true,
    },
    level:{
        type:Number,
        required: true,
    },
    academic_email:{
        type:String,
        required: true,
    },
    password:{
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