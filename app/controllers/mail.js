var express=require('express');
var nodemailer = require("nodemailer");
var mongoose = require('mongoose');
var app=express();
var shortid = require("shortid");
var userModel = mongoose.model('User');
var auth = require("./../../middlewares/auth");
var responseGenerator = require('./../../libs/responseGenerator');
var crypto = require('./../../libs/crypto');
var key = "JAICRYPTO-AES256"

/*
	Here we are configuring our SMTP Server details.
	STMP is mail server which is responsible for sending and recieving email.
*/

var smtpTransport = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 587,
    auth: {
        user: 'viveksome2@gmail.com',
        pass: '*123#vivek'
    },
    tls: {rejectUnauthorized: false},
    debug:true
});


/*------------------SMTP Over-----------------------------*/

/*------------------Routing Started ------------------------*/
module.exports.controllerFunction = function(app) {
	var OTP="";
	var email="";

	app.get('/mail/requestPass/:id',function(req,res){
		OTP = shortid.generate();
		email = req.params.id;
		userModel.findOne({'email':req.params.id},function(err,result){
			return result;
		}).then(function(result){
			///////////////creating mail object and sending mail///////////

				var mailOptions={
						to : result.email,
						subject : "Enter OTP",
						text : "Follow this link : http://localhost:3000/#/verify/otp and enter OPT : "+OTP
					}
					console.log(mailOptions);
					smtpTransport.sendMail(mailOptions, function(error, response){
				   	 if(error){
				        console.log(error);
						var myResponse = responseGenerator.generate(true,"Mail sending failed "+err,403,null);
                		res.send(myResponse);
					 }else{
				        	console.log("Message sent: " + response.message);
				        	req.session.isUserVerifying=true;
							var myResponse = responseGenerator.generate(false,"Otp sent in your mail.Check and verify",200,null);
	                		res.send(myResponse);
				    	 }
					});
			
            }).catch(function(err){

            		var myResponse = responseGenerator.generate(true,"No matching email in database",404,null);
                	res.send(myResponse);

            })

		
		
	});
//////////////////verifies otp/////////////////////////

	app.get('/otp/verify/:id',function(req,res){
		if(OTP==req.params.id){
			var myResponse = responseGenerator.generate(false,"OTP verified successfully",200,null);
            res.send(myResponse);
		}else{
			var myResponse = responseGenerator.generate(true,"error verifying otp, enter again",404,null);
            res.send(myResponse);
		}

	})
//////////////////////////updates new password into database////////////////////////

	app.post('/account/update',auth.isVerifying,function(req,res){
		
		userModel.findOne({'email': email},function(err,result){
                	
                    return result;

                
            }).then(function(result){  

            		var passwordDb = crypto.encrypt(req.body.password,key);
            		result.password=passwordDb;
            		userModel.findOneAndUpdate({'email':email},result,function(err,result){
            			if(err){
            				var myResponse = responseGenerator.generate(true,"some error"+err,404,null);
            				res.send(myResponse);
            			}else{
            				
            				var myResponse = responseGenerator.generate(false,"pasword updated successfully",200,result);
            				res.send(myResponse);
            			}
            		})

            	}).catch(function(err){
			            var myResponse = responseGenerator.generate(true,"some error "+err,500,null);
			            res.send(myResponse);
        		})


	})
	

}

/*--------------------Routing Over----------------------------*/


