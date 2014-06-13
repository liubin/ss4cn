var express = require("express");
var app = express();
var ejs = require('ejs');
var bodyParser = require('body-parser')

var cheerio = require('cheerio');

var myHttpGetter = require('./MyHttpGetter.js');

app.set('views', __dirname + '/views');
app.engine('.html', ejs.__express);
app.set('view engine', 'html');

app.use(express.static(__dirname + '/public'));

app.use(function(err, req, res, next){
  console.error(err.stack);
  res.send(500, 'hehe!');
});

app.use(bodyParser.urlencoded())
app.use(bodyParser.json())

app.get('/www.slideshare.net/:user/:presentation', function(req, res) {
  url = "http://www.slideshare.net/" + req.params.user
                                      + "/" + req.params.presentation;

  // test ok.
  // url="http://127.0.0.1:5000/test";

  myHttpGetter.get(url,function(content,status){
    console.log("status:= " + status);

    $ = cheerio.load(content);
    var pages = [];
    $(content).find("div.slide_container div.slide").each(function(i, page){
      var pageNo = $(page).attr('data-index');
      var imgEle = $($(page).find('img.slide_image')[0]);
      var images = [imgEle.attr('data-normal'),imgEle.attr('data-full')];
      var page = {"no": pageNo, "images": images};
      pages.push(page);
    });
    res.render('index', {
      title: url,
      pages: JSON.stringify(pages)
    });
    console.log(pages);
  });


});

app.get('/test', function(req, res) {
  res.render('test', {
    title: 'test'
  });
});

var port = Number(process.env.PORT || 5000);
app.listen(port, function() {
  console.log("Listening on " + port);
});

