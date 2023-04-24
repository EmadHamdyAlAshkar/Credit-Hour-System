import mongoose from "mongoose";
import autopopulate from "mongoose-autopopulate"
// const Joi = require('Joi');
import Jwt from "jsonwebtoken"

const requestSchema = mongoose.Schema({

    _id:{type:Number}
    ,studentcode: {
        type: String,

        ref: "students",
        autopopulate: {
            select: "name"
        }

    }
    ,
    requestedcourses: [
        {
            type: String,

            ref: "courses",
            autopopulate: {
                select: "name"
            }
        }
    ],
    status:{
        type:String,
        enum:["Accepted","Rejected","Pending"]
    }

}, {
    timestamps: true
    , versionKey: false
})



requestSchema.plugin(autopopulate)
import checkQuery from '../../plugins/checkQuery'
import { number } from "joi";
requestSchema.plugin(checkQuery)
const request = mongoose.model('requests', requestSchema);
export default request;
