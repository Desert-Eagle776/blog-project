const connection = require('../config/mysql.cjs');

module.exports = {
    receivingUserData: async (currentUser) => {
        const receivingUserData = 'SELECT email, name, avatar, date FROM users WHERE id=?';
        const [rows, fields] = await connection.execute(receivingUserData, [currentUser]);

        return rows;
    },
}