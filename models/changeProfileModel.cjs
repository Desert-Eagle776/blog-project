const connection = require('../config/mysql.cjs');

module.exports = {
    updateAvatar: async (avatar, currentUser) => {
        const sqlUpdateAvatar = "UPDATE users SET avatar=? WHERE id=?";
        const [rowsAvatar, fieldsAvatar] = await connection.execute(sqlUpdateAvatar, [avatar.originalname, currentUser]);

        return rowsAvatar;
    },
    updateName: async (name, currentUser) => {
        const sqlUpdateName = "UPDATE users SET name=? WHERE id=?";
        const [rowsName, fieldsName] = await connection.execute(sqlUpdateName, [name, currentUser]);

        return rowsName;
    },
    updateNameAndAvatar: async (name, avatar, currentUser) => {
        const sqlUpdateData = "UPDATE users SET name=?, avatar=? WHERE id=?";
        const [rowsData, fields] = await connection.execute(sqlUpdateData, [name, avatar.originalname, currentUser]);

        return rowsData;
    },
}