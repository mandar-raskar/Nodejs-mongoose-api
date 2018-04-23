var express = require('express');

var app = express();

var server = require("/routes/server");

app.use('/server', server);

app.use('/',function(req,res){
  res.status(404).json({
    "message":"error found"
  })
});

module.exports = app();
