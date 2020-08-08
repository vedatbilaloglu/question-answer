// Custom Error Handler
const customError = require("../../helpers/error/CustomError");
const CustomError = require("../../helpers/error/CustomError");

const customErrorHandler = (err,req,res,next) => {
    let customError = err;
 

    if(err.name === "SyntaxError"){                              // Örnek olarak 2 tane if içerisinde 2 hatayı bu şekilde yakalayabiliriz.
        customError = new CustomError("Unexpected Syntax",400);
    }
    if(err.name === "ValidationError"){
        customError = new CustomError(err.message,400);
    }
    if(err.code === 11000){
        customError = new CustomError("Duplicate Key Found: Check Your Input", 400);
    }
    console.log(customError.message, customError.status);

    res.status(customError.status || 500) // Beklenmedik bir hatayla karşılaşırsak 500 döndürürüz.
    .json({        
        success: false,
        message: customError.message // Hata mesajını buradan alırız.
    });
};

module.exports = customErrorHandler;