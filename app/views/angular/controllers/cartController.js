myApp.controller('cartController',['$http','$routeParams','shopService',function($http,$routeParams,shopService) {

  //create a context
  var main = this;
  this.items="";
  this.totalPrice=0;

  
  

  this.cartProducts = function(){

    shopService.getAllCart()
    .then(function successCallback(response) {
          // this callback will be called asynchronously
          // when the response is available
          if(response.data.loginStatus==false){
              window.location="#/"
          }
          else if(response.data.status==200){
            
            main.items= response.data.data;

            for(var i=0;i<main.items.cart.length;i++){
                main.totalPrice=main.totalPrice+main.items.cart[i].price*main.items.cart[i].quantity;
            }
            /*main.items.data.reverse();*/

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

  this.addToCart = function(id,index){

    shopService.addToCart(id)
      .then(function successCallback(response) {
            // this callback will be called asynchronously
            // when the response is available
            if(response.data.loginStatus==false){
                window.location="#/"
            }
            else if(response.data.status==200){
              
              alert(response.data.message);
              main.items.cart[index].quantity++;
              main.totalPrice=main.totalPrice+main.items.cart[index].price;
              

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

  this.deleteFromCart = function(id,index){

    shopService.deleteCart(id)
        .then(function successCallback(response) {
              // this callback will be called asynchronously
              // when the response is available
              if(response.data.loginStatus==false){
                  window.location="#/"
              }
              else if(response.data.status==200){
                
                alert(response.data.message);
                if(main.items.cart[index].quantity>1){
                    main.items.cart[index].quantity--;
                    main.totalPrice=main.totalPrice-main.items.cart[index].price;
                  }else{
                    main.totalPrice=main.totalPrice-main.items.cart[index].price;
                    main.items.cart.splice(index, 1);
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
  }

  this.deleteAll = function(id,index){

    shopService.deleteAll(id)
    .then(function successCallback(response) {
          // this callback will be called asynchronously
          // when the response is available
          if(response.data.loginStatus==false){
              window.location="#/"
          }
          else if(response.data.status==200){
            
            alert(response.data.message);
            main.items.cart.splice(index, 1);
            main.totalPrice=0;
            for(var i=0;i<main.items.cart.length;i++){
                main.totalPrice=main.totalPrice+main.items.cart[i].price*main.items.cart[i].quantity;
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
  }


this.cartProducts();


}]); // end controller