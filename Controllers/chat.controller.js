const User = require("../Models/User");

module.exports.chatPage = async (req, res) => {
    const users = await User.find({});
    return res.render("chat", {
        users: users,
    });
};
