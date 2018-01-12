/*eslint-disable */
var THREE = require('../../../../vendor/Three'),
	GetRandom = require('./get.random'),
	GetPixelColor = require('./get.pixel.color'),
	CONFIG = require('./config');

/**
 * Returns the coordinates for a given imgData and given pixel on the image
 */

module.exports = function(imgData) {
	//get a position based on img pixels
	//console.log(imgData);

	var sPosn = new THREE.Vector3(GetRandom(-CONFIG.MAX_DISTANCE, CONFIG.MAX_DISTANCE), GetRandom(-CONFIG.MAX_DISTANCE, CONFIG.MAX_DISTANCE), GetRandom(-CONFIG.MAX_DISTANCE, CONFIG.MAX_DISTANCE));
	var gotIt = false;

	//return sPosn;

	//give up after 3 tries
	var NUMBER_OF_ATTEMPTS = 3;
	var Z_SPREAD = 20;
	var tries = 0;
	while(gotIt === false && tries < NUMBER_OF_ATTEMPTS) {
		tries++;
		//randomly select a pixel in image data
		var imgx = Math.round(imgData.width * Math.random()),
			imgy = Math.round(imgData.height * Math.random()),
			col = GetPixelColor(imgData, imgx, imgy);
		//read color from image
		// console.log(imgx, imgy);
		if(col.r > 0) {
			//if not black - set it
			sPosn = {
				x: (imgx - imgData.width / 2) * CONFIG.IMAGE_SCALE,
				y: (imgy - imgData.height / 2) * CONFIG.IMAGE_SCALE,
				z: Math.random() * Z_SPREAD * 2 - Z_SPREAD
			};
			gotIt = true;
		} else {
			//if black - loop
			gotIt = false;
		}
	}

	return sPosn;
};
