const mongoose = require('mongoose');

const Mensagem = new mongoose.Schema({

    sender: {
        type: String,
        required: true,
    },

    date: {
        type: Date,
        default: Date.now
    },

    content: String

});

module.exports = mongoose.model('Mensagem', Mensagem);