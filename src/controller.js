(function(exports){
	exports.Controller = function(renderer, model) {
		this.renderer = renderer;
		this.model = model;
		this.addEventListeners();
		this.isMouseDown = false;
		this.pointHeld = null;
		this.hasMovedPointHeld = false;
	};

	exports.Controller.prototype = {
		addEventListeners: function() {
			this.renderer.canvas.addEventListener("mousemove", function(evt) {
				var rect = this.renderer.canvas.getBoundingClientRect();
				this.onMouseMove({
					x: Math.round((evt.clientX-rect.left)/(rect.right-rect.left)*this.renderer.canvas.width),
					y: Math.round((evt.clientY-rect.top)/(rect.bottom-rect.top)*this.renderer.canvas.height)
				});
			}.bind(this));

			this.renderer.canvas.addEventListener("mousedown", function(evt) {
				var rect = this.renderer.canvas.getBoundingClientRect();
				this.onMouseDown({
					x: Math.round((evt.clientX-rect.left)/(rect.right-rect.left)*this.renderer.canvas.width),
					y: Math.round((evt.clientY-rect.top)/(rect.bottom-rect.top)*this.renderer.canvas.height)
				});
			}.bind(this));

			this.renderer.canvas.addEventListener("mouseup", function(evt) {
				var rect = this.renderer.canvas.getBoundingClientRect();
				this.onMouseUp({
					x: Math.round((evt.clientX-rect.left)/(rect.right-rect.left)*this.renderer.canvas.width),
					y: Math.round((evt.clientY-rect.top)/(rect.bottom-rect.top)*this.renderer.canvas.height)
				});
			}.bind(this));

			this.renderer.jsonUpdateButton.addEventListener("click", function(evt) {
				try {
					var textAsObject = JSON.parse(this.renderer.jsonLister.value);
					this.model.setData(textAsObject);
				} catch (err) {
					this.renderer.jsonError.innerHTML = "Could not parse JSON: " + err.message;
				}
			}.bind(this));
		},

		run: function() {
			this.update();
		},

		update: function() {
			this.renderer.draw(this.model.getPointsList());
			window.requestAnimationFrame(this.update.bind(this));
		},

		onMouseMove: function(pos) {
			this.renderer.updateCursor(pos);
			var snappedPos = window.settings.getSnappedCursor(pos);
			if (this.pointHeld) {
				this.model.movePoint(this.pointHeld, snappedPos);
				this.hasMovedPointHeld = true;
			}
		},

		onMouseDown: function(pos) {
			this.isMouseDown = true;
			var snappedPos = window.settings.getSnappedCursor(pos);
			var existing = this.model.getPointAtX(snappedPos.x);
			if (existing) {
				this.pointHeld = existing;
				if (existing.y != snappedPos.y) {
					this.model.movePoint(existing, snappedPos);
					this.hasMovedPointHeld = true;
				}
			}
		},

		onMouseUp: function(pos) {
			this.isMouseDown = false;
			var snappedPos = window.settings.getSnappedCursor(pos);
			var existing = this.model.getPointAtX(snappedPos.x);
			if (this.pointHeld) {
				var sameXPoint = this.model.getDuplicateXPoint(this.pointHeld);
				if (sameXPoint) {
					this.model.removePoint(sameXPoint);
				}
				if (!this.hasMovedPointHeld) {
					this.model.removePoint(this.pointHeld);
				}
			} else {
				if (existing) {
					if (existing.y == snappedPos.y) {
						this.model.removePoint(existing);
					} else {
						this.model.movePoint(existing, snappedPos);
					}
				} else {
					this.model.addPoint(snappedPos);
				}
			}
			this.hasMovedPointHeld = false;
			this.pointHeld = null;
		}
	};
})(window);
