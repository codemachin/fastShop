var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var userSchema = new Schema({

  name : {type:String,default:"",required:true},
  category : {type:String,required:true},
  price : {type:Number,default:"",required:true},
  description : {type:String,default:""},
  sold : {type:Number,default:0},
  size : {type:String,default:""},
  color : {type:String,default:""},
  brand : {type:String,default:""},
  modelNo : {type:String,default:""},
  avgRating : {type:Number,default:0},
  created : {type:Date,default:Date.now},
  updated : {type:Date,default:Date.now}

});

mongoose.model('Product',userSchema);