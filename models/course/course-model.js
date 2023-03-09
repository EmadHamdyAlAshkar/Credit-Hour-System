import mongoose from "mongoose";
import autopopulate from "mongoose-autopopulate"
const courseSchema = mongoose.Schema({
    _id: {
        type: Number,
    },
    name: {
        type: String,
    }
    ,department: {
        type: String,
    }
    , hours: {
        type: Number,
    }
    ,day:{
        type: String,
    }
    ,time:{
        type: String,
    }
    ,hall:{
        type: String,
    },

}, {
    timestamps: true
    , versionKey: false
})
courseSchema.plugin(autopopulate)
import checkQuery from '../../plugins/checkQuery'
courseSchema.plugin(checkQuery)
const course = mongoose.model('course', courseSchema);
export default course;