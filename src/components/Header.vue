<template>
	<div class="header">
		<h1 :class="{hide: !show}">{{ msg }}</h1>
		<button @click="clickMe">aaaa</button>
	</div>
</template>

<script>
export default {
	data(){
		return {
			msg: '我是header'
		};
	},
	props: ['show'],
	methods: {
		load: function(){
			console.info(this.show);
		},
		clickMe: function(){
			this.$emit('child-tell-me-something', this.msg);
		}
	},
	ready: function(){
		this.load();
	}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.header {
	height: 300px;
}
.hide {
	display: none;
}
</style>
