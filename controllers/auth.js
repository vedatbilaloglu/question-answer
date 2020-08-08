const User = require("../models/User");
const customError = require("../helpers/error/CustomError");
const asyncErrorWrapper = require("express-async-handler");
const {sendJwtToClient} = require("../helpers/authorization/tokenHelpers");

const register = asyncErrorWrapper(async (req,res,next) => { // asyncErrorWrapper ile try catch yazmaya gerek kalmadan işlemleri yürütebiliriz.
    
    console.log(req.body);
    
    const {name, email, password} = req.body;

        const user = await User.create({  // Database'e kullanıcı eklemek için kullaniyorum.
            name,
            email,
            password
        });
        sendJwtToClient(user, res);
    });

const tokentest = (req,res,next) => {
    res.json({
        success: true,
        message: "Welcome"
    });
};

module.exports = {
    register,
    tokentest
}
