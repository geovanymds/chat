const Chat = require('../models/Chat');
const User = require('../models/User');

exports.create = async (req, res, next) => {

  const { name, admin, description, tags, isPrivate, password } = req.body;

  try {

    if(isPrivate&&!password) {
      const error = new Error('Chats privados precisam de senha.');
      throw error;
    }

    const user = await User.findOne({'login': admin});

    const mAdmin = { login: user.login, userName: user.userName};

    if(!user) {
      const error = new Error('Usuário não encontrado.');
      throw error;
    }

    const chat = await Chat.create({name, 'admin':mAdmin, description, tags, isPrivate, password, 'members': [mAdmin] });

    return (res.status(201).json({ Message: 'Chat criado.'}));


  } catch (error) {

    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);

  }
  

}