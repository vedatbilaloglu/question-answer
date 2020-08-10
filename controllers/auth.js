const User = require("../models/User");
const customError = require("../helpers/error/CustomError");
const asyncErrorWrapper = require("express-async-handler");
const {sendJwtToClient} = require("../helpers/authorization/tokenHelpers");
const {validateUserInput, comparePassword} = require("../helpers/input/inputHelpers");
const CustomError = require("../helpers/error/CustomError");
const sendEmail = require("../helpers/libraries/sendEmail");

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

    const {NODE_ENV} = process.env;

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

const imageUpload = asyncErrorWrapper(async (req,res,next) => {

const user = await User.findByIdAndUpdate(req.user.id,{
    "profile_image" : req.savedProfileImage
},{
    new: true,
    runValidators: true
});

    res.status(200).json({
        success: true,
        message: "Image upload successfully",
        data: user
    })

});

// Forgot Password

const forgotPassword = asyncErrorWrapper(async (req,res,next) => {

    const resetEmail = req.body.email;
    const user = await User.findOne({email : resetEmail});

    if(!user){
        return next(new CustomError("There is no user with that email",400));
    }

    const resetPasswordToken = user.getResetPasswordTokenFromUser();
    
    await user.save();

    const resetPasswordUrl = `http://localhost:5000/api/auth/resetpassword?resetPasswordToken=${resetPasswordToken}`;

    const emailTemplate = `
    <h3>Reset Your Password</h3>
    <p> This <a href= '${resetPasswordUrl}' target = '_blank'> link </p>
    `;

    
    try{
        await sendEmail({
            from: process.env.SMTP_USER,
            to: resetEmail,
            subject: "Reset Your Password",
            html: emailTemplate
        });
        return res.status(200).json({
            success: true,
            message: "Token send to your email"
        });
    }
    catch(err){
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined

        await user.save();

        return next(new CustomError("Email could not be sent", 500));
    }
});

const resetPassword = asyncErrorWrapper(async (req,res,next) => {

    const {resetPasswordToken} = req.query;
    const {password} = req.body;

    if(!resetPasswordToken){
        return next(new CustomError("Please provide a valid token"));
    }
    
    let user = await User.findOne({
        resetPasswordToken : resetPasswordToken,
        resetPasswordExpire : {$gt : Date.now()} // Süresi dolmadıysa buradaki işlemi gerçekleştir.
    });
    
    if(!user){
        return next(new CustomError("Please check your password"));
    }
    
    user.password = password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    return res.status(200).json({
        success: true,
        message: "Successful"
    });
});

module.exports = {
    register,
    login,
    logout,
    imageUpload,
    forgotPassword,
    resetPassword,
    getUser
}
