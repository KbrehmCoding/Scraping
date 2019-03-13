var express = require('express');
var exphbs = require('express-handlebars');
var mongoose = require('mongoose');
var router = express.Router;
var axios = require('axios');
var cheerio = require('cheerio');
var Article = require('./models/Headline');
var Note = require('./models/note');
var Index = require('./models/index');
var db = require('./models');
var routes = require("./routes");

var url = 'https://www.nytimes.com/'

axios(url, function (err, res, body) {
    //TODO test these classes to make sure it pulls what I want
    var load = cheerio.load(body);
    var Title = load('.title');
    var Summary = load('i, element');
})

var PORT = process.env.PORT || 3000;

var app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.use(routes);

var MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/mongoHeadlines';

mongoose.connect(MONGODB_URI);

// app.get('/', function (req, res) {
//     axios.get(url).then(function (response) {
//         var $ = cheerio.load(response.data);

//         $('p.title').each(function (i, element) {
//             var result = {};

//             result.title = $(this)
//                 .children('a')
//                 .text();
//             result.link = $(this)
//                 .children('a')
//                 .attr('href');

//             Article.create(result)
//                 .then(function (dbArticle) {
//                     console.log(dbArticle);
//                 })
//                 .catch(function (err) {
//                     console.log(err);
//                 });
//         });

//         res.send('Scrape Complete');
//     });
// });

// app.get('/article', function (req, res) {
//     Article.find({})
//         .then(function (dbArticle) {
//             res.json(dbArticle);
//         })
//         .catch(function (err) {
//             res.json(err);
//         });
// });

// app.get('/article/:id', function (req, res) {
//     Article.findOne({ _id: req.params.id })
//         .populate('note')
//         .then(function (dbArticle) {
//             res.json(dbArticle);
//         })
//         .catch(function (err) {
//             res.json(err);
//         });
// });

// app.post('/article/:id', function (req, res) {
//     db.Note.create(req.body)
//         .then(function (dbNote) {
//             return Article.findOneAndUpdate({ _id: req.params.id }, { note: dbNote._id }, { new: true });
//         })
//         .then(function (dbArticle) {
//             res.json(dbArticle);
//         })
//         .catch(function (err) {
//             res.json(err);
//         });
// });


app.listen(PORT, function () {
    console.log('App running on port 3000!');
});
