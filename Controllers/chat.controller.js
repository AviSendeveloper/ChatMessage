const User = require("../Models/User");

module.exports.chatPage = async (req, res) => {
    const users = await User.find({ _id: { $ne: req.user._id } });
    return res.render("chat", {
        user: req.user,
        userList: users,
    });
};
