const jwt = require('jsonwebtoken');
const decode = require('jwt-decode');
const settings = require("../config/settings");
function isAuth (token){
    if(!token){
        return res.status(403).send({mensaje:"sin autorización"});
    }
    console.log("token",token);
    const payload = jwt.verify(token, settings.secret);
    //req.usuario = payload;
    console.log(payload);
    return payload;
}
module.exports = {isAuth}