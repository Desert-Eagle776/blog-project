const models = require('../models/removePostModel.cjs');

module.exports = {
    removePostGet: async (req, res) => {
        const post_id = req.query.post;

        const sqlReceivingFile = await models.sqlReceivingFile(post_id);

        if (sqlReceivingFile != 0) {
            const sqlRemoveFile = await models.sqlRemoveFile(post_id);
            const sqlRemovePost = await models.sqlRemovePost(post_id);
        } else {
            const sqlRemovePost = await models.sqlRemovePost(post_id);
        }

        res.redirect('/my-posts');
    },
}