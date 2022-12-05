const models = require('../models/changedCommentModel.cjs');

module.exports = {
    changedCommentPost: async (req, res) => {
        const comment = req.body.changeComment;
        const commentId = req.body.comment_id;
        const post_id = req.body.post_id;
        const redirect = req.body.redirect;

        const updateComment = await models.updateComment(comment, commentId);

        res.redirect(redirect);
    },
}