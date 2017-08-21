myApp.service('shopService', function($http){
	

	this.getDash = function(){

		return $http.get('./api/v1/products/all')

	} //end get all blogs

	this.getAllCart = function(){

		return $http.get('./api/v1/cart/all')

	} //end get all blogs

	this.addToCart = function (id){
		return $http.post('./api/v1/cart/add/'+id,null)
	} // end create blog

	this.deleteCart = function (id){
		return $http.post('./api/v1/cart/'+id+'/delete', null)
	} // end create blog

	this.deleteAll = function (id){
		return $http.post('./api/v1/cart/'+id+'/deleteAll', null)
	} // end create blog

	this.productCreate = function (data){
		return $http.post('./api/v1/admin/products/create', data)
	} // end delete blog
	
	this.getAllProducts = function(){

		return $http.get('./api/v1/admin/products/all')

	} //end get all blogs

	this.deleteProduct = function (id){
		return $http.post('./api/v1/admin/products/'+id+'/delete',null)
	} // end delete blog

	this.getProduct = function(id){

		return $http.get('./api/v1/products/'+id)

	} //end get all blogs

	this.getAdminProduct = function(id){

		return $http.get('./api/v1/admin/products/'+id)

	} //end get all blogs

	this.editProduct = function (id,data){
		return $http.put('./api/v1/products/'+id+'/edit', data)
	} // end edit blog

	this.getLogin = function (data){
		return $http.post('./api/v1/users/login',data)
	} // end delete blog

	this.forgot = function(id){

		return $http.get('./mail/requestPass/'+id)

	} //end get all blogs

	this.verify = function(id){

		return $http.get('./otp/verify/'+id)

	} //end get all blogs

	this.updatePass = function(data){

		return $http.post('./account/update',data)

	} //end get all blogs

	this.postSignup = function(data){

		return $http.post('./api/v1/users/signup',data)

	} //end get all blogs


	this.deleteBlog = function (blogId){
		return $http.post(baseUrl+'/'+blogId+'/remove', null)
	} // end delete blog
	
});