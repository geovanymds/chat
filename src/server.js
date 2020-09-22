const app = require('./app');
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URL, {useNewUrlParser: true},(error)=>{
    if(!error) {
        console.log('Database sucefully connected.');
    } else {
        console.log(error);
        exit(1);
    }
});

app.listen(8080);

