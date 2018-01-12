<!-- 图片 -->
<template>
	<div id="main">
		<div id="Stats-output">
		</div>
		<!-- Div which will hold the Output -->
		<div id="WebGL-output">
		</div>
		<div class="img-content">
			<canvas id='cas' width="1000" height="500">您的浏览器不支持canvas，请更新浏览器后再浏览</canvas>
			<div style="width:50px;margin:10px auto; display: none">
				<img id="tulip" src="/static/images/logo.png" alt="The Tulip" width="200" height="200" />
			</div>
		</div>
	</div>
</template>

<script>
import * as THREE from 'three'
import TWEEN from 'tween'
import Stats from 'src/pages/canvas/libs/stats';
import dat from 'src/pages/canvas/libs/dat.gui';
import Util from 'assets/js/util'
import GetImageData from 'src/pages/deutser/public/js/views/modules/particles/util/get.image.data'
import Particles from 'src/pages/deutser/public/js/views/modules/hilgart/particle/n/particle.manager' // when your ready to swap to the new system
module.exports = {
	data: function(){
		return {
			PARTICLE_COUNT: 4000, // 1500,
			CANVAS_TOUCH_PARTICLE_COUNT: 2000,
			// 相机高度
			CAMERA_Z: 1400,
			IMAGE_Z: 2000,
			Z_RANGE: 3000,
			shapes: [
				'static/images/1.png',
				'static/images/2.png',
				'static/images/3.png',
				'static/images/4.png'
			]
		};
	},
	components: {
	},
	mounted () {
		var me = this;
		/*eslint-disable */
		new Particles(me.shapes, document.body)
	},
	beforeDestroy () {
		/*eslint-disable */
		// $('.dg.ac .main').remove();
	},
	methods: {
		initStats () {
			var stats = new Stats();
			stats.setMode(0); // 0: fps, 1: ms
			// Align top-left
			stats.domElement.style.position = 'absolute';
			stats.domElement.style.left = '0px';
			stats.domElement.style.top = '0px';
			document.getElementById('Stats-output').appendChild(stats.domElement);
			return stats;
		},
		getImageData () {
			var canvas = document.getElementById("cas"),
			ctx = canvas.getContext("2d");
			var img = document.getElementById("tulip");
			ctx.drawImage(img, 0, 0);
			// 图片数据
			var imgData = ctx.getImageData(0, 0, 200, 200).data;
			// 遍历所有点 绘制图形
			var idx = null;
			var skip = 6;
			var logos = [];
			for(var y = 0; y < 200; y += skip) {
				for(var x = 0; x < 200; x += skip) {
					idx = (x + y * 200) * 4 - 1;
					if(imgData[idx] > 0) {
						logos.push({
							x: x,
							y: y,
							z: 20
						});
					}
				}
			}
			return logos;
		},
		getCircle (context) {
			var PI2 = Math.PI * 2;
			context.beginPath();
			context.arc( 0, 0, 0.5, 0, PI2, true );
			context.fill();
		}
	}
}
</script>
<style>
canvas{
	display: block;
	border: 1px solid;
	margin: auto;
}
.img-content{
	display: none;
}
</style>