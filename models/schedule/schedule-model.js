import mongoose from "mongoose";
import autopopulate from "mongoose-autopopulate"
// const Joi = require('Joi');
import Jwt from "jsonwebtoken"

const scheduleSchema = mongoose.Schema({
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
        enum:["Saturday","Sunday","Monday","Tuesday","Wednesday","Thursday","Friday"]
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



scheduleSchema.plugin(autopopulate)
import checkQuery from '../../plugins/checkQuery'
import { date, number } from "joi";
import { times } from "lodash";
scheduleSchema.plugin(checkQuery)
const schedule = mongoose.model('schedules', scheduleSchema);
export default schedule;
