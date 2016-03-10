var express = require('express');

//var igdb = require('igdb-api-node');

var app = express();
var handlebars = require('express-handlebars').create({defaultLayout:'main'});
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('port', 3000);

//app.get('/',function(req,res){

var myGames;
var https = require('https');
var options = {
  host: 'www.igdb.com',
  path: '/api/v1/games',
  port: '443',
  headers: {
    'Accept': 'application/json',
    'Authorization': 'Token token="QBwnDqlYnlq8vfe0iozGul3gnc1c3b-VSIuw2qdY9KI"'
  }
};
callback = function(res) {
  var str = ''
  res.on('data', function (chunk) {
    str += chunk;
    //myGames = JSON.parse(str);
  });

  res.on('end', function () {
    var myGames = JSON.parse(str);
    console.log(str);
    
    app.get('/',function(req, _res){
    
      var context = {};
      context.sentData = myGames.games[0].name;
      _res.render('howtomain.handlebars', context);
    
    });
    
  });
  
}
var req = https.request(options, callback);
req.end;

 //var context = {};
 //context.sentData = myGames.games[0].name;
      
// res.render('howtomain.handlebars', context);



app.listen(app.get('port'), function(){
  console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});

/*var app = express();
var handlebars = require('express-handlebars').create({defaultLayout:'main'});
var bodyParser = require('body-parser');

var apiKey = 'QBwnDqlYnlq8vfe0iozGul3gnc1c3b-VSIuw2qdY9KI';

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('port', 3000);

app.get('/',function(req,res){
  res.render('howtomain.handlebars')  //We can omit the .handlebars extension as we do below
});

app.use('/Intro',function(req,res){
  res.render('intro.handlebars');
});

app.get('/Games',function(req,res){
   
var https = require('https');

var options = {
  host: 'www.igdb.com',
  path: '/api/v1/games',
  port: '443',
  headers: {
    'Accept': 'application/json',
    'Authorization': 'Token token="QBwnDqlYnlq8vfe0iozGul3gnc1c3b-VSIuw2qdY9KI"'
  }
};

callback = function(response) {
  var str = ''
  response.on('data', function (chunk) {
    str += chunk;
  });

  response.on('end', function () {
    console.log(str);
  });
}

var req = https.request(options, callback);
req.end();

res.render('games.handlebars', context);
  
});



app.listen(app.get('port'), function(){
  console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});*/
