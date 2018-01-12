/*eslint-disable */
// 获取imagedata
module.exports = function(image) {
	var canvas = document.createElement("canvas");
	var context = canvas.getContext("2d");
	canvas.width = image.width;
	canvas.height = image.height;
	context.scale(1,-1);
	context.drawImage(image, 0, image.height * -1);
	var imgData = context.getImageData(0, 0, canvas.width, canvas.height);
	return imgData;
};
