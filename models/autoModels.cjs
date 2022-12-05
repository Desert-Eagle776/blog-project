const connection = require('../config/mysql.cjs');

module.exports = {
    userVerification: async (name, password) => {
        const userVerification = 'SELECT id, name, password FROM users WHERE name=? AND password=?';
        const [rowsVerification, fieldsVerification] = await connection.execute(userVerification, [name, password]);

        return rowsVerification;
    },
    addingInAuth: async (userId, token) => {
        const sqlAuth = 'INSERT INTO auth (users_id, token) VALUES (?, ?)';
        const [rowsAuth, fieldsAuth] = await connection.execute(sqlAuth, [userId, token]);

        return rowsAuth;
    },
}