const models = require('../models/autoModels.cjs');
const generateString = require('../src/generateToken.cjs');

module.exports = {
    autoGet: async (req, res) => {
        res.render('./partials/auto.hbs', {
            title: 'Авторизация',
        })
    },
    autoPost: async (req, res) => {
        const name = req.body.name;
        const password = req.body.password;
        const token = generateString();

        const userVerification = await models.userVerification(name, password);

        console.log(userVerification)

        if (userVerification.length != 0) {
            const addingInAuth = await models.addingInAuth(userVerification[0].id, token);

            res.cookie('token', token)
            res.redirect('/home?page=0');
        } else {
            res.redirect('/auto');
        }
    },
}