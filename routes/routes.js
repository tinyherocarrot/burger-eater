var db = require("../models/");

// db.Burger
module.exports = function(app) {
	// set up handlebars.js
	var exphbs = require("express-handlebars");
	app.engine("handlebars", exphbs({ defaultLayout: "main" }));
	// and specify a default view engine
	app.set("view engine", "handlebars");

	// root route
	app.get("/", function(req, res) {
		db.burgers
			.findAll({})
			.then(results => res.render("index", { burgers: results }));
	});

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
				res.redirect("/");
			});
	});

	// update route after devouring a burger
	app.put("/api/burgers/:id", function(req, res) {
		console.log("Got: ", req.body, req.method, req.path);

		db.burgers
			.update(
				{
					devoured: true
				},
				{
					where: { id: req.params.id }
				}
			)
			.then(results => {
				console.log("burger successfully EATEN");
				res.end();
			});
	});

	// post route for adding a new rating
	app.post("/api/ratings", function(req, res) {
		console.log("Got: ", req.body, req.method, req.path);

		db.ratings
			.create({
				user_name: req.body.user_name,
				rating: req.body.rating,
				burgerId: req.body.burgerId
			})
			.then(results => {
				console.log("rating successfully added");
				res.redirect("/");
			});
	});
};
