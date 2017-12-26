<template>
	<div>
		<canvas id="qunxing" width="1000px" height="500px">您的浏览器不支持canvas，请更新浏览器后再浏览</canvas>
	</div>
</template>

<script>
import Particless from 'src/pages/canvas/particles'
/*eslint-disable */
module.exports = {
	data: function(){
		return {
		};
	},
	components: {
	},
	active(){
	},
	mounted(){
		/*
		 * parameters
		 * canvasId: 画布id，必填
		 * imgUrl: 纯色图片的路径，可以是jpg或者png，做粒子动画的图案色值为#000，必填
		 * cols/rows：分别代表图案每一行和每一列显示粒子数，此处需要设定的cols和rows要可被图片width和height整除，必填
		 * startX/startY: 粒子起始位置x,y
		 * imgX/imgY: 图片左上角坐标，相对canvas左上角的偏移值
		 * delay: 延迟执行动画时间，单位ms
		 * duration: 持续时间，单位ms
		 * fillStyle: 粒子颜色值，可带半透明
		 * particleOffset：粒子偏移值
		 * ease: 缓动函数 提供linear，Quad，Cubic，Quart，Quint，Sine，Expo，Circ，Elastic，Back 包含easeIn,easeOut,easeInOut
		 * interval: 粒子间开始移动间隔
		 */
		this.particles = new Particless({
			canvasId: 'qunxing',
			imgUrl: '/static/images/canvas/logo.jpg',
			cols: 160,
			rows: 196,
			startX: 500,
			startY: 500,
			imgX: 0,
			imgY: 0,
			delay: 100,
			duration: 2000,
			interval: 10,
			fillStyle: 'rgba(0,0,255,1)',
			particleOffset: 0,
			ease: 'easeInOutBack'
		});
		this.particles.animate();
	},
	beforeDestroy () {
	},
	methods: {

	}
}
</script>
<style scoped>
canvas {
	display: block;
	border:1px solid;
	margin:auto;
	background: #000;
}
</style>
