<template>
	<div>
		<h1>Hello App!</h1>
		<p>
			<!-- use router-link component for navigation. -->
			<!-- specify the link by passing the `to` prop. -->
			<!-- <router-link> will be rendered as an `<a>` tag by default -->
			<router-link to="/foo">Go to Foo</router-link>
			<router-link to="/bar">Go to Bar</router-link>
		</p>
		<!-- route outlet -->
		<!-- component matched by the route will render here -->
		<router-view></router-view>
	</div>
</template>
<script>
</script>

<style>
	
</style>
