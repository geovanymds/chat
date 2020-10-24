const { body } = require("express-validator");
const User = require("../models/User");

module.exports = [
  body("login")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Can't be empty")
    .custom((value, { req }) => {
      return User.findOne({ where: { login: value } }).then((user) => {
        if (user) {
          return Promise.reject("This login is already in use");
        }
      });
    }),
  body("email")
    .isEmail()
    .withMessage("Use a valid e-mail.")
    .custom((value, { req }) => {
      return User.findOne({ where: { email: value } }).then((useer) => {
        if (user) {
          return Promise.reject("This email is already in use");
        }
      });
    })
    .normalizeEmail(),
  body("password")
    .trim()
    .isLength({ min: 6 })
    .withMessage("The password must have least 6 characters."),
  body("userName").trim().not().isEmpty().withMessage("Can't be empty"),
];
