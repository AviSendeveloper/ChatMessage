const { body } = require("express-validator");
const User = require("../Models/User");

module.exports = [
    body("name", "Shuld not be empty").trim().notEmpty().isString(),
    body("email", "Invalid email type")
        .trim()
        .isEmail()
        .normalizeEmail()
        .custom(async (email) => {
            const userExist = await User.findOne({ email: email });
            if (userExist) throw new Error(`${email} already registered`);
            return true;
        }),
    body("password", "password should be atlease 6 charecter long")
        .trim()
        .isString()
        .isLength({ min: 6 }),
    body("confirmPassword", "confirm password does not matched").custom(
        (cPass, { req }) => {
            if (cPass !== req.body.password) {
                return false;
            }
            return true;
        }
    ),
];
