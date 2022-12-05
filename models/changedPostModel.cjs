const connection = require('../config/mysql.cjs');

module.exports = {
    sqlOutputArticle: async (postId) => {
        const sqlData = 'SELECT id, header, text FROM articles WHERE id=?';
        const [rows, fields] = await connection.execute(sqlData, [postId]);

        return rows;
    },
    sqlOutputFiles: async (postId) => {
        const sqlFile = 'SELECT filename FROM file WHERE post_id=?';
        const [rowsFile, fieldsFile] = await connection.execute(sqlFile, [postId]);

        return rowsFile;
    },
    updateSqlData: async (header, text, postId) => {
        const updateSqlData = 'UPDATE articles SET header=?, text=? WHERE id=?';
        const [rowsUpdate, fieldsUpdate] = await connection.execute(updateSqlData, [header, text, postId]);

        return rowsUpdate;
    },
    updateSqlFile: async (filename, postId) => {
        const updateSqlFile = 'UPDATE file SET filename=? WHERE post_id=?';
        const [rowsUpdateFile, fieldsUpdateFile] = await connection.execute(updateSqlFile, [filename.originalname, postId]);

        return rowsUpdateFile;
    },
}