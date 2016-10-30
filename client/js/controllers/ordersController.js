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