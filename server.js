// Dependencies
// =============================================================
var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");

// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 8080;

// Sets up the Express app to handle data parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

// Requiring our models for syncing
var db = require("./models");

// Static directory
app.use(express.static(path.join(__dirname, "/public")));

// Routes
// =============================================================
require("./routes/routes.js")(app);

// Syncs the DB, then starts the server to begin listening
// =============================================================
db.sequelize.sync().then(function() {
	app.listen(PORT, function() {
		console.log("App listening on PORT " + PORT);
	});
});
