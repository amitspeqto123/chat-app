const express = require('express')
const app = express();
const userRoute = require("./routes/user.route");
const chatRoute = require("./routes/chat.route");



// middleware
app.use(express.json())

// routes
app.use("/user", userRoute);
app.use("/chats", chatRoute);

module.exports = app;