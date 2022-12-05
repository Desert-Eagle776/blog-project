const connection = require('../config/mysql.cjs');

module.exports = {
    updateComment: async (comment, commentId) => {
        const sqlUpdateComment = 'UPDATE comments SET comment=? WHERE id=?';
        const [rows, fields] = await connection.execute(sqlUpdateComment, [comment, commentId]);

        return rows;
    },
}