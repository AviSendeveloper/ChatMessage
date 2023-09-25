const { body } = require("express-validator");
const User = require("../Models/User");

const roles = ["admin", "creator", "student", "parent"];

module.exports = [
    body("email", "Invalid email type")
        .trim()
        .isEmail()
        .normalizeEmail()
        .custom(async (email) => {
            const userExist = await User.findOne({ email: email });
            if (!userExist) throw new Error(`${email} not found`);
            return true;
        }),
    body("password", "password should be atlease 6 charecter long")
        .trim()
        .isString()
        .isLength({ min: 6 }),
];
