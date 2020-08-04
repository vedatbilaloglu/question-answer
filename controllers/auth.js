const User = require("../models/User");
const customError = require("../helpers/error/CustomError");
const asyncErrorWrapper = require("express-async-handler");

const register = asyncErrorWrapper(async (req,res,next) => {
    const name = "Dilay";
    const email = "dilay";
    const password = "1234";
    // async await
   
        const user = await User.create({
            name,
            email,
            password
        });
    
        res.status(200).json({
            success: true,
            data: user
        });
  
});

const errorTest = (req,res,next) => {
    // Some Code
    return next(new TypeError("Type Error Message"));

};

module.exports = {
    register,
    errorTest
}
