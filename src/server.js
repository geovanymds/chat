const app = require('./app');
const mongoose = require('mongoose');
const mongoOptions = require('../config/mongo');

mongoose.connect(process.env.MONGO_URL, mongoOptions,(error)=>{
    if(!error) {
        console.log('Database sucefully connected.');
    } else {
        console.log(error);
        exit(1);
    }
});

app.listen(8080);



