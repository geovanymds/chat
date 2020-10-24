require('dotenv').config();
const express = require('express');
const routes = require('./routes/index');
const cors = require('cors');
const headers = require('./middlewares/headers');

class App {

    constructor() {
        this.express = express();
        this.middlewares();
        this.routes();
    }

    middlewares() {
        this.express.use(cors());
        this.express.use(express.json());
        this.express.use(headers);
    }

    routes() {

        const {
            userRouter,
            chatRouter,
        } = routes

        this.express.use('/users', userRouter);
        this.express.use('/chats', chatRouter);

        this.express.use((req, res, next) => {
			res.status(404).json({ message: 'Route not found' });
        });

        this.express.use((error, req, res, next) => {
            console.log(error);
            let status = 500;
            status = error.statusCode;
            const message = error.message;
            res.status(status).json({ message });
        });
    }

}

module.exports = new App().express;