<template>
	<l-header></l-header>
	<router-view></router-view>
</template>

<script>
	import Header from 'src/components/Header.vue';
	export default {
		components: {
			'l-header': Header
		}
	};
</script>

<style>
	
</style>
