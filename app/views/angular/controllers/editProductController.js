myApp.controller('editProductController',['$http','$routeParams','shopService',function($http,$routeParams,shopService) {

  //create a context
  var main = this;
  
  this.id = $routeParams.id;
  this.product = {};
  

  this.products = function(){

    
   
      shopService.getAdminProduct(main.id)
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
              main.product=response.data.data;
            
          } else if(response.data.status==403){
            alert(response.data.message)
          }
          
          

        }, function errorCallback(response) {
          // called asynchronously if an error occurs
          // or server returns response with an error status.
          alert("some error occurred. Check the console.");
          console.log(response);
        });


  }// end load single match

  this.products();

  this.editProduct = function(){



    shopService.editProduct(main.id,main.product)
        .then(function successCallback(response) {
              
              if(response.data.loginStatus==false){
              window.location="#/"
              }
              else if(response.data.admin==false){
                  window.location="#/"
              }
              else if(response.data.status==200){
                
                alert(response.data.message);
                window.location="#/admin/create"

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

}]);//end controller