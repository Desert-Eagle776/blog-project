const models = require('../models/addedCommentModel.cjs');
const getCurrentUserId = require('../src/currentUser.cjs');

module.exports = {
    addedCommentGet: async (req, res) => {
        console.log(req.body);
        const post_id = req.body.post_id;
        const comment = req.body.comment;
        const currentUser = await getCurrentUserId(req.cookies);

        const addingComments = await models.addingComments(comment, post_id, currentUser);

        res.redirect(`/blog_page?post=${post_id}&page=0`);
    },
}