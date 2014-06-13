var MyHttpGetter = function () {};

var request = require('request');

MyHttpGetter.prototype.get=function(url,callback){
  request(url, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      callback(body,response.statusCode);
    }
  })
}

module.exports = new MyHttpGetter();