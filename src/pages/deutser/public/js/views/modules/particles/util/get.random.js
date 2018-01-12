/*eslint-disable */
//function to get random number in a range

module.exports = function(minVal, maxVal) {
	return minVal + (Math.random() * (maxVal - minVal));
};