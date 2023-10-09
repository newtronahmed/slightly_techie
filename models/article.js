// Require the mongoose package
const mongoose = require('mongoose');

// Instantiate the schema class from the mongoose package
const Schema = mongoose.Schema;

// Create an article schema with the mongoose schema
const articleSchema = new Schema({
    title: {
      type: String,
      required: [true, "Please provide the title"],
      unique: [true, "The title name already exists"],
    },
    description: {
      type: String,
    },
    body: {
      type: String,
      required: [true, "Please provide the body"],
    }
}, {timestamps: true});

// Create an article model with the user schema
const Article = mongoose.model('articles', articleSchema);

// Export the article model
module.exports = Article;