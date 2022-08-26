const mongoose = require('mongoose');
const { DATABASE_USER, DATABASE_PASS,DATABASE_NAME } = require('../path');

(async () => {
    try {
        const URI_DATABASE = 'mongodb+srv://'+DATABASE_USER+':'+DATABASE_PASS+'@cluster0.tzq0g.mongodb.net/'+DATABASE_NAME+'?retryWrites=true&w=majority';
        await mongoose.connect(URI_DATABASE, { useNewUrlParser: true, useUnifiedTopology: true } );
        console.log('Conection!')
    }catch(error){
        console.log(error);
    }    
})();  