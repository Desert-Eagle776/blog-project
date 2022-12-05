const models = require('../models/removeCommentModel.cjs');

module.exports = {
    removeCommentPost: async (req, res) => {
        const commentId = req.body.comment_id;
        const redirect = req.body.redirect;

        const deleteComment = await models.deleteComment(commentId);

        res.redirect(`${redirect}`);
    },
}