var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');



var index = require('./routes/index');
var tasks = require('./routes/tasks');

var port = 5000;
var app = express();


app.set('views',path.join(__dirname, 'views'));
app.set('view engine','ejs');
app.engine('html',require('ejs').renderFile);

app.use(express.static(path.join(__dirname,'client')));

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());



app.use('/',index);
app.use('/api',tasks);

app.listen(port, function(){
  console.log("server is running on "+ port);
});
