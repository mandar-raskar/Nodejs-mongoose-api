var express = require("express");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");

Genre = require("./models/genre");
Book = require("./models/books");

var app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

mongoose.connect("mongodb://localhost:27017/book");
var db = mongoose.connection;

app.get("/", function(req,res){
  res.send("hello");
});

app.get("/api/genres",function(req,res){
  Genre.getgenres(function(err,genre){
    if(err){
    throw err;
  }
  res.json(genre);
  });
});


app.post("/api/genres",function(req,res){
  var genre =req.body;
  Genre.addgenres(genre,function(err,genre){
    if(err){
    throw err;
  }
  res.json(genre);
  });
});

app.put("/api/genres/:_id", function(req,res){
  var id = req.params._id;
  var genre = req.body;
  Genre.updategenre(id,genre,{},function(err,genre){
    if (err){
    throw err;
  }
  res.json(genre);
});
});

app.delete("/api/genres/:_id", function(req,res){
  var id = req.params._id;
  Genre.removegenre(id, function(err,genre){
    if(err){
      throw err;
      }
    res.json(genre);
  });
});


  app.get("/api/books",function(req,res){
    Book.getbooks(function(err,books){
      if(err){
      throw err;
    }
    res.json(books);
  });

});

app.get("/api/books/:_id",function(req,res){
  Book.getbookById(req.params._id,function(err,bookId){
    if(err){
    throw err;
  }
  res.json(bookId);
});

});

app.post("/api/books",function(req,res){
  var book = req.body;
  Book.addbook(book, function(err,book){
    if (err){
      throw err;
    }
    res.json(book);
  });
});

app.put("/api/books/:_id",function(req,res){
  var id = req.params._id;
  var book = req.body;
  Book.updatebook(id,book,{},function(err,book){
    if(err){
      throw err;
    }
    res.json(book);
  });
});

app.delete("/api/books/:_id",function(req,res){
  var id = req.params._id;
  Book.removebook(id, function(err,book){
    if (err){
      throw err;
    }
    res.json(book);
  });
});




app.listen(3000);
console.log("server is running on port no. 3000");
