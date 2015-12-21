(function(exports) {
	exports.Model = function(data) {
		if (data) {
			this.setData(data);
		} else {
			this.pointsList = [];
		}
		this.sortPointsList();
	};

	exports.Model.prototype = {
		addPoint: function(pos) {
			this.pointsList.push(new Point(pos));
			this.sortPointsList();
		},
		removePoint: function(point) {
			this.pointsList.splice(this.pointsList.indexOf(point), 1);
			this.sortPointsList();
		},
		movePoint: function(point, pos) {
			var needsSort = point.x != pos.x;
			point.x = pos.x;
			point.y = pos.y;
			if (needsSort) {
				this.sortPointsList();
			}
		},
		sortPointsList: function() {
			var i;
			if (this.pointsList.length === 0) {
				return;
			}
			this.pointsList.sort(function(a, b) {
				return a.x - b.x;
			});
			for (i = 0; i < this.pointsList.length - 1; i++) {
				this.pointsList[i].nextPoint = this.pointsList[i + 1];
			}
			this.pointsList[this.pointsList.length - 1].nextPoint = null;
		},
		getPointsList: function() {
			return this.pointsList;
		},
		getPointAtX: function(x) {
			var i;
			for (i = 0; i < this.pointsList.length; i++) {
				if (this.pointsList[i].x == x) {
					return this.pointsList[i];
				}
			}
			return null;
		},
		getDuplicateXPoint: function(point) {
			var i;
			for (i = 0; i < this.pointsList.length; i++) {
				if (this.pointsList[i].x == point.x &&
					this.pointsList[i] !== point
				) {
					return this.pointsList[i];
				}
			}
			return null;
		},
		setData: function(data) {
			this.pointsList = data.map(function(pointData) {
				pointData.y += window.settings.y_offset_zero;
				return new Point(pointData);
			});
			this.sortPointsList();
		}
	};

})(window);
