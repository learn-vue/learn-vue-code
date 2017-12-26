<template>
	<div>
		<div id="particles"></div>
		<!-- <div class="logo">VUE</div> -->
	</div>
</template>

<script>
/*eslint-disable */
// console.log('%c  HELLO  VUE %c Copyright \xa9 2016-%s', 'font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;text-shadow: 6px 6px 5px #ccc,4px 4px 5px #c9c9c9,2px 2px 5px; #bbb;font-size:64px;color:#00bbee;-webkit-text-fill-color:#00bbee;-webkit-text-stroke: 1px #00bbee;', 'font-size:12px;color:#999999;', (new Date()).getFullYear());
// console.log('%c 如有问题请联系： http://zhaowenjie.github.io', 'font-size:12px;color:#666;');

import particles from 'particles.js'

module.exports = {
	data: function(){
		return {
			msg: 'hello world'
		}
	},
	mounted(){
		particlesJS.load('particles', '/static/json/particles/particles-star.json', function() {
		  console.log('particles.js loaded - callback');
		})
	}
}
</script>
<style scoped>
.logo {
	font-size: 150px;
	margin-top: 15%;
	margin-left: 40%;
	color: #2db7f5;
}
#particles {
	position: fixed;
	width: 100%;
	height: 100%;
	top: 0;
	bottom: 0;
	background: rgba(0, 0, 0, 1.0);
	z-index: -1;
}
</style>
