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

function isArray(object)
{
    if (object.constructor === Array) return true;
    else return false;
}

app.get('/',function(req,res){

var myGames;
var https = require('https');

var options = {
  host: 'www.igdb.com',
  path: '/api/v1/games/2761',
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
    console.log(str);
    
    var qParams = [];
    /*for(var i = 0; i < 25; i++){
      
      for (var p in myGames.companies[i]){
        qParams.push({'name':p,'value':(myGames.companies[i])[p]});
        console.log("Name: " + p  + (myGames.companies[i])[p]);
      }
      
    }*/
    
    function cycle (myGames){
      
      for (var p in myGames.game){
      
        if (isArray(myGames.game[p])){
          for(var i = 0; i < (myGames.game[p]).length; i++){
            for (var q in (myGames.game[p])[i]){
                
                qParams.push({'name':q,'value':((myGames.game[p])[i])[q]});
                
            }
          }
          
        }
        else{
          
          qParams.push({'name':p,'value':myGames.game[p]});
          
        }
        
      }
      
      return;
      
    }
    
    cycle(myGames);
      
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
