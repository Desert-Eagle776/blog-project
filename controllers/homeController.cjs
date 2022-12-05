const homeModel = require('../models/homeModel.cjs');
const getCurrentUserId = require('../src/currentUser.cjs');

module.exports = {
    homeGet: async (req, res) => {
        const currentUser = await getCurrentUserId(req.cookies);
        console.log('Cookies:', currentUser)

        const sqlCount = await homeModel.articlesCount(currentUser);
        console.log(sqlCount, 'kskoksko')

        const queryPage = req.query.page;
        console.log('QUERY PAGE - ', queryPage)

        const limit = 5;
        let count = sqlCount[0].count;
        console.log(count)

        let page = Math.ceil(count / limit);
        let offset = queryPage * limit;

        console.log(queryPage)
        console.log(offset)

        const sqlArticlesOutput = await homeModel.articlesOutput(limit, offset, currentUser);
        console.log(sqlArticlesOutput, 'dodik');


        for (let i = 0; i < sqlArticlesOutput.length; i++) {
            console.log(sqlArticlesOutput[i].date)
            if (sqlArticlesOutput[i].date != null) {
                let date = new Date(sqlArticlesOutput[i].date).toLocaleDateString();
                sqlArticlesOutput[i].date = date;
            }
        }

        res.render('../views/partials/home.hbs', {
            title: 'Главная',
            articles: sqlArticlesOutput,
            page: page
        })
    }
}