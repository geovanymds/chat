const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const secret = require("../../config/jwt");

exports.signup = async (req, res, next) => {
  const { login, userName, email, password, likes } = req.body;

  try {
    let user = await User.findOne({ email });

    if (!!user) {
      const error = new Error("Usuário já cadastrado.");
      throw error;
    }

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
      .json({ Message: "Usuário cadastrado com sucesso.", userName, token });
  } catch (error) {
    if (!error.statusCode) {
      res.statusCode = 500;
      next(error);
    }
  }
};

exports.login = async (req, res, next) => {
  const { login, password } = req.body;

  try {

    let user = await User.findOne({ login }).select("+password");
    const unhashedPass = await bcrypt.compare(password, user.password);

    if (!unhashedPass || !user) {
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

    return res
      .status(200)
      .json({
        Message: "User sucefully connected.",
        Usuário: user.userName,
        token,
      });
  } catch (error) {
    if (!error.statusCode) {
      res.statusCode = 500;
      next(error);
    }
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
      res.statusCode = 500;
      next(error);
    }
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
      res.statusCode = 500;
      next(error);
    }
  }
};