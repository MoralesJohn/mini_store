var mongoose = require('mongoose');
var Product = mongoose.model('Product');

module.exports = (function(){
	return{
		show: function(req, res){
			Product.find({}, function(err, results){
				if(err){
					console.log(err);
				}else{
					res.json(results);
				}
			})
		},
		recent_show: function(req, res){
			var q = Product.find({}).sort({_id: -1}).limit(5);
			q.exec(function(err, results){
				if(err){
					console.log(err);
				}else{
					res.json(results);
				}
				
			});
		},
		add: function(req, res){
			console.log('hello from add Product!', req.body.name, req.body.created_at, req.body.desc, req.body.qty, req.body.img);
			var new_Product = new Product({name: req.body.name, created_at: req.body.created_at, desc: req.body.desc, qty: req.body.qty, img: req.body.img});
			new_Product.save(function(err){
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

