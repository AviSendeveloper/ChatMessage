const express = require("express");
const routes = require("./Routes");
const session = require("express-session");
const mongoDBSessionStore = require("connect-mongodb-session")(session);
const flash = require("connect-flash");
require("dotenv").config();
const DbConnection = require("./Util/dbConnection");

const app = express();
const sessionStore = new mongoDBSessionStore({
    uri: process.env.DB_URL || "mongodb://localhost:27017/ChatMassanger",
    collection: "sessions",
});

// =============== Setting ================
app.set("view engine", "ejs");
app.set("views", "Views");

// ============== Middleware ===============
app.use(express.static("Public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
    session({
        secret: process.env.SESSION_SECRET || "secret",
        saveUninitialized: false,
        resave: false,
        store: sessionStore,
    })
);
app.use((req, res, next) => {
    if (req.session.isLoggedIn) {
        req.isLoggedIn = req.session.isLoggedIn;
        req.user = req.session.user;
    }
    next();
});
app.use(flash());

// =============== Routes =================
app.use(routes);

// =============== Connection ===================
const PORT = process.env.PORT || 3000;
(async () => {
    try {
        const connection = await DbConnection();
        console.log(`DB connection url: ${connection}`);
        app.listen(PORT, () => console.log(`app running at ${PORT}`));
    } catch (error) {
        console.log(`Something went wrong: ${error}`);
    }
})();
