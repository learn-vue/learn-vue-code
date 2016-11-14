<template>
	<div>
		<div class="text-content">
			<div id="app1" v-bind:title="message">2号实验室等待被占领</div>
		</div>
	</div>
</template>

<script>
module.exports = {
	data: function(){
		return {
			message: 'Hello Vue.js!' + new Date(),
			todos: [1, 2, 3, 4, 5],
			now: new Date().getTime()
		};
	},
	components: {
		'todo': {
			props: ['todo'],
			template: '<li>这是第{{todo}}条</li>'
		}
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
.test-row{
	border-bottom: 1px #ccc dashed; 
	padding: 15px 0;
}
</style>

