(function(exports) {
	exports.Point = function(pos) {
		this.x = pos.x;
		this.y = pos.y;
		this.nextPoint = null;
	};

	exports.Point.prototype = {
		getOffsetValues: function() {
			return {
				x: this.x,
				y: this.y - window.settings.y_offset_zero
			};
		},

		draw: function(ctx) {
			ctx.fillStyle = settings.point_fill_color;
			ctx.beginPath();
			ctx.arc(
				this.x,
				this.y,
				settings.point_radius,
				0,
				2*Math.PI
			);
			ctx.fill();
			if (this.nextPoint) {
				ctx.strokeStyle = settings.point_line_color;
				ctx.lineWidth = settings.point_line_thickness;
				ctx.beginPath();
				ctx.moveTo(this.x, this.y);
				ctx.lineTo(this.nextPoint.x, this.nextPoint.y);
				ctx.stroke();
			}
		}
	};

})(window);
