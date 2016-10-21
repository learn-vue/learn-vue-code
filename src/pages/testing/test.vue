<template>
	<div>
		<div class="text-content">
			<div id="app1" v-bind:title="message">{{message}}</div>
		</div>
	</div>
</template>

<script>
module.exports = {
	data: function(){
		return {
			message: 'Hello Vue.js ! ' + new Date()
		};
	},
	components: {

	},
	methods: {

	}
}
</script>
<style scoped>
.text-content{
	height: 200px;
	background: rgba(255,255,255,0.9);
	margin: 0 auto;
	padding: 20px 15px;
}
</style>
