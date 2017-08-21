

myApp.config(['$routeProvider', function($routeProvider){
    $routeProvider
        .when('/',{
            // location of the template
        	templateUrl		: 'views/login-view.html',
        	// Which controller it should use 
            controller 		: 'loginController',
            // what is the alias of that controller.
        	controllerAs 	: 'myLogin'
        })
        .when('/signup',{
            // location of the template
        	templateUrl		: 'views/signup-view.html',
        	// Which controller it should use 
            controller 		: 'signupController',
            // what is the alias of that controller.
        	controllerAs 	: 'mySignup'
        })
        .when('/admin/signup',{
            // location of the template
            templateUrl     : 'views/signup-view.html',
            // Which controller it should use 
            controller      : 'signupAdminController',
            // what is the alias of that controller.
            controllerAs    : 'mySignup'
        })
        .when('/dashboard',{
        	templateUrl     : 'views/dash-view.html',
        	controller 		: 'dashController',
        	controllerAs 	: 'myDash'
        })
        .when('/admin/create',{

        	templateUrl     : 'views/create-view.html',
            controller      : 'createController',
            controllerAs    : 'myCreate'
        	
        })
        .when('/product/:id',{

        	templateUrl     : 'views/product-view.html',
            controller      : 'productController',
            controllerAs    : 'myProduct'
        	
        })
        .when('/product/:id/edit',{

            templateUrl     : 'views/editProduct-view.html',
            controller      : 'editProductController',
            controllerAs    : 'myEditProduct'
            
        })
        .when('/cart',{

        	templateUrl     : 'views/cart-view.html',
        	controller 		: 'cartController',
        	controllerAs 	: 'myCart'
        })
        .when('/forgotPassword',{

            templateUrl     : 'views/forgot-view.html',
            controller      : 'resetController',
            controllerAs    : 'myReset'
        })
        .when('/verifyOTP',{

            templateUrl     : 'views/otp-view.html',
            controller      : 'resetController',
            controllerAs    : 'myReset'
        })
        .when('/updatePass',{

            templateUrl     : 'views/updatePass-view.html',
            controller      : 'resetController',
            controllerAs    : 'myReset'
        })
        

        .otherwise(
            {
                //redirectTo:'/'
                template   : '<h1 style="color:red;">404 page not found</h1>'
            }
        );
}]);