import mongoose from "mongoose";
import autopopulate from "mongoose-autopopulate"
// const Joi = require('Joi');
import Jwt from "jsonwebtoken"

const StudentCourseGradeSchema  = mongoose.Schema({

    gradeid:{
        type:String,
        
    },
    student: {
        type: Number,
        ref: 'students',
      },
      course: {
        type: String,
        ref: 'courses',
    //     autopopulate:{
    //       select:"_id"
    //   }
        
      },
      midtermGrade: Number,
      practicalGrade: Number,
      finalGrade: Number,
      totalGrade: Number,
      gradegpa: Number,
      gradeletter: String
    

}, {
    timestamps: true
    , versionKey: false
})


//Hello
StudentCourseGradeSchema.plugin(autopopulate)
import checkQuery from '../../plugins/checkQuery'
import { number } from "joi";
StudentCourseGradeSchema.plugin(checkQuery)
const StudentCourseGrade = mongoose.model('StudentCourseGrade', StudentCourseGradeSchema);
export default StudentCourseGrade;