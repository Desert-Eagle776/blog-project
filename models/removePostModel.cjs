const connection = require('../config/mysql.cjs');

module.exports = {
    sqlReceivingFile: async (postId) => {
        const sqlReceivingFile = 'SELECT id, filename FROM file WHERE post_id=?';
        const [rowsFile, fieldsFile] = await connection.execute(sqlReceivingFile, [postId]);

        return rowsFile;
    },
    sqlRemoveFile: async (postId) => {
        const sqlRemoveFile = 'DELETE FROM file WHERE post_id=?';
        const [rows, fields] = await connection.execute(sqlRemoveFile, [postId]);
    },
    sqlRemovePost: async (postId) => {
        const sqlRemovePost = 'DELETE FROM articles WHERE id=?';
        const [rowsArticles, fieldsArticles] = await connection.execute(sqlRemovePost, [postId]);

        return rowsArticles;
    },
}