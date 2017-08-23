var mongoose = require('mongoose');
var express = require('express');

// express router // used to define routes 
var cartRouter  = express.Router();
var userModel = mongoose.model('User');
var productModel = mongoose.model('Product');
var responseGenerator = require('./../../libs/responseGenerator');
var auth = require("./../../middlewares/auth");
var async = require("async");


module.exports.controllerFunction = function(app) {
    
    ///////////////////////////get user with all cart details//////////////////////   

    cartRouter.get('/all',auth.checkLogin,function(req,res){
        userModel.findOne({'_id':req.session.user._id},function(err,allUsers){
            if(err){                
                res.send(err);
            }
            else{

                
                var myResponse = responseGenerator.generate(false,"success",200,allUsers);
                res.send(myResponse);

            }

        });//end user model find 

    });//end get all users

    /////////////////////////deletes an item from cart, only one item at once/////////////////////////////

    cartRouter.post('/:id/delete',auth.checkLogin,function(req,res) {
        var update = req.session.user;

    ////////loop to check if item is already in cart, if yes then it just decreases the quantity

        for(var i=0;i<update.cart.length;i++){
            if(update.cart[i].productId==req.params.id){
                if(update.cart[i].quantity > 1){
                   update.cart[i].quantity--; 
                }else{
                    update.cart.splice(i, 1);
                    break;
                }
            }
        }



        userModel.findOneAndUpdate({'_id':req.session.user._id},update,{new:true},
            function(err,result){

                if(err){
                    var myResponse = responseGenerator.generate(true,"some error "+err,500,null);
                    res.send(myResponse);
                }
                else{
                    req.session.user.cart = update.cart;
                    var myResponse = responseGenerator.generate(false,"success",200,result);
                    res.send(myResponse);
                     

                }


            });

    });

     //////////////////////////////deletes all items with a specific productId/////////////////////

    cartRouter.post('/:id/deleteAll',auth.checkLogin,function(req,res) {
        

        
        userModel.findOneAndUpdate({'_id':req.session.user._id},{
            '$pull':{cart:{productId:req.params.id}}
        },{new:true},
            function(err,result){

                if(err){
                    var myResponse = responseGenerator.generate(true,"some error "+err,500,null);
                    res.send(myResponse);
                }
                else{
                    req.session.user.cart = result.cart;
                    var myResponse = responseGenerator.generate(false,"success",200,result);
                    res.send(myResponse);

                }


            });

    });

     ///////////////////////////////add product to cart /////////////////////////////////////////

    cartRouter.post('/add/:id',auth.checkLogin,function(req,res){
        var update=req.session.user;
        var helper=0;

        //////////object representing embedded cart array in user schema////////
        var cartItem =  {
                            productId: req.params.id,
                            quantity : 1,
                            price:null,
                            name:""
                        };
        ////////////////////loop to check if item already in cart if yes then increment by one/////////
        ///then using Async to get product id from productDb and update to userDb //////////
        for(var i=0;i<update.cart.length;i++){
            if(update.cart[i].productId==req.params.id){
                update.cart[i].quantity++;
                helper++;
            }
        }
        if(helper==0){
            update.cart.push(cartItem);
        }

        var functionToFindProductDetails = function(callback){

            productModel.findOne({'_id': req.params.id},function(err,foundProduct){

                if(err){
                  var myResponse = responseGenerator.generate(true,"some error"+err,500,null);
                  callback(myResponse);
                  }
                  else if(foundProduct==null || foundProduct==undefined || foundProduct._id==undefined){

                      var myResponse = responseGenerator.generate(true,"Product not found",404,null);
                      callback(myResponse);

                  }
                  else{

                      callback(null, foundProduct);

                  }
            })

        };

        var functionToUpdateCart = function(result, callback){

            for(var i=0;i<update.cart.length;i++){
                if(update.cart[i].productId==req.params.id){
                    update.cart[i].price=result.price;
                    update.cart[i].name=result.name;
                }
            }    

            userModel.findOneAndUpdate({'_id': req.session.user._id},update,{new: true},
                function(err,result){
                    if(err){

                        var myResponse = responseGenerator.generate(true,"some error "+err,500,null);
                        callback(myResponse);  

                    }
                    else{

                       req.session.user.cart = update.cart;
                       var myResponse = responseGenerator.generate(false,"added to cart",200,result);
                       callback(null, myResponse);   
                       
                    }

                });//end new user save

        };
        
        async.waterfall([
        // A list of functions
            functionToFindProductDetails,
            functionToUpdateCart
            
        ],    
            function(err, results){
                 if(err){     
                    res.send(err);
                 }else {
                    res.send(results);
                 }

            });

       
        

    });//end get all users



    // this should be the last line
    // now making it global to app using a middleware
    // think of this as naming your api 
    app.use('/api/v1/cart', cartRouter);



 
} //end contoller code
