const connection = require('../config/mysql.cjs')

module.exports = {
    articlesCount: async (currentUser) => {
        const sqlCount = 'SELECT COUNT(id) AS count FROM articles WHERE users_id NOT IN (SELECT users_id FROM articles WHERE users_id=?)';
        const [rows, fields] = await connection.execute(sqlCount, [currentUser]);

        return rows;
    },
    articlesOutput: async (limit, offset, currentUser) => {
        const sql = `SELECT id, header, SUBSTRING(text, 1, 500) AS changedString, date FROM articles WHERE users_id NOT IN (SELECT users_id FROM articles WHERE users_id=?) LIMIT ${limit} OFFSET ${offset}`;
        const [rows2, fields2] = await connection.execute(sql, [currentUser]);

        return rows2;
    },
}