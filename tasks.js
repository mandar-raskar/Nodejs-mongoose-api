var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');

var db = mongojs('mongodb://mahi:mahi@ds251845.mlab.com:51845/mytask_list',['tasks']);

router.get('/tasks',function(req,res,next){
  db.tasks.find(function(err,tasks){
    if (err){
      throw err;
    }
    res.json(tasks);
  });
});

router.get('/task/:id',function(req,res,next){
  db.tasks.findOne({_id : mongojs.ObjectId(req.params.id)},function(err,task){
    if (err){
      throw err;
    }
    res.json(task);
  });
});

router.post('/task',function(req,res,next){
  var task = req.body;
  if(!task.title || !(task.isdone+ '')){
    res.status(404);
    res.json({
      "message":"please take a tile or isdone property"
    });
  }
  else{
    db.tasks.save(task, function(err,task){
      if(err){
        throw err;
      }
      res.json(task);
    });
  }
});

router.delete('/task/:id',function(req,res,next){
  db.tasks.remove({_id : mongojs.ObjectId(req.params.id)},function(err,task){
    if (err){
      throw err;
    }
    res.json(task);
  });
});

router.put('/task/:id',function(req,res,next){
  var task = req.body;
  var updtask = {};
  if(task.isdone){
    updtask.isdone = task.isdone;
  }
  if(task.title){
    updtask.title = task.title;
  }
  if(!updtask){
    res.status(404);
    res.json({
      "error":"Bad data"
    });
  }
  else{
    db.task.update({_id : mongojs.ObjectId(req.params.id)},updtask,{},function(err,task){
      if(err){
        throw err;
      }
      res.json(task);
    });
  }
});


module.exports = router;
