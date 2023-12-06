const BaseSQLModel = require('./base');

class AuthorModel extends BaseSQLModel {
    constructor() {
        super('author');
    }

    async findAll() {
        const authors = await super.findAll();
        return authors;
    }

    async findOne(id) {
        const author = await super.findById(id);
        return author;
    }

    async findAuthorWithArticles(authorId) {
        const author = await this.findOne(authorId);
        const articles = await this.executeQuery(
            `SELECT * FROM article WHERE author_id = ?`,
            [authorId]
        );
        author.articles = articles;
        return author;
    }
}

module.exports = AuthorModel;
