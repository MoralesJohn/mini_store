myApp.controller('customersController', function(customerFactory, $scope){

	$scope.customers = [];
	$scope.dup_msg = "";

	customerFactory.getCustomers(function(data){
		$scope.customers = data;
		console.log('customers from http: ', $scope.customers);
	});

	$scope.addCustomer = function(){
		if($scope.isDuplicate()){
			$scope.dup_msg = "can\'t add the name because it is already used!";
		}else{
			$scope.new_customer.created_at = new Date();
			customerFactory.addCustomer($scope.new_customer, function(data){
				$scope.customers = data;
				$scope.new_customer = {};
			});
		}
	}

	$scope.isDupe = function(){

		for(var i=0;i<$scope.appts;i++){
			if($scope. !== undefined){
				if($scope.new_customer.name == $scope.customers[i].name){
					$scope.dup_msg = "name is already used!";
					return true;
				}
			}
		}
		return false; 
	}
});
myApp.controller('productsController', function(productFactory, $scope){

	$scope.products = [];
	$scope.dup_msg = "";

	productFactory.getProducts(function(data){
		$scope.products = data;
		console.log('products from http: ', $scope.products);
	});

	$scope.addProduct = function(){
		if($scope.isDuplicate()){
			$scope.dup_msg = "can\'t add the name because it is already used!";
		}else{
			$scope.new_product.created_at = new Date();
			productFactory.addProduct($scope.new_product, function(data){
				$scope.products = data;
				$scope.new_product = {};
			});
		}
	}

	
	$scope.isDuplicate = function(){
		
			for(var i=0;i<$scope.products.length;i++){
				if($scope.new_product !== undefined){
					if($scope.new_product.name == $scope.products[i].name){
						$scope.dup_msg = "product name is already used!"
						return true;
					}
				}
			}
		
		return false; 
	}
});
myApp.controller('ordersController', function(orderFactory, customerFactory, productFactory, $scope){

	$scope.orders = [];
	$scope.products = [];
	$scope.users = [];
	$scope.new_order = {};
	$scope.user_names = [];
	$scope.product_names = [];
	$scope.qty_error = false;

	orderFactory.getOrders(function(data){
		$scope.orders = data;
	});

	customerFactory.getCustomers(function(data){
		$scope.users = data;		
	});

	productFactory.getProducts(function(data){
		$scope.products = data;
	});

	$scope.addOrder = function(){
		$scope.new_order.created_at = new Date();
		$scope.new_order.name = $scope.new_order.name.name;
		//check whether the product qty is greater than order!
		$scope.qty = $scope.new_order.product.qty;
		//keep _id to reduce the qty of the product
		$scope.new_order.product_id = $scope.new_order.product._id;
		$scope.new_order.product = $scope.new_order.product.name;

		if($scope.qty < $scope.new_order.qty){
			$scope.qty_error = true;
			$scope.qty_msg = 'The product has only '+$scope.qty + ' left!';
		}else{
			orderFactory.addOrder($scope.new_order, function(data){
				$scope.orders = data;
				$scope.new_order = {};
				$scope.qty_error = false;
			});
		}
	}
});
myApp.controller('dashboardsController', function(orderFactory, customerFactory, productFactory, $scope){
	$scope.orders = [];
	$scope.products = [];
	$scope.customers = [];

	customerFactory.recent_show(function(customers){
		console.log('all customers: ', customers);
		$scope.customers = customers;
	});

	productFactory.recent_show(function(products){
		console.log('all products: ', products);
		$scope.products = products;
	});

	orderFactory.recent_show(function(orders){
		console.log('all orders: ', orders);
		$scope.orders = orders;
	});

});