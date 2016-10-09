<template>
	<div class="header">
		<div id="logo">
			<img class="logo" src="../assets/logo.png">
			<span class="slogan">LEARN VUE</span>
		</div>
		<div id="menu" class="">
			<ul class="menu clearfix">
				<li data-dec="{{menu.dec}}" v-link="{ path: menu.linkUrl }" v-for="(index,menu) in menuList">
					<a class="nemu-item" v-link="{ path: menu.linkUrl }">{{ menu.text }}</a>
				</li>
				<li>
					<a href="http://cn.vuejs.org/guide/installation.html" target="_blank">VUE</a>
				</li>
				<li>
					<a href="http://router.vuejs.org/zh-cn/installation.html" target="_blank">VUE-router</a>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
export default {
	data(){
		return {
			msg: '我是header',
			menuList: [{
				linkUrl: '/index',
				text: '首页',
				dec: 'index'
			},
			{
				linkUrl: '/page/components',
				text: 'components'
			},
			{
				linkUrl: '/page/payment/mock',
				text: 'mock'
			},
			{
				linkUrl: '/page/index5',
				text: '555'
			},
			{
				linkUrl: '/page/index6',
				text: '666'
			}]
		};
	},
	methods: {
		load: function(){
		},
		clickMe: function(){
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
		height: 80px;
		line-height: 80px;
		border-bottom: solid #ebedee 1px;
		position: relative;
	}
	#logo{
		position: absolute;
		left: 5%;
		height: 80px;
		line-height: 80px;
	}
	#logo img{
		width: 30px;
		height: 30px;
		vertical-align: middle;
		margin-right: 10px;
		margin-bottom: 4px;
	}
	#logo .slogan{
		font-size: 16px;
		color: #2db7f5;
	}
	#menu{
		position: absolute;
		right: 50px;
		height: 77px;
		line-height: 77px;
	}
	#menu li{
		float: left;
		padding: 0 20px;
		transition: all 0.3s ease 0s;
		z-index: 3;
		border-bottom: 3px solid transparent;
	}
	#menu li:hover{
		border-bottom: 3px solid #2db7f5;
	}
	/*路由激活*/
	#menu li.v-link-active{
		border-bottom: 3px solid #2db7f5;
	}
	#menu li a{
		color: #666;
		font-size: 14px;
	}
	/*路由激活*/
	#menu li a.v-link-active{
		color: #2db7f5;
		font-weight: 700;
	}
</style>
