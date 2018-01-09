// 公共方法
var util = {
	log (text) {
		console.log('1')
	},
	info (text) {
		console.info('1')
	},
	getRandomInterval(minVal, maxVal, n) {
		n = n === 0 ? n : (n || 2)
		return (minVal + (Math.random() * (maxVal - minVal))).toFixed(n)
	}
}

export default util