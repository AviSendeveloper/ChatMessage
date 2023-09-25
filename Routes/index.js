const Router = require("express").Router();
const AuthController = require("../Controllers/auth.controller.js");
const ChatController = require("../Controllers/chat.controller.js");
// Middleware
const isAuth = require("../Middleware/isAuth.midleware.js");
// validation
const validator = require("../Validator/validator.js");
const loginValidation = require("../Validator/login.validation.js");
const registerValidation = require("../Validator/register.validation.js");

// login
Router.get("/", AuthController.loginPage);
Router.post("/login", loginValidation, validator, AuthController.login);

// register
Router.get("/register", AuthController.registerPage);
Router.post(
    "/register",
    registerValidation,
    validator,
    AuthController.register
);

// Logout
Router.get("/logout", AuthController.logout);

// Chat
Router.get("/chat", isAuth, ChatController.chatPage);

module.exports = Router;
