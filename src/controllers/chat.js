const Chat = require('../models/Chat');
const User = require('../models/User');

exports.create = async (req, res, next) => {

  const { avatarUrl, name, admin, description, tags, isPrivate, password } = req.body;

  try {

    if(isPrivate&&!password) {
      const error = new Error('Chats privados precisam de senha.');
      throw error;
    }

    user = await User.findOne({'login': admin});

    if(!user) {
      const error = new Error('Usuário não encontrado.');
      throw error;
    }

    chat = await Chat.create({avatarUrl, name, 'admin': user, description, tags, isPrivate, password, 'members': user });

    return (res.status(201).json({ Message: 'Chat criado.'}));


  } catch (error) {

    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);

  }
}

exports.getChatsUser = async (req, res, next) => {

  const { login } = req.params;

  try {

    const chats = await Chat.find({}).where('members.login').in([login]);

    return res.status(200).json({chats});

  } catch (error) {

    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);

  }
}

exports.searchChat = async (req, res, next) => {

  const { keyWord }  = req.query;
  let search = keyWord.trim();

  try {

    let chats = await Chat.find({'name': search});

    search = search.toLowerCase().split(" ");
    
    chats = chats.concat(await (Chat.find({}).where('tags').in(search)));
    
    return res.status(200).json({chats});

  } catch (error) {

    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);

  }
}
