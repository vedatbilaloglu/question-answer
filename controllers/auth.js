const User = require("../models/User");
const customError = require("../helpers/error/CustomError");
const asyncErrorWrapper = require("express-async-handler");

const register = asyncErrorWrapper(async (req,res,next) => { // asyncErrorWrapper ile try catch yazmaya gerek kalmadan işlemleri yürütebiliriz.
    
    console.log(req.body);
    
    const {name, email, password} = req.body;
        const user = await User.create({  // Database'e kullanıcı eklemek için kullaniyorum.
            name,
            email,
            password
        });
    
        res.status(200).json({
            success: true,
            data: user
        }); 
});

const errorTest = (req,res,next) => {  // Örnek olarak Test verisi oluşturup çalışıp çalışmadığını kontrol ettim.
    // Some Code
    return next(new TypeError("Type Error Message"));

};

module.exports = {
    register,
    errorTest
}
