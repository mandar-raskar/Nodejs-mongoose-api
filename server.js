var body-parser = require('body-parser');

app.get("/",function(req,res){
  res.status(400).json(
    {
      "message":"Its being executed"
    }
  )
});

app.post("/",function(req,res){
  var data =
  {
    name : req.body.uname;
    pass : req.body.upass;
  }
})
