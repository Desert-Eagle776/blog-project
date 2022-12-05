const connection = require('../config/mysql.cjs');

module.exports = {
    userPresence: async (name, email) => {
        const userPresence = 'SELECT email, name FROM users WHERE name=? AND email=?';
        const [rowsPresence, fieldsPresence] = await connection.execute(userPresence, [name, email]);

        return rowsPresence;
    },
    addingNewUser: async (email, name, password, token, date) => {
        const sqlNewUser = "INSERT INTO users (email, name, password, token, date) VALUES (?, ?, ?, ?, ?)";
        const [rowsNewUser, fieldsNewUser] = await connection.execute(sqlNewUser, [email, name, password, token, date]);

        return rowsNewUser;
    },
}