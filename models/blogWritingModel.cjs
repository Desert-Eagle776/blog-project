const connection = require('../config/mysql.cjs');

module.exports = {
    sqlBlogWriting: async (header, text, users_id) => {
        const sqlBlogWriting = 'INSERT INTO articles (header, text, users_id) VALUES (?, ?, ?)';
        const [rows, fields] = await connection.execute(sqlBlogWriting, [header, text, users_id]);

        return rows;
    },
    sqlPostId: async (currentUser) => {
        const sqlPostId = 'SELECT id FROM articles WHERE users_id=?';
        const [rowsPostId, fieldsPostId] = await connection.execute(sqlPostId, [currentUser]);

        return rowsPostId;
    },
    sqlAddingFile: async (filename, postId) => {
        const sqlAddingFile = 'INSERT INTO file (filename, post_id) VALUES (?, ?)';
        const [rowsFile, fieldsFile] = await connection.execute(sqlAddingFile, [filename.originalname, postId.id]);

        return rowsFile;
    },
}