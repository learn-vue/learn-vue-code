<template>
	<div id="app">
		<Zheader show=true v-on:child-tell-me-something="listenToMyBoy"></Zheader>
		<img class="logo" src="./assets/logo.png">
		<hello></hello>
		<h1 v-text="title">{{ a }}</h1>
		<input type="text" v-model="newItem" @keyup.enter="addNew()" />
		<ul>
			<li v-for="(index,item) in items" @click="toggleFinish(item)" :class="{ finished: item.isFinished }">{{ item.label }}</li>
		</ul>
	</div>
	<!-- 路由外链 -->
	<router-view></router-view>
</template>

<script>
import Header from './components/Header';
import Hello from './components/Hello';
import Stroe from './store';

export default {
	// 等价于 new vue({});
	data: function(){
		return {
			a: 1,
			b: [],
			title: 'this is a todo list',
			items: Stroe.fetch('todos-vuejs'),
			newItem: ''
		};
	},
	components: {
		Hello: Hello,
		Zheader: Header
	},
	methods: {
		doSomthing: function(){
			this.a ++;
		},
		toggleFinish: function(item){
			item.isFinished = !item.isFinished;
		},
		addNew: function(){
			this.items.push({
				label: this.newItem,
				isFinished: false
			});
			this.newItem = '';
		},
		listenToMyBoy: function(msg){
			console.info(msg);
		}
	},
	watch: {
		// 数据监听
		items: {
			handler: function(val, oldval){
				Stroe.save('todos-vuejs', this.items);
			},
			deep: true
		}
	}
};
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
