import mongoose from "mongoose";
import autopopulate from "mongoose-autopopulate"
// const Joi = require('Joi');
import Jwt from "jsonwebtoken"

const examSchema = mongoose.Schema({
    course: 
        {
            type: String,

            ref: "courses",
            // autopopulate: {
            //     select: "name"
            // }
        }
    ,
    day:{
        type:String,
        
    },
    hour:{
        type: String
    },
    hall:{
        type:String,

    }

}, {
    timestamps: true
    , versionKey: false
})



examSchema.plugin(autopopulate)
import checkQuery from '../../plugins/checkQuery'
import { date, number } from "joi";
import { times } from "lodash";
examSchema.plugin(checkQuery)
const exam = mongoose.model('exams', examSchema);
export default exam;
