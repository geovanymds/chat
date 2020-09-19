const app = require('./app');
const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://geovany:THJ1KFeeAbvSuJMd@cluster0.ful8x.mongodb.net/chat?retryWrites=true&w=majority', {useNewUrlParser: true});

app.listen(8080);

