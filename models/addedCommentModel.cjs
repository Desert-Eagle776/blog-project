const connection = require('../config/mysql.cjs');

module.exports = {
    addingComments: async (comment, postId, currentUser) => {
        const sqlAddingComments = 'INSERT INTO comments (comment, post_id, user_id) VALUES (?, ?, ?)';
        const [rowsAdding, fieldsAdding] = await connection.execute(sqlAddingComments, [comment, postId, currentUser]);

        return rowsAdding;
    },
}