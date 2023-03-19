import  Jwt  from "jsonwebtoken";

module.exports= function (req,res,next) {
    const token = req.header('x-auth-token')
    if(!token){
        return res.status(401).send('Access Rejected...')

    }
    try {
        const decodetoken = Jwt.verify(token, 'privatekey')
        req.user = decodetoken
        next()
    } catch (e) {
        res.status(400).send('Wrong token...')
    }
    
}

