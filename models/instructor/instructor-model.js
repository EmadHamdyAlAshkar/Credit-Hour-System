import mongoose from "mongoose";
import autopopulate from "mongoose-autopopulate"
import  Jwt  from "jsonwebtoken"

const instructorSchema=mongoose.Schema({
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
        type:Number,
    }
    ,username:{
        type:String,
    }
    ,password:{
        type:String, 
    }
    ,isInstructor:{
        type: Boolean,
    }
    ,courses:[
        {
            type:String,
            
            ref:"courses",
            
        }
    ],
    
},{ timestamps: true
    , versionKey: false
})
instructorSchema.methods.generateTokens = function () {
    const token = Jwt.sign({
        _id:this._id,
        name:this.name,
        qualification: this.qualification,
        gender:this.gender,
        email:this.email,
        mobile: this.mobile,
        username:this.username,
        isInstructor: this.isInstructor


    },"privatekey")
    return token

    
}

instructorSchema.plugin(autopopulate)
import checkQuery from '../../plugins/checkQuery'
instructorSchema.plugin(checkQuery)
const instructor=mongoose.model('instructor',instructorSchema);
export default instructor;