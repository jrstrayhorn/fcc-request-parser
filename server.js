// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

var requestIp = require('request-ip')
var UAParser = require('ua-parser-js')
var langParser = require('accept-language-parser')

var parser = new UAParser();
// we've started you off with Express, 
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (request, response) {
  var results = {}
  results['ip'] = requestIp.getClientIp(request)
  results['language'] = formatLanguage(langParser.parse(request.headers['accept-language'])[0])
  results['OS'] = formatOS(parser.setUA(request.headers['user-agent']).getOS())
  response.json(results)
});

function formatLanguage(langObj) {
  var code = langObj.code
  var region = (langObj.region) ? "-"+langObj.region : ""
  return code + region
}

function formatOS(osObj) {
  return osObj.name + " " + osObj.version
}

// listen for requests :)
var listener = app.listen(process.env.PORT || '3939', function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
