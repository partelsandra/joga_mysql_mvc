const BaseSQLModel = require('./base');

// Create a new class for a specific table
class ArticleModel extends BaseSQLModel {
    constructor() {
        super('article');
    }

    async findAll() {
        const articles = await super.findAll()
        return articles
    }

    async findOne(slug) {
        const article = await super.findOne('slug', slug)
        return article
    }
}
module.exports = ArticleModel