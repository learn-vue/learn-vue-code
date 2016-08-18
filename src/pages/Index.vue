<template>
	<div class="dev-overview">
		这里是首页  啦啦啦
	</div>
	<h1>Hello App!</h1>
	<p>
		<!-- 使用指令 v-link 进行导航。 -->
		<ul>
			<li><a v-link="{ path: '/page/index2' }">Go to index2</a></li>
			<li><a v-link="{ path: '/index3' }">Go to index3</a></li>
			<li><a v-link="{ path: '/index4' }">Go to index4</a></li>
			<li><a v-link="{ path: '/index5' }">Go to index5</a></li>
			<li><a v-link="{ path: '/index6' }">Go to index6</a></li>
		</ul>
	</p>
</template>

<script>
    // module.exports = {
    //     components: {
    //     },
    //     methods:{
    //
    //     }
    // };
    
</script>

<style>

</style>
