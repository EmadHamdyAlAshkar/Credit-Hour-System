import mongoose from "mongoose";
import autopopulate from "mongoose-autopopulate"
import  Jwt  from "jsonwebtoken"
// import { boolean } from "joi";

const staffSchema = mongoose.Schema({
    _id:{
        type:Number,
    },
    name:{
        type:String,

    }
    ,qualification:{
        type:String,
    }
    ,gender:{
        type:String,
    }
    ,email:{
        type:String,
        unique: true,
    }
    ,mobile:{
        type:String,
    }
    ,username:{
        type:String,
    }
    ,password:{
        type:String, 
    }
    ,isStaff:{
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
        qualification: this.qualification,
        gender:this.gender,
        email:this.email,
        mobile: this.mobile,
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