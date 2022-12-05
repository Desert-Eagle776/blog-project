const connection = require('../config/mysql.cjs');

module.exports = {
    articlesCurrentUser: async (currentUser) => {
        const sql = 'SELECT id, header, date FROM articles WHERE users_id=?';
        const [rows, fields] = await connection.execute(sql, [currentUser]);

        return rows;
    },
}