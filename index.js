var express = require("express");
var app = express();
var ejs = require('ejs');
var bodyParser = require('body-parser')

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

  res.render('index', {
    title: url
  });
});

var port = Number(process.env.PORT || 5000);
app.listen(port, function() {
  console.log("Listening on " + port);
});

