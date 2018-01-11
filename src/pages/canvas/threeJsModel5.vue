<!-- 动态粒子2 canvas绘制元件 -->
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
        camera.position.z = 150;

        // add the output of the renderer to the html element
        document.getElementById("WebGL-output").appendChild(webGLRenderer.domElement);

        var getTexture = function () {
            var canvas = document.createElement('canvas');
            canvas.width = 32;
            canvas.height = 32;

            var ctx = canvas.getContext('2d');
            // the body
            ctx.translate(-81, -84);

            ctx.fillStyle = "orange";
            ctx.beginPath();
            ctx.moveTo(83, 116);
            ctx.lineTo(83, 102);
            ctx.bezierCurveTo(83, 94, 89, 88, 97, 88);
            ctx.bezierCurveTo(105, 88, 111, 94, 111, 102);
            ctx.lineTo(111, 116);
            ctx.lineTo(106.333, 111.333);
            ctx.lineTo(101.666, 116);
            ctx.lineTo(97, 111.333);
            ctx.lineTo(92.333, 116);
            ctx.lineTo(87.666, 111.333);
            ctx.lineTo(83, 116);
            ctx.fill();

            // the eyes
            ctx.fillStyle = "white";
            ctx.beginPath();
            ctx.moveTo(91, 96);
            ctx.bezierCurveTo(88, 96, 87, 99, 87, 101);
            ctx.bezierCurveTo(87, 103, 88, 106, 91, 106);
            ctx.bezierCurveTo(94, 106, 95, 103, 95, 101);
            ctx.bezierCurveTo(95, 99, 94, 96, 91, 96);
            ctx.moveTo(103, 96);
            ctx.bezierCurveTo(100, 96, 99, 99, 99, 101);
            ctx.bezierCurveTo(99, 103, 100, 106, 103, 106);
            ctx.bezierCurveTo(106, 106, 107, 103, 107, 101);
            ctx.bezierCurveTo(107, 99, 106, 96, 103, 96);
            ctx.fill();

            // the pupils
            ctx.fillStyle = "blue";
            ctx.beginPath();
            ctx.arc(101, 102, 2, 0, Math.PI * 2, true);
            ctx.fill();
            ctx.beginPath();
            ctx.arc(89, 102, 2, 0, Math.PI * 2, true);
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


            var range = 500;
            for (var i = 0; i < 2000; i++) {
                var particle = new THREE.Vector3(Math.random() * range - range / 2, Math.random() * range - range / 2, Math.random() * range - range / 2);
                geom.vertices.push(particle);
            }

            cloud = new THREE.PointCloud(geom, material);
            cloud.name = 'pointcloud';
            cloud.sortParticles = true;
            scene.add(cloud);
        }

        var controls = new function () {
        	this.rolateX = 0;
        	this.rolateY = 0;
            this.size = 15;
            this.transparent = true;
            this.opacity = 0.6;
            this.color = 0xffffff;
            this.rotateSystem = true;
            this.sizeAttenuation = true;

            this.redraw = function () {
                if (scene.getObjectByName("pointcloud")) {
                    scene.remove(scene.getObjectByName("pointcloud"));
                }
                createPointCloud(controls.size, controls.transparent, controls.opacity, controls.sizeAttenuation, controls.color);
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
		gui.add(controls, 'rolateY', -100, 100);
        controls.redraw();

        render();

        var step = 0;

        function render() {

            stats.update();
        	camera.position.x = controls.rolateX;
			camera.position.y = controls.rolateY;
			camera.lookAt(scene.position);
            if (controls.rotateSystem) {
                step += 0.01;

                cloud.rotation.x = step;
                cloud.rotation.z = step;
            }


            requestAnimationFrame(render);
            webGLRenderer.render(scene, camera);
        }
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