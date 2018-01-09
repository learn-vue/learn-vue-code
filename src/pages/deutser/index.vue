<template>
	<div id="main">
		<div id="Stats-output">
		</div>
		<!-- Div which will hold the Output -->
		<div id="WebGL-output">
		</div>
	</div>
</template>

<script>
import * as THREE from 'three'
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
		/*eslint-disable */
		var stats = this.initStats();
		var scene = new THREE.Scene();
		var camera = new THREE.PerspectiveCamera(45, 1000 / 500, 0.1, 1000)
		// create a render and set the size
		var renderer = new THREE.WebGLRenderer();
		renderer.setClearColor(0x000);
		renderer.setSize(1000, 500)
		var axes = new THREE.AxisHelper(80);
		scene.add(axes);
		// position and point the camera to the center of the scene
		camera.position.x = 100;
		camera.position.y = 0;
		camera.position.z = 150;
		camera.lookAt(scene.position);

		createSprites();
		function createSprites() {
			var geom = new THREE.Geometry();
			var material = new THREE.PointCloudMaterial({size: 4, vertexColors: true, color: 0xffffff});
			for (var x = -5; x < 5; x++) {
				for (var y = -5; y < 5; y++) {
					var particle = new THREE.Vector3(x * 10, y * 10, 0);
					geom.vertices.push(particle);
					geom.colors.push(new THREE.Color(Math.random() * 0x00ffff));
				}
			}

			var cloud = new THREE.PointCloud(geom, material);
			scene.add(cloud);
		}

		// add the output of the renderer to the html element
		document.getElementById('WebGL-output').appendChild(renderer.domElement);
		// call the render function
		var step = 0;
		var controls = new function () {
			this.x = 1;
			this.y = 1;
			this.reset = function () {
				this.x = 0;
				this.y = 0;
			};
		};
		console.info(dat)
		/*eslint-disable */
		var gui = new dat.GUI();
		gui.add(controls, 'x', 0, 100);
		gui.add(controls, 'y', 0, 100);
		function renderScene() {
			stats.update();
			camera.position.x = controls.x;
			camera.position.y = controls.y;
			camera.lookAt(scene.position);
			/*eslint-disable */
			requestAnimationFrame(renderScene);
			renderer.render(scene, camera);
		}
		renderScene();
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
</style>