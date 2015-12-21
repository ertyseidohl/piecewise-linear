(function(exports) {
	/*
		This is a pretty poor testing framework
		but I don't have time to get something more
		thorough working. So this is it for now :)
	*/

	var assert = function(condition, value, string) {
		if (condition != value) {
			console.log("FAILED: " + string);
		}
	};

	var assertPointsList = function(pointsList, testPoints, string) {
		var i;
		if (pointsList.length != testPoints.length) {
			console.log("FAILED: Points Lists Not Same Length: " + string);
			console.log(JSON.stringify(pointsList), JSON.stringify(testPoints));
			return false;
		}
		for (i = 0; i < pointsList.length; i++) {
			if (pointsList[i].x != testPoints[i].x ||
				pointsList[i].y != testPoints[i].y
			) {
				console.log("FAILED: Unmatched points: " + string);
				console.log(JSON.stringify(pointsList), JSON.stringify(testPoints));
				return false;
			}
		}
		return true;
	};

	exports.Tester = function(model, view, controller) {
		this.model = model;
		this.view = view;
		this.controller = controller;
		this.runTests();
	};

	exports.Tester.prototype = {
		runTests: function() {
			var i;
			for (i = 0; i < tests.length; i++) {
				tests[i].call(this);
			}
		}
	};

	var tests = [
		function() {
			var m = new Model([]);
			var r = new Renderer(
				document.createElement("canvas"),
				document.createElement("textarea"),
				document.createElement("button"),
				document.createElement("p")
			);
			var c = new Controller(r, m);

			c.onMouseDown({x: 100, y: 100});
			c.onMouseUp({x: 100, y: 100});
			assertPointsList(
				m.pointsList,
				[{x: 100, y: 100}],
				"Create point with mousedown, mouseup"
			);

			c.onMouseDown({x: 50, y: 100});
			c.onMouseUp({x: 50, y: 100});
			assertPointsList(
				m.pointsList,
				[{x: 50, y: 100}, {x: 100, y: 100}],
				"Add point to list with x less than other point"
			);

			c.onMouseDown({x: 50, y: 100});
			c.onMouseMove({x: 30, y: 30});
			c.onMouseUp({x: 30, y: 30});
			assertPointsList(
				m.pointsList,
				[{x: 30, y:30}, {x: 100, y: 100}],
				"Click and drag a point"
			);

			c.onMouseDown({x: 30, y: 30});
			c.onMouseUp({x: 30, y: 30});
			assertPointsList(
				m.pointsList,
				[{x: 100, y:100}],
				"Delete a point by clicking on it"
			);

			c.onMouseDown({x: 100, y: 50});
			c.onMouseUp({x:100, y: 50});
			assertPointsList(
				m.pointsList,
				[{x: 100, y: 50}],
				"Move a point by clicking a different Y"
			);


		}

	];


})(window);
