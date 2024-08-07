const JWT = require('jsonwebtoken');

const secret = "#1530"

function createTokenforUser(user){
    const payload={
        _id:user._id,
        email: user.email,
        profileImageURL: user.profileImageURL,
        role : user.role,
        name:user.fullName.split(' ')
    }


    const token = JWT.sign(payload,secret)

    return token;
}


function validateToken(token){
    const payload = JWT.verify(token,secret)

    return payload;
}


module.exports = {
    createTokenforUser,
    validateToken
}