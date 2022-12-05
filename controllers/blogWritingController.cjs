const fs = require('fs');
const models = require('../models/blogWritingModel.cjs');
const getCurrentUserId = require('../src/currentUser.cjs');

module.exports = {
    blogWritingGet: async (req, res) => {
        const currentUser = await getCurrentUserId(req.cookies);
        console.log('Cookies:', currentUser);

        res.render('./partials/blog_writing.hbs', {
            title: 'Создание блога',
        });
    },
    blogWritingPost: async (req, res) => {
        const header = req.body.header;
        const text = req.body.text;
        const file = req.file;
        const currentUser = await getCurrentUserId(req.cookies);

        if (file) {
            const sqlBlogWriting = await models.sqlBlogWriting(header, text, currentUser);
            const sqlPostId = await models.sqlPostId(currentUser);

            console.log(sqlPostId)

            let lastPostId = sqlPostId.slice(-1)[0];
            console.log(lastPostId);

            const sqlAddingFile = await models.sqlAddingFile(file, lastPostId);
            console.log(sqlAddingFile);

            if (Object.keys(sqlBlogWriting) != 0) {
                console.log('Данні добавлені!');

                fs.copyFile(file.path, './public/file/' + file.originalname, (err) => {
                    if (err) throw err;
                    console.log('source.txt was copied to destination.txt');
                })

                res.redirect('/my-posts');
            } else {
                console.log('Произошла ошибка!');
                res.redirect('/blog_writing');
            }
        } else {
            let sqlBlogWritingNoFile = models.sqlBlogWriting(header, text, currentUser);

            if (Object.keys(sqlBlogWritingNoFile) != 0) {
                console.log('Данні добавлені!');
                res.redirect('/my-posts');
            } else {
                console.log('Произошла ошибка!');
                res.redirect('/blog_writing');
            }
        };
    },
}