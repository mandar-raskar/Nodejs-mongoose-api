var mongoose = require ("mongoose");

var genreSchema = mongoose.Schema({
  name:{
    type:String,
    required:true
  },
  created_date:{
    type:Date,
    default:Date.now
  }
});

var Genre = module.exports = mongoose.model('Genre', genreSchema);

module.exports.getgenres = function(callback,limit){
  Genre.find(callback).limit(limit);
}

module.exports.addgenres = function(genre,callback){
  Genre.create(genre, callback);
}

module.exports.updategenre = function(id , genre, callback, options){
  var query = {_id : id};
  var update ={
    name : genre.name
  };
  Genre.findOneAndUpdate(query,update,options, callback);
}

module.exports.removegenre = function(id,callback){
  var query = {_id : id};
  Genre.remove(query, callback);
}
