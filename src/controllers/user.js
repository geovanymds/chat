const User = require('../models/User');

exports.signup = async (req, res, next) => {

  const { login, userName, email, password, likes} = req.body;

  try {

    let user = await User.findOne({email});

    if(!!user) {
      const error = new Error('Usuário já cadastrado.');
      throw error;
    }

    user = await User.create({login, userName, email, password, likes});

    return (res.status(201).json({ Message: 'Usuário cadastrado com sucesso.'}));


  } catch (error) {

    if(!error.statusCode) {
      res.statusCode = 500;
      next(error);
    }

  }
  

}