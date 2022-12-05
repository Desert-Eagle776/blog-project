const connection = require('../config/mysql.cjs');

module.exports = {
    selectAuthToken: async (token) => {
        const sql = 'SELECT users_id, token FROM auth WHERE token=?';
        const [rows, fields] = await connection.execute(sql, [token]);

        return rows;
    },
    userOutputByToken: async (token) => {
        const sqlUsers = 'SELECT id, name, email FROM users WHERE token=?';
        const [rowsTwo, fieldsTwo] = await connection.execute(sqlUsers, [token]);

        return rowsTwo;
    }
}