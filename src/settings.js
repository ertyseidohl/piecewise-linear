window.settings = {
	background_color: "#eee",
	cursor_line_color: "#000",
	width: 800,
	height: 600,
	x_step_major: 100,
	y_step_major: 100,
	x_step_minor: 10,
	y_step_minor: 10,
	major_step_color: "#888",
	minor_step_color: "#AAA",
	point_fill_color: "#000",
	point_line_color: "#000",
	point_line_thickness: 3,
	point_radius: 5,
	y_offset_zero: 300
};

window.settings.getSnappedCursor = function(cursor) {
	return {
		x: cursor.x - (cursor.x % settings.x_step_minor),
		y: cursor.y - (cursor.y % settings.y_step_minor),
	};
};
