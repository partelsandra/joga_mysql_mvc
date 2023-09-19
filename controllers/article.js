const Article = require('../models/article.model.js')

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

// export controller functions
module.exports = {
    getAllArticles,
    getArticleBySlug,
    createNewArticle,
    showNewArticleForm
};