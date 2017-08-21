myApp.controller('dashController',['$http','$routeParams','shopService',function($http,$routeParams,shopService) {

  //create a context
  var main = this;
  
  
  

  this.allProducts = function(){

  	shopService.getDash()
    .then(function successCallback(response) {
          // this callback will be called asynchronously
          // when the response is available
          if(response.data.loginStatus==false){
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


this.allProducts();


}]); // end controller