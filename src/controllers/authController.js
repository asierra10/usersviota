const userSystem = require('../models/user_system');
const jwt = require('jsonwebtoken');
const { SECRET } = require('../path');

module.exports = {
     async validateToken(req, res, next){
        const token = req.headers['x-access-token'];
        try{
            if(!token){
                res.status(401).json({
                    auth:false, 
                    message: "El usuario no está logueado en el sistema, permiso denegado."
                });
            }else{
                const userToken = await userSystem.findOne({ token_userSystem:token });
                if(userToken){
                    const decoded = jwt.verify(token,SECRET);
                    next();
                }else{ 
                    res.status(403).json({
                        message:"El Token no existe, permiso denegado"
                    });
                }
            }
        }catch(err){
            if(err.message == "jwt expired"){
                res.status(403).json({message:"El token ha expirado, por favor ingrese al sistema nuevamente: "});
            }else{
                res.status(400).json({message:"Algo ha fallado: "+err.message});
                next(err);
            }    
        }
     },
}  