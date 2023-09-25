module.exports = (req, res, next) => {
    console.log("is logged in", req.isLoggedIn);
    if (!req.isLoggedIn) {
        return res.redirect("back");
    }

    next();
};
