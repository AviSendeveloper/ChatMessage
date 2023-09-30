const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const routes = require("./Routes");
const session = require("express-session");
const mongoDBSessionStore = require("connect-mongodb-session")(session);
const flash = require("connect-flash");
require("dotenv").config();
const DbConnection = require("./Util/dbConnection");
const User = require("./Models/User");

const app = express();
const server = http.createServer(app);

const sessionStore = new mongoDBSessionStore({
    uri: process.env.DB_URL || "mongodb://localhost:27017/ChatMassanger",
    collection: "sessions",
});

// =============== Socket =================
const io = new Server(server);

// Online namespace
const userOnlineIo = io.of("/users-online");

userOnlineIo.on("connection", async (socket) => {
    const connectedUserId = socket.handshake.auth.userId;

    await User.findByIdAndUpdate(connectedUserId, {
        isOnline: true,
    });

    socket.broadcast.emit("connection-update", {
        connectedUserId: connectedUserId,
    });

    socket.on("disconnect", async () => {
        await User.findByIdAndUpdate(connectedUserId, {
            isOnline: false,
        });

        socket.broadcast.emit("disconnection-update", {
            disconnectedUserId: connectedUserId,
        });
    });
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
        server.listen(PORT, () => console.log(`app running at ${PORT}`));
    } catch (error) {
        console.log(`Something went wrong: ${error}`);
    }
})();
