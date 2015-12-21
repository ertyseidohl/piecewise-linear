(function() {
	var canvas = document.getElementById("canvas");
	var jsonLister = document.getElementById("json");
	var jsonUpdateButton = document.getElementById("json_update");
	var jsonError = document.getElementById("json_error");

	//set canvas width
	canvas.width = window.settings.width + window.settings.x_step_minor;
	canvas.height = window.settings.height + window.settings.y_step_minor;

	var renderer = new Renderer(canvas, jsonLister, jsonUpdateButton, jsonError);
	var model = new Model([{x: 0, y: 0}, {x: 800, y: 0}]);
	var controller = new Controller(renderer, model);
	var tester = new Tester(model, renderer, controller);

	controller.run();
})();
