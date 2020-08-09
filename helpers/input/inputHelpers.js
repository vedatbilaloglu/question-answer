const bycrpt = require("bcryptjs");

const validateUserInput = (email, password) => {
    return email && password;
};

const comparePassword = (password, hashedPassword) => {
    //bycrpt senkron
   return bycrpt.compareSync(password, hashedPassword); // Eşleşirse true, eşleşmezse false olarak dönücek.
}

module.exports = {
    validateUserInput,
    comparePassword
};