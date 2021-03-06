/*eslint-disable */
var THREE = require('../../../../vendor/Three');

module.exports = function(imgData, x, y) {
	var r, g, b, a,
		offset = x * 4 + y * 4 * imgData.width;

	r = imgData.data[offset];
	g = imgData.data[offset + 1];
	b = imgData.data[offset + 2];
	a = imgData.data[offset + 3];
	// console.log( "rgba(" + r + "," + g + "," + b + "," + a + ")");
	var col = new THREE.Color(0xffffff);
	col.setRGB(r / 256, g / 256, b / 256);
	return col;
};