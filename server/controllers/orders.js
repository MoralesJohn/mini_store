var mongoose = require('mongoose');
var Order = mongoose.model('Order');
var Product = mongoose.model('Product');

module.exports = (function(){
	return{
		show: function(req, res){
			Order.find({}, function(err, results){
				if(err){
					console.log(err);
					res.json(err);
					
				}else{
					res.json(results);
				}
			})
		}, 
		// ### fix done###
		recent_show: function(req, res){
			var q = Order.find({}).sort({created_at: -1}).limit(3);
			q.exec(function(err, results){
				if(err){
					console.log(err);
					res.json(err);
					
				}else{
					res.json(results);
				}
			})
		}, 

		add: function(req, res){
			console.log('hello from add orders!!!', req.body.name, req.body.product, req.body.product_id);
			var new_order = new Order({name: req.body.name, product: req.body.product, qty: req.body.qty, created_at: req.body.created_at});
			new_order.save(function(err){
				if(err){
					console.log('fail to add to database!');
					res.json(err);
				}else{
					console.log('successfully added to the database');
					// var id = req.body.product_id;
					Product.findOne({_id: req.body.product_id}, function(err, product){
						var new_qty = product.qty - req.body.qty;
						Product.findOneAndUpdate({_id: req.body.product_id}, {qty:new_qty}, function(err){
							if(err)
								console.log('fail to reduce the qty of the product!');
							else
								console.log('successfully reduce the qty of the product!');
						});
					});
					module.exports.show(req, res);
				}
			});
		}
	}
})()