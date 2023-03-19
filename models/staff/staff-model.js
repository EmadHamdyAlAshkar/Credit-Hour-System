import mongoose from "mongoose";
import autopopulate from "mongoose-autopopulate"
import  Jwt  from "jsonwebtoken"
// import { boolean } from "joi";

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
    , isStaff: {
        type: Boolean,
    }

}, {
    timestamps: true
    , versionKey: false
})

staffSchema.methods.generateTokens = function () {
    const token = Jwt.sign({
        _id:this._id,
        name:this.name,
        department:this.department,
        gender:this.gender,
        email:this.email,
        username:this.username,
        isStaff: this.isStaff


    },"privatekey")
    return token

    
}
staffSchema.plugin(autopopulate)
// import checkQuery from '../../plugins/checkQuery'
// staffSchema.plugin(checkQuery)
const staff = mongoose.model('staff', staffSchema);
export default staff;