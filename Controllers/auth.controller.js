const User = require("../Models/User");
const bcrypt = require("bcrypt");

const BCRYPT_SALT = 5;

// Login
module.exports.loginPage = async (req, res) => {
    return res.render("login");
};

module.exports.login = async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email: email });
    if (!user) {
        return req.render("login", {
            error: "Email not found",
        });
    }

    const isPasswordMatched = await bcrypt.compare(password, user.password);
    if (!isPasswordMatched) {
        return req.render("login", {
            error: "Invalid email or password",
        });
    }

    req.session.isLoggedIn = true;
    req.session.user = user;

    return res.redirect("/chat");
};

// Register
module.exports.registerPage = async (req, res) => {
    return res.render("register");
};

module.exports.register = async (req, res) => {
    const { name, email, password } = req.body;

    const hashPassword = await bcrypt.hash(password, BCRYPT_SALT);

    const result = await User.create({
        name: name,
        email: email,
        password: hashPassword,
    });

    return res.redirect("/");
};

module.exports.logout = async (req, res) => {
    await req.session.destroy();
    return res.redirect("/");
};
