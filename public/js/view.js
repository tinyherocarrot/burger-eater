$(document).ready(function() {
	console.log("Loaded!");
	// Getting a reference to the input field where user adds a new burger
	var $newBurgerInput = $("input.new-burger");
	// Our new burgers will go inside the burgersContainer
	var $burgersContainer = $(".burgers-container");
	// Eaten burgers will go inside the burgerEatenContainer
	var $burgersEatenContainer = $(".burgers-eaten-container");
	// Adding event listeners for deleting, editing, and adding todos
	$(document).on("click", ".submit-burger", insertBurger);
	$(document).on("click", "button.eat-burger", updateDevoured);
	// $(document).on("click", "button.complete", toggleComplete);

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

	// This function inserts a new todo into our database and then updates the view
	function insertBurger(event) {
		console.log("adding new burger to db");
		event.preventDefault();
		var newBurger = {
			burger_name: $newBurgerInput.val().trim(),
			devoured: false
		};

		$.post("/api/burgers", newBurger).done(() => location.reload());
	}
});
