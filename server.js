const express = require('express');
const articleRouter = require('./routes/articles');
const Article = require('./models/article');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const dotenv = require("dotenv");
const app = express();
dotenv.config();

const username = process.env.MONGODB_USERNAME;
const password = process.env.MONGODB_PASSWORD;
mongoose.connect(`mongodb+srv://${username}:${password}@cluster0.fr4ar5d.mongodb.net/BlogWebsiteDB`, {
    useNewUrlParser : true,
    useUnifiedTopology : true,
});

app.set('view engine', 'ejs') //View engine helps us to convert ejs files to html
app.use(express.urlencoded({extended: false}))
app.use(methodOverride('_method')) //for delete override
app.get('/', async(req, res) => {
    const articles = await Article.find().sort({createdAt:'desc'})
    res.render('articles/index', {articles:articles});
});

app.use('/articles', articleRouter);

app.listen(3000);