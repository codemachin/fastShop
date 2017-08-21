myApp.controller('createController',['$http','$routeParams','shopService',function($http,$routeParams,shopService) {

  //create a context
  var main = this;
  this.name="";
  this.category="";
  this.price="";
  this.size="";
  this.brand="";
  this.color="";
  this.description="";
  this.items="";
  
  this.baseUrl = './api/v1/admin/products/create';
  

  this.create = function(){

  	var myData = {

  			name: main.name,
  			category: main.category,
            price: main.price,
            size: main.size,
            brand: main.brand,
            color: main.color,
            description: main.description

        }
   
      shopService.productCreate(myData)
      .then(function successCallback(response) {
          // this callback will be called asynchronously
          // when the response is available
          if(response.data.loginStatus==false){
              window.location="#/"
          }
          else if(response.data.admin==false){
              window.location="#/"
          }
          else if(response.data.status==200){
          	main.allProducts();
          	

          } else {
          	alert(response.data.message)
          }
          
          

        }, function errorCallback(response) {
          // called asynchronously if an error occurs
          // or server returns response with an error status.
          alert("some error occurred. Check the console.");
          console.log(response);
        });


  }// end load single match

  this.allProducts = function(){

  	
    shopService.getAllProducts()
    .then(function successCallback(response) {
          // this callback will be called asynchronously
          // when the response is available
          if(response.data.loginStatus==false){
              window.location="#/"
          }
          else if(response.data.admin==false){
              window.location="#/"
          }
          else if(response.data.status==200){
          	console.log(response.data);
          	main.items= response.data;
          	main.items.data.reverse();

          } else {
          	alert(response.data.message)
          }
          
          

        }, function errorCallback(response) {
          // called asynchronously if an error occurs
          // or server returns response with an error status.
          alert("some error occurred. Check the console.");
          console.log(response);
        });
  }

  this.delete = function(id,index){

  	shopService.deleteProduct(id)
    .then(function successCallback(response) {
          // this callback will be called asynchronously
          // when the response is available
          if(response.data.loginStatus==false){
              window.location="#/"
          }
          else if(response.data.admin==false){
              window.location="#/"
          }
          else if(response.data.status==200){
          	alert(response.data.message);
          	main.items.data.splice(index,1)
          	

          } else {
          	alert(response.data.message)
          }
          
          

        }, function errorCallback(response) {
          // called asynchronously if an error occurs
          // or server returns response with an error status.
          alert("some error occurred. Check the console.");
          console.log(response);
        });
  }
  




}]); // end controller