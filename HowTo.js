var express = require('express');

var app = express();
var handlebars = require('express-handlebars').create({defaultLayout:'main'});
var bodyParser = require('body-parser');

var apiKey = 'QBwnDqlYnlq8vfe0iozGul3gnc1c3b-VSIuw2qdY9KI';

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('port', 3000);

app.get('/',function(req,res){
  res.render('howtomain.handlebars') //We can omit the .handlebars extension as we do below
});

app.use('/Intro',function(req,res){
  res.render('intro.handlebars');
});

//document.addEventListener('DOMContentLoaded', getGames);

function getGames(){
  
  app.get('/Games',function(req,res){
//var req = new XMLHttpRequest();
req.open("GET", 'https://www.igdb.com/api/v1/games?limit=10&token=' + apiKey);
var games = [];

for (var p in req.query){
    games.push({'game':p,'value':req.query[p]});
  }
  
var context = {};
  context.gameList = games;
  res.render('games.handlebars', context);  

games.Games = document.getElementById('games').value;
req.open("GET", 'https://www.igdb.com/api/v1/games?limit=10&token=' + apiKey);

});
  
  
}

app.listen(app.get('port'), function(){
  console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});
