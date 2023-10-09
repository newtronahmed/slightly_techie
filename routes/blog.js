const express = require('express')
const blogController = require('../controllers/blogController');

const blogRouter = express.Router();

blogRouter.get('/', blogController.getAllArticles); 

blogRouter.get('/:id', blogController.getArticle); 

blogRouter.post('/', blogController.createArticle); 

blogRouter.delete('/:id',blogController.deleteArticle); 

blogRouter.patch('/:id', blogController.updateArticle); 

module.exports = blogRouter;