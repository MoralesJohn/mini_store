var myApp = angular.module('myApp', ['ngRoute', 'ngMessages']);

myApp.factory('customerFactory', function($http){
	var customers = [];
	var factory = {};

	factory.getCustomers = function(callback){
		$http.get('/customers').success(function(output){
			callback(output);
		});
	};
	factory.recent_show = function(callback){
		$http.get('/recent_customers').success(function(output){
			callback(output);
		});
	};
	factory.addCustomer = function(new_customer, callback){
		$http.post('/addCustomer', new_customer).success(function(output){
			
			callback(output);
		});
	}


	return factory;
});

myApp.factory('productFactory', function($http){
	var factory = {};
	var products = [];

	factory.getProducts = function(callback){
		$http.get('/products').success(function(output){
			// customers = output;
			callback(output);
		});
	};

	factory.recent_show = function(callback){
		$http.get('/recent_products').success(function(output){
			callback(output);
		});
	};

	factory.addProduct = function(new_product, callback){
		$http.post('/addProduct', new_product).success(function(output){
			
			callback(output);
		});
	}
	return factory;
});

myApp.factory('orderFactory', function($http){
	var factory = {};
	var orders = [];

	factory.getOrders = function(callback){
		$http.get('/orders').success(function(output){
			callback(output);
		});
	};
	factory.recent_show = function(callback){
		$http.get('/recent_orders').success(function(output){
			callback(output);
		});
	};
	factory.addOrder = function(new_order, callback){
		$http.post('/addOrder', new_order).success(function(output){
			callback(output);
		});
	}

	return factory;
});
