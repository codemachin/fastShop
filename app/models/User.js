var mongoose = require('mongoose');

var Schema = mongoose.Schema;

 var item = new Schema({

  productId:{type: mongoose.Schema.Types.ObjectId,required:true },
  quantity:{type:Number,required:true},
  price:{type:Number,required:true},
  name:{type:String,required:true}

});

var userSchema = new Schema({

  firstName : {type:String,default:"",required:true},
  lastName : {type:String,default:"",required:true},
  email : {type:String,default:"",required:true,unique:true},
  password : {type:String,default:"",required:true},
  contact : {type:String,default:""},
  address : {type:String,default:""},
  city : {type:String,default:""},
  state : {type:String,default:""},
  country : {type:String,default:""},
  pinCode : {type:String,default:""},
  admin   : {type:Boolean,default:false},
  cart    : [item],
  created : {type:Date,default:Date.now},
  updated : {type:Date,default:Date.now}

});

mongoose.model('User',userSchema);