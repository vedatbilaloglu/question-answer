const express = require("express");
const dotenv = require("dotenv");
const connectDatabase = require("./helpers/database/connectDatabase");
const routers = require("./routers");
const customErrorHandler = require("./middlewares/errors/customErrorHandler");
// Environment Variables
dotenv.config({
    path: "./config/env/config.env",
});

//MongoDB Connection

connectDatabase();

const app = express();

const PORT = 5000 || process.env.PORT;

// Routers Middleware
app.use("/api",routers);

app.use(customErrorHandler);

app.listen(PORT,() => {
    console.log("Server Started " + process.env.PORT + process.env.NODE_ENV);
});