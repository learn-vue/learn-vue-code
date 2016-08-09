<template>
	<div id="app">
		<img class="logo" src="./assets/logo.png">
		<hello></hello>
		<h1 v-text="title">{{ a }}</h1>
		<ul>
			<li v-for="item in items" :class="{ finished: item.isFinished }">{{ item.label }}</li>
		</ul>
	</div>
	<!-- 路由外链 -->
	<router-view></router-view>
</template>

<script>
import Hello from './components/Hello'

export default {
	// 等价于 new vue({});
	data: function(){
		return {
			a: 1,
			b: [],
			title: 'this is a todo list',
			items: [
				{
					label: 'coding',
					isFinished: false
				},
				{
					label: 'walking',
					isFinished: true
				},
				{
					label: 'sleep',
					isFinished: false
				},
				{
					label: 'eating',
					isFinished: true
				}
			]
		}
	},
	components: {
		Hello: Hello
	},
	methods: {
		doSomthing: function(){
			this.a ++
		}
	},
	watch: {
		// 数据监听
		'a': function(val, oldval){
			console.log(val, oldval)
		}
	}
}
</script>

<style>
html {
	height: 100%;
}

body {
	display: flex;
	align-items: center;
	justify-content: center;
	height: 100%;
}
.finished{
	text-decoration: line-through;
}
#app {
	color: #2c3e50;
	margin-top: -100px;
	max-width: 600px;
	font-family: Source Sans Pro, Helvetica, sans-serif;
	text-align: center;
}

#app a {
	color: #42b983;
	text-decoration: none;
}

.logo {
	width: 100px;
	height: 100px
}
</style>
