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
		var camera = new THREE.PerspectiveCamera(45, 1000 / 500, 0.1, 1000)
		// create a render and set the size
		var renderer = new THREE.WebGLRenderer();
		renderer.setClearColor();
		renderer.setClearColor(0x000);

		renderer.setSize(1000, 500)
		var axes = new THREE.AxisHelper(20);
		scene.add(axes);

		var planeGeometry = new THREE.PlaneGeometry(60, 20, 1, 1);
		var planeMaterial = new THREE.MeshBasicMaterial({color: 0xcccccc});
		var plane = new THREE.Mesh(planeGeometry, planeMaterial);

		// rotate and position the plane
		plane.rotation.x = -0.5 * Math.PI;
		plane.position.x = 15;
		plane.position.y = 0;
		plane.position.z = 0;

		// add the plane to the scene
		scene.add(plane);

		// create a cube
		var cubeGeometry = new THREE.BoxGeometry(4, 4, 4);
		var cubeMaterial = new THREE.MeshBasicMaterial({color: 0xff0000, wireframe: true});
		var cube = new THREE.Mesh(cubeGeometry, cubeMaterial);

		// position the cube
		cube.position.x = -4;
		cube.position.y = 3;
		cube.position.z = 0;

		// add the cube to the scene
		scene.add(cube);

		// create a sphere
		var sphereGeometry = new THREE.SphereGeometry(4, 20, 20);
		var sphereMaterial = new THREE.MeshBasicMaterial({color: 0x7777ff, wireframe: true});
		var sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);

		// position the sphere
		sphere.position.x = 20;
		sphere.position.y = 4;
		sphere.position.z = 2;

		// add the sphere to the scene
		scene.add(sphere);

		// position and point the camera to the center of the scene
		camera.position.x = -30;
		camera.position.y = 40;
		camera.position.z = 30;
		camera.lookAt(scene.position);

		// add the output of the renderer to the html element
		document.getElementById('main').appendChild(renderer.domElement);

		// render the scene
		renderer.render(scene, camera);
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