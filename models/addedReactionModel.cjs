const connection = require('../config/mysql.cjs');

module.exports = {
    addedReaction: async (reaction, commentId, currentUser) => {
        const sqlAddedReaction = 'INSERT INTO reaction (emoji, comment_id, user_id) VALUES (?, ?, ?)';
        const [rowsReaction, fieldsReaction] = await connection.execute(sqlAddedReaction, [reaction, commentId, currentUser]);

        return rowsReaction;
    },
}