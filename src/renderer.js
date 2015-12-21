(function(exports) {
	var pointsListCache = [];

	exports.Renderer = function(canvas, jsonLister, jsonUpdateButton, jsonError) {
		this.cursor = {x:0, y:0};
		this.canvas = canvas;
		this.ctx = this.canvas.getContext("2d");
		this.jsonLister = jsonLister;
		this.jsonUpdateButton = jsonUpdateButton;
		this.jsonError = jsonError;
	};

	exports.Renderer.prototype = {
		updateCursor: function(pos) {
			this.cursor = pos;
		},

		blank: function() {
			this.ctx.fillStyle = settings.background_color;
			this.ctx.fillRect(
				0,
				0,
				this.canvas.width,
				this.canvas.height
			);
		},

		drawCursorLine: function() {
			this.ctx.strokeStyle = settings.cursor_line_color;
			this.ctx.lineWidth = 1;
			this.ctx.beginPath();
			var cursor = window.settings.getSnappedCursor(this.cursor);
			this.ctx.moveTo(cursor.x, 0);
			this.ctx.lineTo(cursor.x, settings.height);
			this.ctx.moveTo(0, cursor.y);
			this.ctx.lineTo(settings.width, cursor.y);
			this.ctx.stroke();
		},

		drawGrid: function(direction) {
			var i, iMajorMax, iMinorMax;

			if (direction == "x") {
				iMajorMax = settings.width / settings.x_step_major;
				iMinorMax = settings.width / settings.x_step_minor;
			} else {
				iMajorMax = settings.width / settings.y_step_major;
				iMinorMax = settings.width / settings.y_step_minor;
			}
			//set the linewidth
			this.ctx.lineWidth = 1;
			//major
			this.ctx.beginPath();
			this.ctx.strokeStyle = settings.major_step_color;
			for (i = 0; i < iMajorMax; i += 1) {
				if (direction == "x") {
					this.ctx.moveTo(i * settings.x_step_major, 0);
					this.ctx.lineTo(i * settings.x_step_major, settings.height);
				} else {
					this.ctx.moveTo(0, i * settings.y_step_major);
					this.ctx.lineTo(settings.width, i * settings.y_step_major);
				}
			}
			this.ctx.stroke();
			//minor
			this.ctx.beginPath();
			this.ctx.strokeStyle = settings.minor_step_color;
			for (i = 0; i <= iMinorMax; i += 1) {
				if (direction == "x") {
					this.ctx.moveTo(i * settings.x_step_minor, 0);
					this.ctx.lineTo(i * settings.x_step_minor, settings.height);
				} else {
					this.ctx.moveTo(0, i * settings.y_step_minor);
					this.ctx.lineTo(settings.width, i * settings.y_step_minor);
				}
			}
			this.ctx.stroke();
		},

		drawPoints: function(pointsList) {
			var i;
			for (i = 0; i < pointsList.length; i++) {
				pointsList[i].draw(this.ctx);
			}
		},

		draw: function(pointsList) {
			this.blank();
			this.drawGrid("x");
			this.drawGrid("y");
			this.drawCursorLine();
			this.drawPoints(pointsList);
			this.updateJSON(pointsList);
		},

		updateJSON: function(pointsList) {
			//this could be optimized
			//let's create a "simpler" points list without pointers
			var pointsListSimple = pointsList.map(function(point) {
				return point.getOffsetValues();
			});
			//keep track of if the lists are different
			var diff = false;
			//if their lengths are different, the lists are different
			if (pointsListSimple.length != pointsListCache.length) {
				diff = true;
			}
			//ok, if the lengths are the same, loop through and compare
			if (!diff) {
				var i;
				for (i = 0; i < pointsListSimple.length; i++) {
					if (pointsListSimple[i].x != pointsListCache[i].x ||
						pointsListSimple[i].y != pointsListCache[i].y
					) {
						diff = true;
						break;
					}
				}
			}
			//if they're different, update the cache and display the json
			if (diff) {
				this.jsonLister.value = JSON.stringify(pointsListSimple);
				this.jsonError.innerHTML = "";
				pointsListCache = pointsListSimple;
			}
		}
	};
})(window);
