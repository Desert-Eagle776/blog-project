const models = require('../models/profileModel.cjs');
const getCurrentUserId = require('../src/currentUser.cjs');

module.exports = {
    profileGet: async (req, res) => {
        const currentUser = await getCurrentUserId(req.cookies);
        const receivingUserData = await models.receivingUserData(currentUser);

        res.render('./partials/profile.hbs', {
            title: 'Профиль',
            info: receivingUserData,
        });
    },
}