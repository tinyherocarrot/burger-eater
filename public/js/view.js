$(document).ready(function() {
	console.log("Loaded!");
	// Getting a reference to the input field where user adds a new burger
	var $newBurgerInput = $("input.new-burger");
	// Our new burgers will go inside the burgersContainer
	var $burgersContainer = $(".burgers-container");
	// Eaten burgers will go inside the burgerEatenContainer
	var $burgersEatenContainer = $(".burgers-eaten-container");
	// Adding event listeners for adding, eating, and rating burgers
	$(document).on("click", ".submit-burger", insertBurger);
	$(document).on("click", "button.eat-burger", updateDevoured);
	// $(document).on("click", "button.open-rating-form", showRatingForm);
	$(document).on("click", "button.submit-rating", insertRating);

	// This function updates a burger.devoured when the user clicks the EAT! button
	function updateDevoured(event) {
		event.stopPropagation();
		var id = $(this).data("id");
		console.log("updating devoured at id ", id);
		$.ajax({
			method: "PUT",
			url: "/api/burgers/" + id
		}).done(() => {
			location.reload();
		});
	}

	// This function inserts a new burger into our database and then updates the view
	function insertBurger(event) {
		console.log("adding new burger to db");
		event.preventDefault();
		var newBurger = {
			burger_name: $newBurgerInput.val().trim(),
			devoured: false
		};

		$.post("/api/burgers", newBurger).done(() => location.reload());
	}

	// function showRatingForm(event) {
	// 	event.stopPropagation();
	// 	var thisid = $(this).attr("data-id");
	// 	$(`form[data-id=${thisid}]`).show();
	// }

	// This function inserts a new rating, linked with a user_name
	function insertRating(event) {
		console.log("adding new rating");
		event.preventDefault();
		event.stopPropagation();
		var newRating = {
			rating: $("#rating-value").val(),
			user_name: $("#username-input")
				.val()
				.trim(),
			burgerId: $(this).data("id")
		};
		console.log(JSON.stringify(newRating, null, 2));
		$.post("/api/ratings", newRating).done(() => location.reload());
	}
});
