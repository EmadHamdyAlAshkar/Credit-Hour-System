import mongoose from "mongoose";
import autopopulate from "mongoose-autopopulate"
// const Joi = require('Joi');
import Jwt from "jsonwebtoken"

const requestSchema = mongoose.Schema({

    _id:{type:String}
    ,studentcode: {
        type: Number,

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
        enum:["accepted","rejected","pending"]
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
