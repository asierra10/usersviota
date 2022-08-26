module.exports = {
    SERVER_PORT: 3000,
    SECRET: 'mailing-alcaldia-viota',
    DATABASE_USER: 'gglobhack',
    DATABASE_PASS: 'globhack2020',
    DATABASE_NAME: 'user-system-db',
    URI_DATABASE: 'mongodb+srv://gglobhack:globhack2020@cluster0.tzq0g.mongodb.net/user-system-db?retryWrites=true&w=majority',
    URI_GET_ALL_USERSYSTEM: '/api/getAllUserSystem',
    URI_GET_ONE_USERSYSTEM: '/api/getOneUserSystem/:username',
    URI_CREATE_USERSYSTEM: '/api/createUserSystem',
    URI_LOGIN_USERSYSTEM: '/api/loginUserSystem',
    URI_UPDATE_PASSWORD: '/api/updatePassUserSystem',
    URI_DELETE_USERSYSTEM: '/api/deleteUserSystem/:id',
    URI_UPDATE_PASS_FORADMIN: '/api/updatePassForAdmin/:id'
}