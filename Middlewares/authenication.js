const { validateToken } = require("../Services/authentication");

function checkForAuthenicationCookies(cookieName){
    return (req,res,next)=>{
        const tokenvalue = req.cookies[cookieName];
        if(!tokenvalue){
            req.user = null;
           return next()
        }
    
        try {
            const payload = validateToken(tokenvalue)
            req.user=payload
            
        } catch (error) {
            req.user = null; // Handle the error and set user to null
        }

       return next()
    }
}

function requireAuth(req, res, next){
    if (!req.user){
        return res.redirect('/user/signin'); // Redirect to sign-in page if not authenticated
    }
    next();
}

module.exports= {
    checkForAuthenicationCookies,
    requireAuth
}