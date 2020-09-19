const express = require('express');
const routes = require('./routes/index');

class App {

    constructor() {
        this.express = express();
        this.middlewares();
        this.routes();
    }

    middlewares() {
        this.express.use(express.json());
    }

    routes() {

        const {
            userRouter,
            chatRouter,
        } = routes

        this.express.use('/user', userRouter);
        this.express.use('/chat', chatRouter);

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