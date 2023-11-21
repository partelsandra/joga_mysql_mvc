const Article = require('../models/article.model.js')
//Kontrolleri täiendamine mudeliga lisad
const articleDbModel = require('../models/article')
const articleModel = new articleModel();

//Kontrolleri täiendamine mudeliga
class articleController {
    constructor() {
        const articles = []
    }

    async getAllArticles(req,res) {
        const articles = await articleModel.findAll()
        res.status(201).json({articles: articles})
    }

    async getArticleBySlug(req, res){
        const article = await articleModel.findOne(req.params.slug)
        res.status(201).json({article: article})
    }
}


// show all articles - index page
const getAllArticles = (req,res) => {
    Article.getAll((err,data) => {
        if (err) {
            res.status(500).send({
                message : err.message || 'Some error occurred retrieving articles data'
            })
        } else {
            console.log(data)
            res.render('index',{
                articles:data
            })
        }
    })
};

//show article by this slug
const getArticleBySlug = (req,res) => {
    Article.getBySlug(req.params.slug,(err,data)=>{
        if (err){
            res.status(500).send({
                message:err.message||'Some error occurred retrieving the data'
            })
        } else {
            console.log(data)
            res.render('article',{
                article:data
            });
        }
    });
};

// create new article
const createNewArticle = (req, res) => {
    // new article from POST data (example from form)
    console.log('new article')

    const newArticle = new Article({
        name: req.body.name,
        slug: req.body.name,
        image: req.body.image,
        body: req.body.body,
        published: new Date().toISOString().slice(0, 19).replace('T', ''),
        author_id: req.body.author_id
        }
    )

        Article.createNew(newArticle, (err, data) => {
            if (err){
                res.status(500).send({
                    message : err.message || 'Some error occurred sending article data'
                })
            } else {
                console.log(data)
                res.send(data)
            }
        })
};

//display article data
const showNewArticleForm = (req, res) => {
    res.render('create_article')
};

// Display the edit form for an article by ID
const editArticle = (req, res) => {
    const articleId = req.params.id;

    Article.showArticle(articleId, (err, article, authors) => {
        if (err) {
            // Handle the error appropriately
            return res.status(500).send('Error fetching article or author data');
        }

        // Render the edit form with article data and authors
        res.render('edit_article', { article, authors });
    });
};

// Update an article by ID
const updateArticle = (req, res) => {
    const articleId = req.params.id;
    const updatedArticleData = {
        name: req.body.name,
        slug: req.body.slug, // You may need to generate a unique slug here
        image: req.body.image,
        body: req.body.body,
        author_id: req.body.author_id,
        // ... (other article properties)
    };

    Article.editArticle(articleId, updatedArticleData, (err, updatedArticle) => {
        if (err) {
            // Handle the error appropriately
            return res.status(500).send('Error updating article data');
        }

        // Redirect to the article's page or another appropriate location
        res.redirect(`/article/${updatedArticle.slug}`);
    });
};

// export controller functions
module.exports = {
    getAllArticles,
    getArticleBySlug,
    createNewArticle,
    showNewArticleForm,
    editArticle,
    updateArticle,
    articleController
};