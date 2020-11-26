const Chat = require("../models/Chat");
const User = require("../models/User");
const socket = require("../services/socket");

exports.create = async (req, res, next) => {
  const {
    avatarUrl,
    name,
    admin,
    description,
    tags,
    isPrivate,
    password,
  } = req.body;

  try {
    if (isPrivate && !password) {
      const error = new Error("Chats privados precisam de senha.");
      throw error;
    }

    user = await User.findOne({ login: admin });

    if (!user) {
      const error = new Error("Usuário não encontrado.");
      throw error;
    }

    chat = await Chat.create({
      avatarUrl,
      name,
      admin: user,
      description,
      tags,
      isPrivate,
      password,
      members: user,
    });

    return res.status(201).json({ chat });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

exports.getChatsUser = async (req, res, next) => {
  const { login } = req.params;

  try {

    const chats = await Chat.find({})
      .where("members.login")
      .in([login])
      .select("avatarUrl name admin description tags members totalMessages");

    let messages = [];

    if(chats.length>0) {

      messages = await Chat.findOne({'_id':chats[0]._id}).select("messages");
      messages = messages.messages.slice(messages.length - 10, messages.length);

    }
    
    return res.status(200).json({ chats:chats, messages:messages });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

exports.searchChat = async (req, res, next) => {
  const { keyWord, login } = req.query;
  let search = keyWord.trim();

  try {
    let chats = await Chat.find({ name: search })
      .where("members.login")
      .ne(login);

    search = search.toLowerCase().split(" ");

    chats = chats.concat(
      await Chat.find({})
        .where("tags")
        .in(search)
        .where("members.login")
        .ne(login)
        .select(
          "avatarUrl name admin description tags members isPrivate password"
        )
    );

    return res.status(200).json({ chats });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

exports.enterChat = async (req, res, next) => {
  const { userId, chatId, password } = req.body;

  try {
    const user = await User.findOne({ '_id': userId });
    const chat = await Chat.findOne({ '_id': chatId });

    if (!!chat.password && !password) {
      const error = new Error("This chat needs a password.");
      error.statusCode = 403;
      throw error;
    }

    if (chat.password != password) {
      const error = new Error("This chat needs a password.");
      error.statusCode = 403;
      throw error;
    }

    const { avatarUrl, login, userName, email } = user;

    chat.members.push({ avatarUrl, login, userName, email });

    const newMember = await chat.save();

    return res.status(200).json({ member: newMember });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

exports.send = async (req, res, next) => {
  const { chatId, sender, date, content } = req.body;

  try {
    const chat = await Chat.findOne({ _id: chatId });

    console.log("Controle - chat ID", chatId);

    if (!chat) {
      const error = new Error("Chat not found.");
      error.statusCode = 403;
      throw error;
    }

    chat.messages.push({ sender, date, content });
    chat.totalMessages +=1;
    await chat.save();

    const message = {
      chatId:chatId,
      sender:sender,
      date: new Date(),
      content:content,
    };

    socket.getIO().to(chatId).emit("send", {chatId:chatId, sender:sender, date:new Date(), content:content});

    return res.status(200).json({ Message: "sucess" });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

exports.getMessages = async (req, res, next) => {
  const LIM_MSG = 10;

  const { page, chatId } = req.query;

  try {

    let chat = await Chat.findOne({ _id: chatId });

    if (!!chat) {
      const mensagens = chat.messages;

      let pagination = [];
      let cont = 0;

      let index = mensagens.length - LIM_MSG * (page - 1) - 1;

      for (index; cont < LIM_MSG && index >= 0; index--) {
        
        pagination.push(mensagens[index]);

        cont++;
      }

      pagination = pagination.reverse();

      return res.status(200).json({pagination: pagination});
    }
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

exports.getChat = async (req, res, next) => {
  const { id } = req.params;

  try {

    const chat = await Chat.find({'_id':id}).select('name avatarUrl members description');

    return res.status(200).json({ chat });

  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};
