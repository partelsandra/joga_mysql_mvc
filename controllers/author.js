// import database connection
const Author = require('../models/author.model')
const authorDbModel = require('../models/author')
const articleDbModel = require('../models/article')

const authorModel = new authorDbModel();
const articleModel = new articleDbModel();

class authorController {
    constructor() {
        const authors = []
    }

    async getAuthorById(req,res){
        const author = await authorModel.findById(req.params.id)
        const articles = await articleModel.findMany(author)
        author['articles'] = articles
        res.status(201).json({author: author})
    }
}

// show author articles
const getAuthorArticles = (req, res) => {
    Author.getName(req.params.author_id,(err, author, articles) => {
        if (err) {
            res.status(500).send({
                message :err.message || 'Some error occurred retrieving author data'
            })
        } else {
            console.log(author, articles)
            console.log('author', author)
            console.log('articles', articles)
            res.render('author', {
                articles: articles,
                author: author
            })
        }
    })
};
// export controller functions
module.exports = {
    getAuthorArticles,
    authorController
};