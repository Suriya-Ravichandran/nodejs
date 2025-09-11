const jwt = require('jsonwebtoken')

function authMiddleware(req,res,next){
    const token = req.headers.authorization?.split(' ')[1]
    if (!token) return res.status(401).json({error: "Access denied"})
    
    try{
        const decoded= jwt.verify(token,"ydfhdsjfjksdhfsdf")
        req.user=decoded;
        next();
    }catch (err){
        res.status(500).json({Error: "Invaild token"})
    }
}

module.exports = authMiddleware;