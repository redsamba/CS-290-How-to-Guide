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

app.get('/Games',function(req,res){
var req = new XMLHttpRequest();
var games = {Games:null};
games.Games = document.getElementById('games').value;
req.open("GET", 'https://www.igdb.com/api/v1/games?limit=10&token=' + apiKey);

if(req.status >=200 && req.status < 400)){
  
  var response = JSON.parse(req.responseText);
      			document.getElementById('gameID').textContent = response.games.id;
      			document.getElementById('gName').textContent = response.games.name;
      			document.getElementById('gSlug').textContent = response.games.slug;
      			document.getElementById('gDate').textContent = response.games.release_date;
      			document.getElementById('altName').textContent = response.games.alternative_name;
}

else{

      			console.log("Error in network request: " + request.statusText);

      		}
  
});

app.listen(app.get('port'), function(){
  console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});
