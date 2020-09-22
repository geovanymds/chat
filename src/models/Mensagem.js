const mongoose = require('mongoose');

const mensagemSchema = new mongoose.Schema({

    sender: {
        type: String,
        required: true,
    },

    date: {
        type: Date,
        default: Date.now
    },

    conteudo: String

});

module.exports = mensagemSchema;