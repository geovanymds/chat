const app = require('./app');
const mongoose = require('mongoose');
const mongoOptions = require('../config/mongo');
const redis = require('redis');

const server = app.listen(8080);

const io = require('./services/socket').init(server);

mongoose.connect(process.env.MONGO_URL, mongoOptions,(error)=>{
    if(!error) {
        console.log('Database sucefully connected.');
    } else {
        console.log(error);
        exit(1);
    }
});

io.sockets.on('connection', function(socket) {

    console.log("User connected.");

    socket.on("enter", (data) => {

        data.forEach((chat) => {
            socket.join(chat._id);
            console.log("Socket - chat Id ",chat._id);
        });

    });

    socket.on("sendMessage", (data)=>{
        
    });

    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
    

    socket.on('msg', function (data) {
      socket.broadcast.emit(data);
    });
});



