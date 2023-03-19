import user from "../models/course/user/user-model";
import Joi from "joi";
import _ from "lodash"
import bcrypt from "bcrypt"

// Create User

async function createuser(req, res, next) {

    // const {error} = uservalidate(req.body)
    // if(error){
    //     return res.send(error.details.message)
    // }

    const usr = new user(_.pick(req.body,['_id','name','email','password','gender'])
    // {
    //     _id: req.body._id,
    //     name: req.body.name,
    //     department: req.body.department,
    //     gender: req.body.gender, 
    //     email: req.body.email,
    //     level: req.body.level,
    //     username: req.body.username,
    //     password: req.body.password,
    // }
    )
    const saltrounds = 10
    usr.password = await bcrypt.hash(usr.password,saltrounds)
    await usr.save((error, result) => {
        if (error) {
            res.send(error)
        }
        else {
            res.send(_.pick(usr,['_id','name','email']))
        }
    });
}


function uservalidate(user){
    const schema = {
        _id: Joi.number().min(3).required(),
        password: Joi.string().min(3).required(),
    }
    return Joi.Validate(user,schema)
}

export default{
    createuser
}