const mongoose = require('mongoose');

const mensagemSchema = new mongoose.Schema({

    sender: {
        nome: String,
        required: true,
    },

    date: {
        type: Date,
        default: Date.now
    },

    conteudo: String

});

module.exports = mensagemSchema;