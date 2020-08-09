const User = require("../models/User");
const customError = require("../helpers/error/CustomError");
const asyncErrorWrapper = require("express-async-handler");
const {sendJwtToClient} = require("../helpers/authorization/tokenHelpers");
const {validateUserInput, comparePassword} = require("../helpers/input/inputHelpers");
const CustomError = require("../helpers/error/CustomError");

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

const login = asyncErrorWrapper(async (req,res,next) => { // asyncErrorWrapper ile try catch yazmaya gerek kalmadan işlemleri yürütebiliriz.
    
    const {email, password} = req.body;
    console.log(email, password);
    if(!validateUserInput(email,password)){
        return next(new CustomError("Please check your input area"));
    }

    const user = await User.findOne({email}).select("+password"); // Veritabanında password select false yaptım. Bu yüzden burada password gelsin dedim.
    
    if(!comparePassword(password, user.password)){
        return next(new CustomError("Please check your credentials", 400));
    }

    sendJwtToClient(user, res);

    res.status(200)
    .json({
        success: true,
    });    
});

const getUser = (req,res,next) => {
    res.json({
        success: true,
        data: {
            id : req.user.id,
            name : req.user.name
        }
    });
};

const logout = asyncErrorWrapper(async (req,res,next) => {

    const {JWT_COOKIE_EXPIRE, NODE_ENV} = process.env;

    return res.status(200)
    .cookie({
       httpOnly: true,
       expires: new Date(Date.now()),
       secure: NODE_ENV === "development" ? false : true
    }).json({
        success: true,
        message: "Logout Succesfully",
    });

});

module.exports = {
    register,
    login,
    logout,
    getUser
}
