/*eslint-disable */

import * as THREE from 'three'
module.exports = function(imgData, x, y) {
	var r, g, b, a,
		offset = x * 4 + y * 4 * imgData.width;

	r = imgData.data[offset];
	g = imgData.data[offset + 1];
	b = imgData.data[offset + 2];
	a = imgData.data[offset + 3];
	var col = new THREE.Color(0xffffff);
	col.setRGB(r / 256, g / 256, b / 256);
	return col;
};
