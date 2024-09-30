const jwt = require('jsonwebtoken');

exports.refreshToken=async (req,res,next)=>{
    const cookies =req.headers.cookie;
    const prevToken = cookies.split("=")[1];
    if(!prevToken){
        return res.status(404).json({
            message:"Access denied: No token found"
        });
    }
    jwt.verify(String(prevToken),process.env.JWT_SECRET,(err,user)=>{
        if(err){
            return res.status(400).json({
                message:"Invalid token"
            });
        }
        res.clearCookie(String(user.id))

        const newToken = jwt.sign({id:user.id},process.env.JWT_SECRET,{
            expiresIn:"30s"
        });

        res.cookie("token",newToken,{
            path:"/",
            httpOnly:true,
            expires:new Date(Date.now()+1000*30),
            sameSite:"lax"
        });
        req.id = user.id;
        
    })
    next();
}