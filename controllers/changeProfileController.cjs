const models = require('../models/changeProfileModel.cjs');
const fs = require('fs');
const getCurrentUserId = require('../src/currentUser.cjs');

module.exports = {
    profileGet: async (req, res) => {
        const name = req.body.name;
        const avatar = req.file;
        const currentUser = await getCurrentUserId(req.cookies);

        if (name === 0) {
            const updateAvatar = await models.updateAvatar(avatar, currentUser);

            fs.copyFile(avatar.path, './public/file/avatar/' + avatar.originalname, (err) => {
                if (err) throw err;
                console.log('source.txt was copied to destination.txt');
            });

            res.redirect('/profile');
        } else if (avatar === undefined) {
            const updateName = await models.updateName(name, currentUser);

            res.redirect('/profile');
        } else if (name, avatar) {
            const updateNameAndAvatar = await models.updateNameAndAvatar(name, avatar, currentUser);

            fs.copyFile(avatar.path, './public/file/avatar/' + avatar.originalname, (err) => {
                if (err) throw err;
                console.log('source.txt was copied to destination.txt');
            });

            res.redirect('/profile');
        } else if (name && avatar === undefined) {
            res.redirect('/profile');
        }
    },
}