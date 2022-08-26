//Imports
const express = require('express');
const app = express();
const { SERVER_PORT } = require('./path');
const userSystemRoutes = require('./routes/userSystemRoutes');
const cors = require('cors');
const db = require('./database/db');

//Server settings
app.set('port', process.env.PORT  || SERVER_PORT);
app.set('json spaces', 2);
app.use(express.json());

//Middleware
app.use(cors({
    origin:'*'
}));

//Routes
app.use(userSystemRoutes);

//Start the server
app.listen(app.get('port'), ()=>{
    console.log('Server listening on port '+app.get('port'));
});