const getCurrentUserId = require('../src/currentUser.cjs');
const myPostsModel = require('../models/myPostsModel.cjs');

module.exports = {
    myPostsGet: async (req, res) => {
        const currentUser = await getCurrentUserId(req.cookies);

        const articlesCurrentUser = await myPostsModel.articlesCurrentUser(currentUser);
        console.log(articlesCurrentUser);

        for (let i = 0; i < articlesCurrentUser.length; i++) {
            console.log(articlesCurrentUser[i].date)
            if (articlesCurrentUser[i].date != null) {
                const date = new Date(articlesCurrentUser[i].date).toLocaleDateString();
                articlesCurrentUser[i].date = date;
            }
        }

        res.render('./partials/my-posts.hbs', {
            title: 'Мои посты',
            articles: articlesCurrentUser
        })
    }
}