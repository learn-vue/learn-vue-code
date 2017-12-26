<template>
	<div>
		<canvas id='cas' width="1000" height="500">您的浏览器不支持canvas，请更新浏览器后再浏览</canvas>
	</div>
</template>

<script>
module.exports = {
	data: function(){
		return {
		};
	},
	components: {
	},
	methods: {
	}
}
</script>
<style scoped>
#cas{
	display: block;
	border:1px solid;
	margin:auto;
	background: #000;
}
</style>