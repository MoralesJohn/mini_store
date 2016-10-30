var mongoose = require('mongoose');
var Customer = mongoose.model('Customer');

module.exports = (function(){
	return{
		show: function(req, res){
			Customer.find({}, function(err, results){
				if(err){
					console.log(err);
					res.json(err);
				}else{
					res.json(results);
				}
			})
		},
		// ##fix to recent
		recent_show: function(req, res){
			var q = Customer.find({}).sort({created_at: -1}).limit(3);
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
			console.log('hello from add customer!', req.body.name, req.body.created_at);
			var new_customer = new Customer({name: req.body.name, created_at: req.body.created_at});
			new_customer.save(function(err){
				if(err){
					console.log('fail to add to database!');
					res.json(err);
				}else{
					console.log('successfully added to the database');
					module.exports.show(req, res);
				}
			})

		}

	}

})();

