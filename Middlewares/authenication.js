const { validateToken } = require("../Services/authentication");

function checkForAuthenicationCookies(cookieName){
    return (req,res,next)=>{
        const tokenvalue = req.cookies[cookieName];
        if(!tokenvalue){
           return next()
        }
    
        try {
            const payload = validateToken(tokenvalue)
            req.user=payload
        } catch (error) {
            
        }

       return next()
    }
}

module.exports= {
    checkForAuthenicationCookies
}