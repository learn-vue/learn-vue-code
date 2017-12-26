<template>
	<div>
		<canvas id='cas' width="1000" height="500">您的浏览器不支持canvas，请更新浏览器后再浏览</canvas>
	</div>
</template>

<script>
module.exports = {
	data: function(){
		return {
		};
	},
	components: {
	},
	created () {
	},
	active () {
	},
	mounted () {
		var vm = this
		this.cas = document.getElementById('cas')
		if (this.cas.getContext) {
			/*eslint-disable */
			vm.drawTimeInterval = setInterval(this.drawClock, 1000)
		}
	},
	beforeDestroy () {
		clearInterval(this.drawTimeInterval)
    },
	methods: {
		drawClock () {
			this.context = this.cas.getContext('2d')
			var context = this.context
			context.clearRect(0, 0, 200, 200)
			context.fillStyle = '#fff'
			context.strokeStyle = '#ff0000'
			context.font = 'bold 14px Arial'
			context.textAlign = 'center'
			context.textBaseline = 'middle'
			// 开始路径
			context.beginPath()
			// 绘制外圆
			context.arc(100, 100, 99, 0, 2 * Math.PI, false)
			// 绘制内圆
			context.moveTo(194, 100)
			context.arc(100, 100, 94, 0, 2 * Math.PI, false)
			context.stroke()
			this.drawNum()
			this.drawTime()
			// 描边路径
		},
		drawTime () {
			const now = new Date()
			var context = this.context
			context.beginPath()
			// 绘制时针
			const h = now.getHours() + now.getMinutes() / 60 + now.getSeconds() / 3600
			context.moveTo(100, 100)
			context.lineTo(100 + 45 * Math.sin(-Math.PI * 2 * h / 12 + Math.PI), 100 + 45 * Math.cos(-Math.PI * 2 * h / 12 + Math.PI))
			// 绘制分针
			const m = now.getMinutes() + now.getSeconds() / 60
			context.moveTo(100, 100)
			context.lineTo(100 + 75 * Math.sin(-Math.PI * 2 * m / 60 + Math.PI), 100 + 75 * Math.cos(-Math.PI * 2 * m / 60 + Math.PI))
			const s = now.getSeconds()
			// 绘制秒针
			context.moveTo(100, 100)
			context.lineTo(100 + 90 * Math.sin(-Math.PI * 2 * s / 60 + Math.PI), 100 + 90 * Math.cos(-Math.PI * 2 * s / 60 + Math.PI))
			context.stroke()
		},
		drawNum () {
			var context = this.context
			for (var i = 1; i < 13; i++) {
				var Angle = -Math.PI * 2 * i / 12 + Math.PI
				const x = 100 + 85 * Math.sin(Angle)
				const y = 100 + 85 * Math.cos(Angle)
				context.fillText(i, x, y)
			}
		}
	}
}
</script>
<style scoped>
#cas{
	display: block;
	border:1px solid;
	margin:auto;
	background: #000;
}
</style>