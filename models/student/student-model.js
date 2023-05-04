import mongoose from "mongoose";
import autopopulate from "mongoose-autopopulate"
import  Jwt  from "jsonwebtoken"

const studentSchema=mongoose.Schema({
    _id:{
        type:Number,
    },
    full_name:{
        type:String,

    },
    country_of_nationality:{
        type: String,
        
    },
    religion:{
        type: String,
        
    },
    date_of_birth:{
        type: String,
        
    },
    place_of_birth:{
        type: String,
        
    },
    national_id:{
        type: Number,
        
    },
    guardian_name:{
        type: String,
        
    },
    jop:{
        type: String,
        
    },
    city:{
        type:String,
        
    },
    address:{
        type: String,
        
    },
    home_phone:{
        type: Number,
        
    },
    mobile:{
        type: String,
        
    },
    school:{
        type:String,
        
    },
    fully_qualified:{
        type:String,
        
    },
    graduation_year:{
        type:Number,
        
    },
    role_of_qualification:{
        type: String,
        
    },
    total_score:{
        type:Number,
    },
    department:{
        type:String,
        
    },
    gender:{
        type:String,
        
    },
    email:{
        type:String,
        
    },
    level:{
        type:Number,
        
    },
    academic_email:{
        type:String,
        
    },
    password:{
        type:String,
        
    },
    isStudent: {
        type: Boolean,
        
        
    },
    gpa:{
        type:Number,
        
    },
    hoursused:{
        type: Number
    },
    remaininghourse:{
        type: Number,
        default : 125
    },
    availablecredit:{
        type: Number,
        default : 12
    },
    currentcourses:[
        {
            type:String,
            
            ref:"courses",
            autopopulate:{
                select:"_id"
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
    coursesgrades:[
        {
            type: ObjectId,
            ref:"StudentCourseGrade",
            
        }
    ]
    
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
import { ObjectId } from "mongodb";
studentSchema.plugin(checkQuery)
const student=mongoose.model('students',studentSchema);
export default student;
// exports.studentvalidate = studentvalidate;