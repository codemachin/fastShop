var mongoose = require('mongoose');
var express = require('express');

// express router // used to define routes 
var productRouter  = express.Router();
var productModel = mongoose.model('Product')
var responseGenerator = require('./../../libs/responseGenerator');
var auth = require("./../../middlewares/auth");


module.exports.controllerFunction = function(app) {

   
 ////////////////////gete all products from database,secured by login check//////////////////////////   

    productRouter.get('/all',auth.checkLogin,function(req,res){
        productModel.find({},function(err,allproducts){
            if(err){                
                var myResponse = responseGenerator.generate(true,"some error"+err,500,null);
                res.send(myResponse);
            }
            else{

                var myResponse = responseGenerator.generate(false,"successfully retrieved",200,allproducts);
                res.send(myResponse);

            }

        });//end product model find 

    });//end get all products
///////////////////////////////get specific product , secured api////////////////////////////////

    productRouter.get('/:id',auth.checkLogin,function(req,res){
      

        productModel.findOne({'_id':req.params.id},function(err,foundproduct){
            if(err){
                var myResponse = responseGenerator.generate(true,"some error"+err,500,null);
                res.send(myResponse);
            }
            else if(foundproduct==null || foundproduct==undefined || foundproduct._id==undefined){

                var myResponse = responseGenerator.generate(true,"product not found",404,null);
                res.send(myResponse);
                

            }
            else{

                var myResponse = responseGenerator.generate(false,"successfully retrieved",200,foundproduct);
                res.send(myResponse);


            }

        });// end find
      

    });//end get all products

    

 /////////////////////////api for editing a specific product secured by admin and login check//////////////////   

    productRouter.put('/:id/edit',auth.checkLogin,auth.checkAdmin,function(req,res) {

        var update = req.body;

        productModel.findOneAndUpdate({'_id':req.params.id},update,function(err,result){

            if(err){
                var myResponse = responseGenerator.generate(true,err,404,null);
                res.send(myResponse);
            }
            else{
                var myResponse = responseGenerator.generate(false,"product successfully edited",200,result);
                res.send(myResponse);
            }


        }); //end user model find

    });




    // this should be the last line
    // now making it global to app using a middleware
    // think of this as naming your api 
    app.use('/api/v1/products', productRouter);



 
} //end contoller code
