const connection = require('../config/mysql.cjs');

module.exports = {
    deleteComment: async (commentId) => {
        const sqlDeleteComment = 'DELETE FROM comments WHERE id=?';
        const [rowsDelete, fieldsDelete] = await connection.execute(sqlDeleteComment, [commentId]);

        return rowsDelete;
    },
}