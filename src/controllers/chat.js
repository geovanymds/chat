const Chat = require('../models/Chat');
const User = require('../models/User');

exports.create = async (req, res, next) => {

  const { name, loginAdm, description, tags, isPrivate, password } = req.body;

  try {

    if(isPrivate&&!password) {
      const error = new Error('Chats privados precisam de senha.');
      throw error;
    }

    user = await User.findOne({'login': loginAdm});

    if(!user) {
      const error = new Error('Usuário não encontrado.');
      throw error;
    }

    chat = await Chat.create({name, 'admin': user, description, tags, isPrivate, password, 'members': user });

    return (res.status(201).json({ Message: 'Chat criado.'}));


  } catch (error) {

    if(!error.statusCode) {
      res.statusCode = 500;
      next(error);
    }

  }
  

}