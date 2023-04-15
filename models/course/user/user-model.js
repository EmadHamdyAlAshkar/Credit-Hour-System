import mongoose from "mongoose";
import autopopulate from "mongoose-autopopulate"
import  Jwt  from "jsonwebtoken"

const userSchema = mongoose.Schema({
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

userSchema.methods.generateTokens = function () {
    const token = Jwt.sign({_id:this._id,name:this.name},"privatekey")
    return token

    
}

userSchema.plugin(autopopulate)
// import checkQuery from '../../plugins/checkQuery'
// userSchema.plugin(checkQuery)
const user = mongoose.model('User', userSchema);
export default user;