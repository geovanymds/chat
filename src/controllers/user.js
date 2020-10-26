const User = require("../models/User");
const Friendship = require("../models/Friendship");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const secret = require("../../config/jwt");

exports.signup = async (req, res, next) => {
  try {
    const { login, userName, email, password, likes } = req.body;

    let hashedPassword = await bcrypt.hash(password, 12);

    user = await User.create({
      login,
      userName,
      email,
      password: hashedPassword,
      likes,
    });

    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
      },
      secret
    );

    return res
      .status(201)
      .json({
        Message: "User sucefully registred.",
        login: user.login,
        user: user.userName,
        token,
      });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

exports.login = async (req, res, next) => {
  const { login, password } = req.body;

  try {
    let user = await User.findOne({ login }).select("+password");

    if (!user) {
      const error = new Error("Login or password incorrect.");
      error.statusCode = 401;
      throw error;
    }

    const unhashedPass = await bcrypt.compare(password, user.password);

    if (!unhashedPass) {
      const error = new Error("Login or password incorrect.");
      error.statusCode = 401;
      throw error;
    }

    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
      },
      secret
    );

    return res.status(200).json({
      Message: "User sucefully connected.",
      login: user.login,
      user: user.userName,
      token,
    });
    
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

exports.getUser = async (req, res, next) => {
  const { userName } = req.params;

  try {
    user = await User.findOne({ userName });

    if (!!user) {
      return res.status(200).json(user);
    }

    return res.status(404).json({ Message: "User not found." });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

exports.getUsers = async (req, res, next) => {
  try {
    users = await User.find();

    if (!!users) {
      return res.status(200).json(users);
    }

    return res.status(404).json({ Message: "User not found." });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

exports.friendshipRequest = async (req, res, next) => {
  const { requesterLogin, recipientUserName } = req.body;

  try {
    const requester = await User.findOne({ login: requesterLogin });
    const recipient = await User.findOne({ userName: recipientUserName });

    if (!receiver) {
      const error = new Error("User not found.");
      error.statusCode = 404;
      throw error;
    }

    const friendship = await Friendship.findOne({ requester, recipient });

    if (!friendship) {
      await Friendship.create({ requester, recipient, status: 2 });
      return res.status(200).json({ Message: "Friend request was sent." });
    }

    if (friendship.status == 1) {
      friendship.status = 2;
      await friendship.save();
      return res.status(200).json({ Message: "Friend request was sent." });
    }

    if (friendship.status == 2) {
      return res.status(403).json({ Message: "Friend request pending." });
    }

    if (friendship.status == 3) {
      return res
        .status(403)
        .json({ Message: "The users are already friends." });
    }
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

exports.friendshipResponse = async (req, res, next) => {
  const recipientId = req.query.recipientId;
  const requesterId = req.query.requesterId;
  const accepted = req.query.accepted;

  try {
    const requester = await User.findById({ requesterId });
    const recipient = await User.findById({ recipientId });

    if (!receiver || !recipient) {
      const error = new Error("User (s) not found.");
      error.statusCode = 404;
      throw error;
    }

    const friendship = await Friendship.findOne({ requester, recipient });

    if (!!friendship && accepted) {
      await Friendship.findOneAndUpdate(
        { requester, recipient },
        {
          $set: { status: 3 },
        }
      );
      return res.status(200).json({ Message: "Friend added." });
    }

    await Friendship.findOneAndUpdate(
      { requester, recipient },
      {
        $set: { status: 1 },
      }
    );
    return res.status(200).json({ Message: "Friend added." });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};
