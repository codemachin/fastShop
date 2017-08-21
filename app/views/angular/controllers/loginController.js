myApp.controller('loginController',['$http','$routeParams','shopService',function($http,$routeParams,shopService) {

  //create a context
  var main = this;
  this.email="";
  this.password="";
  
  this.baseUrl = './users/login';
  

  this.login = function(){

  	var myData = {
            email: main.email,
            password: main.password

        }
   
      
      shopService.getLogin(myData)
      .then(function successCallback(response) {
          // this callback will be called asynchronously
            // when the response is available
            if(response.data.status==200){

              if(response.data.data.admin==true){
                window.location = '#/admin/create'
              }else{
                	window.location = "#/dashboard"
                }
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




}]); // end controller