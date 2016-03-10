var express = require('express');
var app = express();
var handlebars = require('express-handlebars').create({defaultLayout:'main'});
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('port', 3000);

var obj = 'FAT HORSE';

app.get('/',function(req,res){

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

callback = function(response) {
  var str = ''
  response.on('data', function (chunk) {
    str += chunk;
  });
  
  response.on('end', function () {
    myGames = JSON.parse(str);
    console.log(myGames.games[0].name);
    console.log(myGames.games[22].name);
    console.log(str);
    
    var qParams = [];
    for(var i = 0; i < 25; i++){
      
      for (var p in myGames.games[i]){
        qParams.push({'name':p,'value':(myGames.games[i])[p]});
        console.log("Name: " + p  + (myGames.games[i])[p]);
      }
      
    }
    
    var context = {};
    context.dataList = qParams;
    
    app.get('/Games',function(_req,_res){
      
      _res.render('games.handlebars', context);
      
    });
  });
}

var req = https.request(options, callback);

req.end();
 res.render('howtomain.handlebars');
});

app.listen(app.get('port'), function(){
  console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});

console.log(obj);
