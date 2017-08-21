var mongoose = require('mongoose');
var express = require('express');

// express router // used to define routes 
var productRouter  = express.Router();
var productModel = mongoose.model('Product')
var responseGenerator = require('./../../libs/responseGenerator');
var auth = require("./../../middlewares/auth");


module.exports.controllerFunction = function(app) {

    
//////////////////////get all products secured with login and admin check///////////////////////

    productRouter.get('/all',auth.checkLogin,auth.checkAdmin,function(req,res){
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

  ///////////////////////////get specific product by id for admin route///////////////////////////  

    productRouter.get('/:id',auth.checkLogin,auth.checkAdmin,function(req,res){
      

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

//////////////////////////delete a product secured by admin check and login check////////////////////    

    productRouter.post('/:id/delete',auth.checkLogin,auth.checkAdmin,function(req,res) {

      productModel.remove({'_id':req.params.id},function(err,result){

        if(err){
          console.log('some error');
          console.log(err);
          var myResponse = responseGenerator.generate(true,"some error"+err,500,null);
          res.send(myResponse);

        }
        else{
          var myResponse = responseGenerator.generate(false,"product deleted successfully",200,result);
          res.send(myResponse);
        }


      });

    });

    //////////////////create a product secured by admin check and login check///////////////////

    productRouter.post('/create',auth.checkLogin,auth.checkAdmin,function(req,res){

        if(req.body.name!=undefined && req.body.price!=undefined && req.body.category!=undefined && req.body.description!=undefined){

            var newproduct = new productModel({
                name             : req.body.name,
                category         : req.body.category,
                price            : req.body.price,
                description      : req.body.description,
                size             : req.body.size,
                color            : req.body.color,
                brand            : req.body.brand


            });// end new product 

            newproduct.save(function(err){
                if(err){

                     var myResponse = responseGenerator.generate(true,"some error"+err,500,null);
                     res.send(myResponse);
                     

                }
                else{

                   var myResponse = responseGenerator.generate(false,"successfully signup product",200,newproduct);
                   res.send(myResponse);
                
                  
                }

            });//end new product save


        }
        else{

            var myResponse = {
                error: true,
                message: "Some body parameter is missing",
                status: 403,
                data: null
            };

            res.send(myResponse);

            

        }
        

    });//end get all products



    // this should be the last line
    // now making it global to app using a middleware
    // think of this as naming your api 
    app.use('/api/v1/admin/products', productRouter);



 
} //end contoller code
