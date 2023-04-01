import  Jwt  from "jsonwebtoken";

module.exports= function (req,res,next) {

    if(!req.user.isStaff){
        return res.status(403).send('You are not Staff...')
    }
    next()
    
}