const connection = require('../config/mysql.cjs');

module.exports = {
    outputArticleById: async (postId) => {
        const sqlArticleById = 'SELECT id, header, text, users_id, date, update_date FROM articles WHERE id=?';
        const [rows, fields] = await connection.execute(sqlArticleById, [postId]);

        return rows;
    },
    sqlUserData: async (userId) => {
        const sqlUser = 'SELECT email, name, avatar FROM users WHERE id=?';
        const [rowsUser, fieldsUser] = await connection.execute(sqlUser, [userId]);

        return rowsUser;
    },
    outputFile: async (postId) => {
        const sqlFile = 'SELECT filename, post_id FROM file WHERE post_id=?';
        const [rowsFile, fieldsFile] = await connection.execute(sqlFile, [postId]);

        return rowsFile;
    },
    sqlCountComments: async (postId) => {
        const sqlCountComments = 'SELECT COUNT(id) AS count FROM comments WHERE post_id=?';
        const [rowsCountComments, fieldsCountComments] = await connection.execute(sqlCountComments, [postId]);

        return rowsCountComments;
    },
    outputComments: async (limit, offset, postId) => {
        const sqlComments = `SELECT id, comment, post_id, user_id, date FROM comments WHERE post_id=? LIMIT ? OFFSET ?`;
        const [rowsComments, fieldsComments] = await connection.execute(sqlComments, [postId, limit, offset]);

        return rowsComments;
    },
    sqlUserData: async (userId) => {
        const sqlUserData = 'SELECT name, avatar FROM users WHERE id=?';
        const [rowsUserData, fieldsUserData] = await connection.execute(sqlUserData, [userId]);

        return rowsUserData;
    },
    sqlUserAvatar: async (currentUser) => {
        const sqlAvatarUser = 'SELECT avatar FROM users WHERE id=?';
        const [rowsAvatar, fieldsAvatar] = await connection.execute(sqlAvatarUser, [currentUser]);

        return rowsAvatar;
    },
    outputReaction: async (postId) => {
        const sqlReaction = 'SELECT COUNT(reaction.emoji) AS count, emoji.code, comments.id FROM emoji \
                            LEFT JOIN comments ON comments.post_id = ? \
                            LEFT JOIN reaction ON reaction.comment_id = comments.id AND reaction.emoji = emoji.code \
                            GROUP BY emoji.code, comments.id \
                            ORDER BY comments.id';
        const [rowsReaction, fieldsReaction] = await connection.execute(sqlReaction, [postId]);

        return rowsReaction;
    },
}