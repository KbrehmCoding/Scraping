var express = require('express');
var exphbs = require('express-handlebars');
var mongoose = require('mongoose');
var router = express.Router;
var axios = require('axios');
var cheerio = require('cheerio');
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


app.listen(PORT, function () {
    console.log('App running on port 3000!');
});
