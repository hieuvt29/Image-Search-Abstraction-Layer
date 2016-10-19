//server.js
// BASE SETUP
//======================

// call the packages we need
var express = require('express');
var bodyParser = require('body-parser');



//create and configure app
var app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
var port = process.env.PORT || 3000;



//WORK WITH DATABASE
//=====================
var mongoose = require('mongoose');
var URI = process.env.MONGOLAB_URI || 'mongodb://localhost:27017/imgsearch-history';
mongoose.connect(URI);
var db  = mongoose.connection;
db.once('open', function(){
  console.log('database connected!');
})

//get the model based on a Schema defined in models folder
var History = require('./models/history.js');


// ROUTES FOR OUR API
//======================
var router_test = express.Router();// get an instance of the express Router

router_test.get('/', function(req, res){
  res.end('get successed!');
});

var router_imgsearchapi = require('./api/imagesearch.js');
router_imgsearchapi(app, History);

//REGISTER OUR ROUTES

app.use('/', router_test);

//START THE SERVER
//======================

app.listen(port, function(){
  console.log("Server is listening on port " + port);
});
