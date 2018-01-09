<template>
	<div id="main">
	</div>
</template>

<script>
import * as THREE from 'three'
import Util from 'assets/js/util'

module.exports = {
	data: function(){
		return {
		};
	},
	components: {
	},
	mounted () {
		console.info('mounted')
		console.info(Util.getRandomInterval(10, 20, 0))
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