var db = require("../models/");

// db.Burger
module.exports = function(app) {
	// retrieve all burgers in DB and res.json back to user
	app.get("/api/all", function(req, res) {
		db.burgers.findAll({}).then(results => res.json(results));
	});

	// post route for adding a new burger
	app.post("/api/burgers", function(req, res) {
		console.log("Got: ", req.body, req.method, req.path);

		db.burgers
			.create({
				burger_name: req.body.burger_name
			})
			.then(results => {
				console.log("burger successfully added");
				res.end();
			});
	});
};
