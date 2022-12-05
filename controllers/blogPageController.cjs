const models = require('../models/blogPageModel.cjs');
const moment = require('moment/moment.js');
const getCurrentUserId = require('../src/currentUser.cjs');

module.exports = {
    blogPageGet: async (req, res) => {
        const currentUser = await getCurrentUserId(req.cookies);
        const post_id = req.query.post;
        const numberPage = req.query.page;

        const outputArticleById = await models.outputArticleById(post_id);
        const update_date = new Date(outputArticleById[0].update_date).toLocaleDateString()
        const date = new Date(outputArticleById[0].date).toLocaleDateString();

        const sqlUserData = await models.sqlUserData(outputArticleById[0].users_id);
        const outputFile = await models.outputFile(post_id);
        const sqlCountComments = await models.sqlCountComments(post_id);

        const limit = 3;
        const count = sqlCountComments[0].count;
        const page = Math.ceil(count / limit);
        const offset = numberPage * limit;

        const outputComments = await models.outputComments(limit, offset, post_id);

        let postId;
        if (outputComments != 0) postId = outputComments[0].post_id;

        for (let i = 0; i < outputComments.length; i++) {
            const sqlUserData = await models.sqlUserData(outputComments[i].user_id);

            outputComments['user'] = sqlUserData;
        };

        let comparisonCommentUserId = 0;

        for (let i = 0; i < outputComments.length; i++) {
            const date = moment(outputComments[i].date).format("HH:mm DD.MM.YYYY");
            outputComments[i].date = date;

            if (currentUser === outputComments[i].user_id) {
                comparisonCommentUserId = true;
                outputComments[i].comparison = comparisonCommentUserId;
            } else {
                outputComments[i].comparison = false;
            };
        };

        const sqlUserAvatar = await models.sqlUserAvatar(currentUser);
        const outputReaction = await models.outputReaction(post_id);

        if (outputArticleById[0].update_date != null) {
            outputArticleById[0].update_date = update_date;
        }

        if (outputArticleById[0].date != null) {
            outputArticleById[0].date = date;
        }

        const comparisonUsersId = currentUser === outputArticleById[0].users_id;
        outputArticleById.comparison = comparisonUsersId;

        res.render('./partials/blog_page.hbs', {
            title: 'Страница блога',
            article: outputArticleById,
            files: outputFile,
            author: sqlUserData,
            comparison: comparisonUsersId,
            comments: outputComments,
            avatar: sqlUserAvatar,
            pages: page,
            postId: postId,
            reaction: outputReaction,
        });
    },
}