// Require the article model
const mongoose = require("mongoose")
const Article = require('../models/article');
const getAllArticles = async (req, res) => {

    // Get all published articles from database
    const articles = await Article.find({})

    // Error message, if there are no published blogs
    if (!articles.length) {
        return res.json({
            status: "failed",
            message: "There are no published articles"
        })
    }


    // Return published articles
    res.status(200).json({
        status: "success",
        message: "All published articles",
        data: articles
    })

}

const getArticle = async (req, res) => {
    // Get article from database with Id
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return res.status(400).send("Invalid id")
    }
    const article = await Article.findById(req.params.id).exec()

    // Throw error message if article is not found
    if (!article) {
        return res.status(404).send("The Article you requested was not found")
    }

    // Return data
    res.status(200).json({
        status: "success",
        message: `Single article post: "${article.title}"`,
        data: {
            article
        }
    })
}
const createArticle = async (req, res) => {

    try {
        // Get details from the request body
        const { title, description, body } = req.body;

        // Check if article with that title exists
        const exists = await Article.findOne({ title })
        if (exists) {
            return res.json({
                status: "failed",
                message: "Article with that title already exists"
            })
        }


        // Name of user is set to author of article
        const article = new Article({
            title,
            description,
            body,
        })

        await article.save()

        // Return article data
        return res.json({
            status: "success",
            message: ` Created Article: "${article.title}"`,
            data: article
        });
    }
    catch (err) {
        res.status(500).send(err.message)
    }
}

const deleteArticle = async (req, res) => {
    // validate id
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return res.status(400).send("Invalid id")
    }

    // Get article from database
    const article = await Article.findById(req.params.id).exec()
    if (!article)
    {
        return res.status(404).json({status: "failed", message:"Not found"})
    }

    await Article.findByIdAndDelete(req.params.id).exec()

    // Return success message
    res.json({
        status: "success",
        message: `Article  was deleted`,
    })
}

const updateArticle = async (req, res) => {
    // Get details from request body
    const { title, description, body } = req.body;
    // validate id
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return res.status(400).send("Invalid id")
    }

    // Get article from database
    const article = await Article.findById(req.params.id)
    if (!article)
    {
        return res.status(404).json({status: "failed", message:"Not found"})
    }


    // Update article
    const updatedArticle = await Article.findByIdAndUpdate({ _id: req.params.id }, {
        $set: {
            title,
            description,
            body
        }
    }, { new: true , runValidators:true})

    // Return updated article
    res.status(200).json({
        status: "success",
        message: `${updatedArticle.title} was updated`,
        data: {
            updatedArticle
        }
    })
}

module.exports = {
    getAllArticles,
    getArticle,
    createArticle,
    updateArticle,
    deleteArticle
}