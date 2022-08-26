const mongoose = require('mongoose');
const bc = require('bcryptjs');

const userSystemSchema = new mongoose.Schema({
    _id:{
        type: String,
    },
    name_userSystem:{
        type: String,
        required: true
    },
    user_userSystem:{
        type: String,
        required: true
    },
    pass_userSystem:{
        type: String,
        required: true
    },
    token_userSystem:{
        type: String,
    },
    firtsTimeLogin:{
        type: Boolean,
    },
    updatedPassword:{
        type: Boolean,
    },
    userCreatedAt:{ 
        type: Date, 
        required: true, 
        default: Date.now 
    },
    type_userSystem:{
        type: String,
        required: true
    }
},{
    collection:'user_system'
});

userSystemSchema.methods.encryptPassword = async (pass_userSystem) =>{
    const salt = await bc.genSalt(10);
    return await bc.hash(pass_userSystem, salt);
};

userSystemSchema.methods.matchPassword = async (newPassUserSystem,bdPassUserSystem) =>{
    return await bc.compare(newPassUserSystem,bdPassUserSystem);
};

module.exports = mongoose.model('user_system',userSystemSchema);