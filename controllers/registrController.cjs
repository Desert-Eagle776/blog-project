const models = require('../models/registrModels.cjs');
const generateString = require('../src/generateToken.cjs');

module.exports = {
    registrGet: async (req, res) => {
        res.render('./partials/registr.hbs', {
            title: 'Регистрация'
        });
    },
    registrPost: async (req, res) => {
        const email = req.body.email;
        const name = req.body.name;
        const password = req.body.password;
        const token = generateString();
        const date = new Date().toLocaleDateString();

        const userPresence = await models.userPresence(email, name);

        if (userPresence.length != 0) {
            res.redirect('/')
        } else {
            const addingNewUser = await models.addingNewUser(email, name, password, token, date);

            if (Object.keys(addingNewUser) != 0) {
                console.log('Успішно!', token);
                res.cookie('token', token);
                res.redirect('/home?page=0');
            }
        }
    },
}