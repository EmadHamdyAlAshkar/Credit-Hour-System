module.exports= function (req,res,next) {

    if(!req.user.isStudent){
        return res.status(403).send('You are not Student...')
    }
    next()
    
}