class CustomError extends Error {   // Error mesajlarini yakalamak için Error sınıfından extend ettim.
    constructor(message,status){
        super(message);
        this.status = status;
    }
}

module.exports = CustomError;