import mongoose from "mongoose";
import autopopulate from "mongoose-autopopulate"
// const Joi = require('Joi');
import Jwt from "jsonwebtoken"

const academicregistrationSchema = mongoose.Schema({
    _id:Number,
    status:Boolean
}, {
    timestamps: true
    , versionKey: false
})



academicregistrationSchema.plugin(autopopulate)
import checkQuery from '../../plugins/checkQuery'
import { date, number } from "joi";
import { times } from "lodash";
academicregistrationSchema.plugin(checkQuery)
const academicregistration = mongoose.model('academicregistration', academicregistrationSchema);
export default academicregistration;

