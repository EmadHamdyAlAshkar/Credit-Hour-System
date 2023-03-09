import mongoose from "mongoose";
import autopopulate from "mongoose-autopopulate"
const staffSchema = mongoose.Schema({
    _id: {
        type: Number,
    },
    name: {
        type: String,

    }
    , department: {
        type: String,
    }
    , gender: {
        type: String,
    }
    , email: {
        type: String,
    }

    , username: {
        type: String,
    }
    , password: {
        type: String,
    }

}, {
    timestamps: true
    , versionKey: false
})
staffSchema.plugin(autopopulate)
import checkQuery from '../../plugins/checkQuery'
staffSchema.plugin(checkQuery)
const staff = mongoose.model('staff', staffSchema);
export default staff;