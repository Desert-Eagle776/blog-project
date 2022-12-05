const models = require('../models/changedPostModel.cjs');
const getCurrentUserId = require('../src/currentUser.cjs');
const fs = require('fs');

module.exports = {
    changedPostGet: async (req, res) => {
        const post_id = req.query.post;
        console.log(post_id);

        const sqlOutputArticle = await models.sqlOutputArticle(post_id);
        const sqlOutputFiles = await models.sqlOutputFiles(post_id);

        res.render('./partials/changed_post.hbs', {
            post: sqlOutputArticle,
            files: sqlOutputFiles,
        })
    },
    changedPostPost: async (req, res) => {
        const currentUser = await getCurrentUserId(req.cookies);
        const { header, text, postId } = req.body;
        const filename = req.file;

        const updateSqlData = await models.updateSqlData(header, text, postId);

        if (filename) {
            const updateSqlFile = await models.updateSqlFile(filename, postId);

            fs.copyFile(filename.path, './public/file/' + filename.originalname, (err) => {
                if (err) throw err;
                console.log('source.txt was copied to destination.txt');
            });
        }

        res.redirect(`/blog_page?post=${postId}&page=0`);
    },
}