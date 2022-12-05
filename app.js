import express from 'express';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import expressHbs from 'express-handlebars';
import Handlebars from 'handlebars';
import hbs from 'hbs';
import cookieParser from 'cookie-parser';

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

import registrRoutes from './routes/registrRoutes.cjs';
import autoRoutes from './routes/autoRoutes.cjs';
import homeRoutes from './routes/homeRoutes.cjs';
import myPostsRoutes from './routes/myPostsRoutes.cjs';
import blogWritingRoutes from './routes/blogWritingRoutes.cjs';
import changedPostRoutes from './routes/changedPostRoutes.cjs';
import blogPageRoutes from './routes/blogPageRoutes.cjs';
import removePostRoutes from './routes/removePostRoutes.cjs';
import profileRoutes from './routes/profileRoutes.cjs';
import changeProfileRoutes from './routes/changeProfileRoutes.cjs';
import addedCommentRoutes from './routes/addedCommentRoutes.cjs';
import changedCommentRoutes from './routes/changedCommentRoutes.cjs';
import removeCommentRoutes from './routes/removeCommentRoutes.cjs';
import addedReactionRoutes from './routes/addedReactionRoutes.cjs';

app.use(cookieParser('secret key'));
app.use(express.static('public'));

app.use('/', registrRoutes);
app.use('/auto', autoRoutes);
app.use('/home', homeRoutes);
app.use('/my-posts', myPostsRoutes);
app.use('/blog_writing', blogWritingRoutes);
app.use('/changed_post', changedPostRoutes);
app.use('/blog_page', blogPageRoutes);
app.use('/remove_post', removePostRoutes);
app.use('/profile', profileRoutes);
app.use('/change_profile', changeProfileRoutes);
app.use('/added_comment', addedCommentRoutes);
app.use('/changed_comment', changedCommentRoutes);
app.use('/remove_comment', removeCommentRoutes);
app.use('/added_reaction', addedReactionRoutes);


app.engine(
    'hbs',
    expressHbs.engine({
        layoutsDir: 'views/layouts',
        defaultLayout: 'main',
        extname: '.hbs',
    })
)

Handlebars.registerHelper('times', function (n, block) {
    var accum = '';
    for (var i = 0; i < n; ++i)
        accum += block.fn(i);
    return accum;
});

app.set('view engine', 'hbs');
hbs.registerPartials(__dirname + '/views/partials');

Handlebars.registerHelper("when", function (operand_1, operator, operand_2, options) {
    var operators = {
        'eq': function (l, r) { return l == r; },
        'noteq': function (l, r) { return l != r; },
        'gt': function (l, r) { return Number(l) > Number(r); },
        'or': function (l, r) { return l || r; },
        'and': function (l, r) { return l && r; },
        '%': function (l, r) { return (l % r) === 0; }
    }
        , result = operators[operator](operand_1, operand_2);

    if (result) return options.fn(this);
    else return options.inverse(this);
});

app.listen(3001, () => {
    console.log('Сервер працює на 3001 порту...');
})