const models = require('../models/addedReactionModel.cjs');
const getCurrentUserId = require('../src/currentUser.cjs');

module.exports = {
    addedReactionPost: async (req, res) => {
        const commentId = req.body.commentId;
        const reaction = req.body.reaction;
        const redirect = req.body.redirect;
        const currentUser = await getCurrentUserId(req.cookies);

        const addedReaction = await models.addedReaction(reaction, commentId, currentUser);

        res.redirect(`${redirect}`);
    },
}