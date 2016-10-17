<template>
	<div class="layout">
		<l-header></l-header>
		<router-view></router-view>
	</div>
</template>

<script>
	import Header from 'src/components/Header.vue';
	export default {
		components: {
			'l-header': Header
		}
	};
</script>

<style scoped>
	.layout{
		width: 100%;
		height: auto;
	}
</style>
