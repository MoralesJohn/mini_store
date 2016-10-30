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