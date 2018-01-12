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

module.exports = {
	data: function(){
		return {
		};
	},
	components: {
	},
	mounted () {
		var me = this;
		console.info(TWEEN)
		var imageData = me.getImageData();
		/*eslint-disable */
		var stats = this.initStats();

		// create a scene, that will hold all our elements such as objects, cameras and lights.
		var scene = new THREE.Scene();

		// create a camera, which defines where we're looking at.
		var camera = new THREE.PerspectiveCamera(45, 1000 / 500, 0.1, 1000);

		// create a render and set the size
		var webGLRenderer = new THREE.WebGLRenderer();
		webGLRenderer.setClearColor(new THREE.Color(0x000000, 1.0));
		webGLRenderer.setSize(1000, 500);

		// position and point the camera to the center of the scene
		camera.position.x = 20;
		camera.position.y = 0;
		camera.position.z = 200;

		// add the output of the renderer to the html element
		document.getElementById("WebGL-output").appendChild(webGLRenderer.domElement);

		var getTexture = function () {
			var canvas = document.createElement('canvas');
			canvas.width = 16;
			canvas.height = 16;
			var ctx = canvas.getContext('2d');

			ctx.beginPath();
			ctx.arc(16, 16, 2, 0, 2*Math.PI, true);
			ctx.fillStyle = 'white';
			ctx.fill();	

			var texture = new THREE.Texture(canvas);
			texture.needsUpdate = true;
			return texture;
		};


		var cloud;

		function createPointCloud(size, transparent, opacity, sizeAttenuation, color) {

			var geom = new THREE.Geometry();


			var material = new THREE.PointCloudMaterial({
				size: size,
				transparent: transparent,
				opacity: opacity,
				map: getTexture(),
				sizeAttenuation: sizeAttenuation,
				color: color
			});


			var rangeX = 500;
			var rangeY = 300;
			var rangeZ = 300;
			// 随机粒子坐标
			for (var i = 0; i < 200; i++) {
				var particle = new THREE.Vector3(
					Math.random() * rangeX - rangeX / 2,
					Math.random() * rangeY - rangeY / 2,
					Math.random() * rangeZ - rangeZ / 2
				);
				geom.vertices.push(particle);
			}

			cloud = new THREE.PointCloud(geom, material);
			cloud.name = 'pointcloud';
			cloud.sortParticles = true;
			scene.add(cloud);
		}
		var imgCanvas;
		function createImage(size, transparent, opacity, sizeAttenuation, color) {

			var geom = new THREE.Geometry();

			var material = new THREE.SpriteMaterial();


			var rangeX = 500;
			var rangeY = 300;
			var rangeZ = 300;
			// image 粒子
			console.info(imageData.length);
			for (var i = 0; i < imageData.length; i++) {
				var data = imageData[i];

				var sprite = new THREE.Sprite(material);
				sprite.position.set((data.x - 100)/2, (data.y - 100)/2, 0);
				scene.add(sprite);
			}

		}

		var controls = new function () {
			this.rolateX = 0;
			this.rolateY = 0;
			this.size = 15;
			this.transparent = true;
			this.opacity = 1;
			this.color = 0xffffff;
			this.rotateSystem = false;
			this.sizeAttenuation = true;

			this.redraw = function () {
				if (scene.getObjectByName("pointcloud")) {
					scene.remove(scene.getObjectByName("pointcloud"));
				}
				createPointCloud(controls.size, controls.transparent, controls.opacity, controls.sizeAttenuation, controls.color);
				createImage();
			};
		};

		var gui = new dat.GUI();
		gui.add(controls, 'size', 0, 20).onChange(controls.redraw);
		gui.add(controls, 'transparent').onChange(controls.redraw);
		gui.add(controls, 'opacity', 0, 1).onChange(controls.redraw);
		gui.addColor(controls, 'color').onChange(controls.redraw);
		gui.add(controls, 'sizeAttenuation').onChange(controls.redraw);
		gui.add(controls, 'rotateSystem');
		gui.add(controls, 'rolateX', -100, 100);
		gui.add(controls, 'rolateY', -200, 200);
		controls.redraw();

		render();

		var step = 0;

		function render() {

			stats.update();
			TWEEN.update();
			camera.position.x = controls.rolateX;
			camera.position.y = -controls.rolateY;
			camera.lookAt(scene.position);
			if (controls.rotateSystem) {
				step += 0.01;

				cloud.rotation.x = step;
				cloud.rotation.z = step;
			}

			requestAnimationFrame(render);
			webGLRenderer.render(scene, camera);
		}

		$('#WebGL-output canvas').on('mousemove' , function(e){
			var x = (e.offsetX - 500) / 5
			var y = (e.offsetY - 250) / 1.25
			var tween = new TWEEN.Tween(controls).to({
				rolateX: x,
				rolateY: y,
			},5000)
        	tween.easing(TWEEN.Easing.Exponential.Out);
        	tween.onUpdate(function(e){
        	});
            tween.start();
		});
	},
	beforeDestroy () {
		/*eslint-disable */
		$('.dg.ac .main').remove();
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