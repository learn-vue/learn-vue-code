<template>
	<div>
		<div class="text-content">
			<div id="app1" v-bind:title="message">v-bind:title="message"</div>
		</div>
		<div>ytes</div>
		<ul>
			<todo v-for="todo in todos" v-bind:todo="todo"></todo>
		</ul>
	</div>
</template>

<script>
module.exports = {
	data: function(){
		return {
			message: 'Hello Vue.js!' + new Date(),
			todos: [1, 2, 3, 4, 5]
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
	width: 1200px;
	margin: 20px auto;
}
</style>
