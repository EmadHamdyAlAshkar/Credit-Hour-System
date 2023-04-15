import mongoose from "mongoose";
import autopopulate from "mongoose-autopopulate"
const courseSchema = mongoose.Schema({
    //course code
    _id: {
        type: String,
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
    ,code:{
        type: String,
    }
    ,prerequisites:[
        {
            type:String,
            ref:"courses",
            autopopulate:{
                select:"name"
            }
        }
    ],

}, {
    timestamps: true
    , versionKey: false
})
courseSchema.plugin(autopopulate)
import checkQuery from '../../plugins/checkQuery'
courseSchema.plugin(checkQuery)
const course = mongoose.model('courses', courseSchema);
export default course;