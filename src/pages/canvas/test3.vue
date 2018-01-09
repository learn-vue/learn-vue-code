<template>
	<div id="main">
	</div>
</template>

<script>
import * as THREE from 'three';

module.exports = {
	data: function(){
		return {
		};
	},
	components: {
	},
	mounted () {
		var scene = new THREE.Scene();
		var camera = new THREE.PerspectiveCamera(75, 1000 / 500, 0.1, 1000)

		var renderer = new THREE.WebGLRenderer();
		renderer.setSize(1000, 500)
		document.getElementById('main').appendChild(renderer.domElement)

		var geometry = new THREE.BoxGeometry(1, 1, 1)
		var material = new THREE.MeshBasicMaterial({ color: 0x00ff00 })
		var cube = new THREE.Mesh(geometry, material)
		scene.add(cube)

		camera.position.z = 5;

		var render = function () {
			/*eslint-disable */
			requestAnimationFrame(render)

			cube.rotation.x += 0.1;
			cube.rotation.y += 0.1;

			renderer.render(scene, camera);
		};
		render();
	},
	methods: {
	}
}
</script>
<style>
canvas{
	display: block;
	border: 1px solid;
	margin: auto;
	background: #000;
}
</style>