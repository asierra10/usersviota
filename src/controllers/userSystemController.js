const userSystem = require('../models/user_system');
const mongoose = require('mongoose');
const { SECRET } = require('../path');
const jwt = require('jsonwebtoken');

module.exports = {

    //Get all usersSystem from MongoDb database
    async getAllUserSystem(req, res){
        try{
            const findedUserSystem = await userSystem.find({}).lean();
            if(findedUserSystem == null){
                res.status(204).json({message:"No existen usuarios del sistema en la Coleccion"});
            }else{
                res.status(200).json({
                    message:'Usuarios encontrados',
                    userSystem:findedUserSystem
                });
            }
        }catch(err){
            res.status(400).json({message:"Algo ha fallado: "+err.message});
        }
    },
    //Get one login by username
    async getOneUserSystem(req, res){
        const { username } = req.params;
        try{
            const findedUserSystem = await userSystem.findOne({ user_userSystem: username });
            if(findedUserSystem != null){
                res.status(200).json({
                    message:'El usuario existe en el sistema',
                    userSystem:findedUserSystem
                });
            }else{
                res.status(204).json({ message:"El usuario no existe en el sistema." }); 
            }
        }catch(err){
            res.status(400).json({message:"Algo ha fallado: "+err.message});
        }
    },
    //Create one user system in db
    async createUserSystem(req, res){
        const { name_userSystem,user_userSystem,pass_userSystem,type_userSystem } = req.body;
        try{
            const newUserSystem = new userSystem({
                _id:mongoose.Types.ObjectId(),
                name_userSystem:name_userSystem,
                user_userSystem:user_userSystem,
                pass_userSystem:pass_userSystem,
                token_userSystem:"",
                firtsTimeLogin:true,
                updatedPassword:false,
                type_userSystem:type_userSystem
            });
            
            newUserSystem.pass_userSystem = await newUserSystem.encryptPassword(pass_userSystem);
            try{
                const userSaved = await newUserSystem.save();
                if(userSaved){
                    res.status(200).json({
                        message:"Usuario creado satisfactoriamente",
                        newUserSystem:newUserSystem
                    });
                }   
                console.log(userSaved);
            }catch(err){
                res.status(400).json({message:"No se ha podido crear el usuario: "+err.message})
            }
        }catch(err){
            res.status(400).json({message:"Algo ha fallado: "+err.message});
        }
    },
    //Login route, generate a token for the user
    async loginUserSystem(req, res){
        const { user_userSystem, pass_userSystem } = req.body;
        try{
            

            const verifyUserSystem = await userSystem.findOne({
                user_userSystem: user_userSystem
            });
            
            const a = await verifyUserSystem.encryptPassword("**AlcaldiaDeViota2022--");
            console.log(a);

            const validate = await verifyUserSystem.matchPassword(pass_userSystem,verifyUserSystem.pass_userSystem);
            if(validate){
                const token = jwt.sign({ id:verifyUserSystem._id },SECRET,{
                    expiresIn: 7200 //La duración del token es de 2 horas
                });
                const updatedUserSystem = await userSystem.updateOne({ 
                    user_userSystem:user_userSystem 
                },{ 
                    token_userSystem:token,
                    firtsTimeLogin:false
                });
                verifyUserSystem.token_userSystem = token;
                res.status(200).json({ 
                    message:"El usuario ha ingresado al sistema correctamente...",
                    logedUserSystem: verifyUserSystem
                });    
            }else{
                res.status(401).json({ message:"El usuario y la contraseña no son correctas..." });
            }   
        }catch(err){
            res.status(400).json({message:"Algo ha fallado: "+err.message});
        }
    },
    //To change a password
    async updatePassUserSystem(req, res){
        const { user_userSystem, newPass_userSystem } = req.body;
        try{
            aUserSystem = new userSystem({});
            aUserSystem.pass_userSystem = await aUserSystem.encryptPassword(newPass_userSystem);
            const changeUserSystem = await userSystem.updateOne({
                user_userSystem:user_userSystem
            },{
                pass_userSystem: aUserSystem.pass_userSystem,
                updatedPassword:true
            });
            if(changeUserSystem['nModified'] != 0){
                res.status(200).json({
                    message:"La contraseña se ha actualizado correctamente!",
                    userSystemEdited:changeUserSystem
                });
            }else{
                res.status(400).json({
                    message:"Usuario no encontrado, no se ha cambiado la contraseña."
                });
            }
        }catch(err){
            res.status(400).json({message:"Algo ha fallado: "+err.message});
        }
    },
    //Delete one user on db
    async deleteUserSystem(req, res){
        const { id } = req.params;
        try{
            const deletedUserSystem = await userSystem.deleteOne({
                _id:id
            });
            if(deletedUserSystem){
                console.log(deletedUserSystem);
                res.status(200).json({message:"Usuario eliminado correctamente."});
            }
        }catch(err){
            res.status(400).json({message:"Algo ha fallado: "+err.message});
        }
    },
    //Update the state of updatedPassword to false
    async updateAdministrativelyPass(req, res){
        const { id } = req.params;
        try{
            const updated = await userSystem.updateOne({
                _id:id
            },{
                updatedPassword:false
            });
            if(updated['nModified'] != 0){
                res.status(200).json({
                    message:"El usuario puede actualizar la contraseña en el siguiente inicio de sesión!",
                });
            }else{
                res.status(400).json({
                    message:"Usuario no encontrado, no se ha cambiado el estado."
                });
            }
        }catch(err){
            res.status(400).json({message:"Algo ha fallado: "+err.message});
        }
    }
}