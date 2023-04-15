import mongoose from "mongoose";
import autopopulate from "mongoose-autopopulate"
import  Jwt  from "jsonwebtoken"

const adminSchema=mongoose.Schema({
    username:{
        type: String,
        required: true,
        unique: true,
    },
    password:{
        type: String,
        required: true,
    },
    isAdmin:{
        type:Boolean,
        required: true,
    }
    
    
},{ timestamps: true
    , versionKey: false
})

adminSchema.methods.generateTokens = function () {
    const token = Jwt.sign({
        username:this.username,
        isAdmin:this.isAdmin, 
    },"privatekey")
    return token

    
}

adminSchema.plugin(autopopulate)
import checkQuery from '../../plugins/checkQuery'
adminSchema.plugin(checkQuery)
const admin=mongoose.model('Admin',adminSchema);
export default admin;