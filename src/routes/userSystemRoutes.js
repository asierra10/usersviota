const { Router } = require('express');
const router = Router();
const userSystemController = require('../controllers/userSystemController');
const auth = require('../controllers/authController');
const { URI_GET_ALL_USERSYSTEM, URI_GET_ONE_USERSYSTEM, 
        URI_CREATE_USERSYSTEM, URI_LOGIN_USERSYSTEM,
        URI_UPDATE_PASSWORD, URI_DELETE_USERSYSTEM,
        URI_UPDATE_PASS_FORADMIN } = require('../path');

//Route to list all User System from MongoDb
router.get(URI_GET_ALL_USERSYSTEM, auth.validateToken, userSystemController.getAllUserSystem);

//Route to find One user in mongoDb //No need token, its use is in login process
router.get(URI_GET_ONE_USERSYSTEM, userSystemController.getOneUserSystem);

//Create a user system in mongodb
router.post(URI_CREATE_USERSYSTEM, auth.validateToken, userSystemController.createUserSystem);

//Route to login process
router.post(URI_LOGIN_USERSYSTEM, userSystemController.loginUserSystem);

//Route to update apassword after firts time login process
router.put(URI_UPDATE_PASSWORD, auth.validateToken, userSystemController.updatePassUserSystem);

//Route to delete one user from db
router.delete(URI_DELETE_USERSYSTEM, auth.validateToken, userSystemController.deleteUserSystem);

//Route to update the field updatedPassword for an especific user
router.put(URI_UPDATE_PASS_FORADMIN, auth.validateToken, userSystemController.updateAdministrativelyPass);

module.exports = router;  