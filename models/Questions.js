const mongoose = require("mongoose");
const slugify = require("slugify");
const Schema = mongoose.Schema;


const QuestionsSchema = new Schema({

    title: {
        type: String,
        required: [true, "Please provide a title"],
        minlength: [10, "Please provide a title at least 10 characters"],
        unique: true
    },
    content: {
        type: String,
        required: [true, "Please provide a content"],
        minlength: [20, "Please provide a title at least 10 characters"],
    },
    slug: String,
    createdAt: {
        type: Date,
        default: Date.now
    },
    user: {
        type: mongoose.Schema.ObjectId,
        required: true,
        ref: "User"
    },
    likes: [
        {
            type: mongoose.Schema.ObjectId,
            ref: "User"
        }
    ]
});

QuestionsSchema.pre("save", function(next){

    if(!this.isModified("title")){
        next(); // Title değişmediyse
    }

    this.slug = this.makeSlug();
    next();

});

QuestionsSchema.methods.makeSlug = function(){

    return slugify(this.title, {
        replacement: '-',  
        remove: /[*+~.()'"!:@]/g, 
        lower: true,    
      });

}

module.exports = mongoose.model("Question", QuestionsSchema);