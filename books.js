var mongoose = require ("mongoose");

var bookSchema = mongoose.Schema({
  name:{
    type : String,
    required :true
  },
  author:{
    type : String,
    required :true
  },
  publisher:{
    type : String,
    required :true
  },
  price:{
    type : Number,
    required :true
  },
  created_date:{
    type : Date,
    default : Date.now
  },
});

var Book = module.exports = mongoose.model('Book', bookSchema);

module.exports.getbooks = function(callback,limit){
  Book.find(callback).limit(limit);
}

module.exports.getbookById = function(id,callback){
  Book.findById(id, callback);
}

module.exports.addbook = function(book,callback){
  Book.create(book,callback);
}

module.exports.updatebook = function(id , book, options, callback){
  var query = {_id : id};
  var update = {
    name : book.name,
    author : book.author,
    publisher : book.publisher,
    price : book.price
  };
  Book.findOneAndUpdate(query, update, options, callback);
}

module.exports.removebook = function(id,callback){
  var query = {_id:id};
  Book.remove(query, callback);
}
