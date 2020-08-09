const express = require("express");
const dotenv = require("dotenv");
const connectDatabase = require("./helpers/database/connectDatabase");
const routers = require("./routers");
const customErrorHandler = require("./middlewares/errors/customErrorHandler");
const path = require("path");

// Environment Variables
dotenv.config({
    path: "./config/env/config.env",
});

//MongoDB Connection
connectDatabase();

const app = express();

// Express - Body Middleware
app.use(express.json()); // body parser paketini indirmek yerine express.js'in güncel versiyonunda bu komut ile aynı işlemi gerçekleştirebiliyoruz.

const PORT = 5000 || process.env.PORT;

// Routers Middleware
app.use("/api",routers);

app.use(customErrorHandler); // Custom Error Handler kullanmak için buradan haberleşir.

// Static Files
app.use(express.static(path.join(__dirname, "public")));

app.listen(PORT,() => {
    console.log("Server Started " + process.env.PORT + process.env.NODE_ENV);
});